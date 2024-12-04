import express from "express";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import pass from "../../../front-end/src/features/User/login";
const storage = multer.memoryStorage();
const upload = multer({ storage });

function userRouter(client, key, S3) {
  const router = express.Router();
  // Register
  router.post("/register", upload.none(), async (req, res) => {
    const { email, password, fullname } = req.body;
    console.log(email, password, fullname);
    // Check for required fields
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const hashing = await bcrypt.hash(password, 10);
      await client.query(
        "INSERT INTO users(fullname, password, email) VALUES($1, $2, $3)",
        [fullname, hashing, email]
      );

      return res
        .status(200)
        .json({ message: "The credentials have been uploaded successfully" });
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({
        message: "Could not connect to the user table",
        error: err.detail,
      });
    }
  });

  // Login
  router.post("/login", upload.none(), async (req, res) => {
    const { fullname, password } = req.body;
    console.log(fullname, password);
    try {
      const result = await client.query(
        "SELECT * FROM users WHERE fullname=$1",
        [fullname]
      );

      if (result.rowCount === 0) {
        return res.status(400).send("User name not found");
      }
      const user = result.rows[0];

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign(
        { user: user.fullname, email: user.email, profile: user?.profile },
        key
      );
      res.send({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error logging in");
    }
  });
  //fileupload
  router.put("/fileupload", upload.single("img"), async (req, res) => {
    const { fullname } = req.body;
    const img = req.file;
    const nameing = `${Date.now()}-${req.file.originalname}`;
    //S3
    console.log(img);
    const s3Params = {
      Bucket: "theapplication",
      Key: `cabins/${nameing}`,
      Body: img.buffer,
      ACL: "public-read",
      ContentType: img.mimetype,
    };
    if (!img && !fullname) res.send(400);
    try {
      const data = await S3.send(new PutObjectCommand(s3Params));
      console.log(data);
      const s3Url = `https://theapplication.s3.us-east-1.amazonaws.com/cabins/${nameing}`;
      const result = await client.query(
        "UPDATE users SET profile=$1 WHERE fullname=$2",
        [s3Url, fullname]
      );
      if (result.rowCount === 0) {
        res
          .status(404)
          .send("user not found while uploading the profile photo");
      }
      res.status(200).send("Img succeess fully uploaded");
    } catch (err) {
      res.status(500).send("Error connecting uploading photo");
    }
  });

  function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, key, (err, user) => {
      if (err) {
        console.error("Token verification :", err.message);
        return res.sendStatus(403);
      }
      req.user = user; // Attach user information to request
      next();
    });
  }

  // Protected route example
  router.get("/protected", authenticateToken, (req, res) => {
    return res.json({ user: req.user });
  });
  router.get("/newPassword", async (req, res) => {
    const { password, fullname } = req.body;
    try {
      const hashingPassword = await bcrypt.hash(password, 10);
      const result = await client.query(
        "UPDATE users SET password=$1 WHERE fullname=$2",
        [hashingPassword, fullname]
      );
      if (result.rowCount === 0) {
        res.status(404).send("Invalid creadientails");
      }
      res.status(200).send({ message: "password uploaded successfully" });
    } catch (err) {
      res.status(500).send({ message: err.detail });
    }
  });

  return router;
}

export default userRouter;
