import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const upload = multer();

function userRouter(client, key) {
  const router = express.Router();
  // Register
  router.post('/register', upload.none(), async (req, res) => {
    const { email, password, fullname } = req.body;
    console.log(email, password, fullname);
    // Check for required fields
    if (!email || !password || !fullname) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const hashing = await bcrypt.hash(password, 10);
      await client.query(
        'INSERT INTO users(fullname, password, email) VALUES($1, $2, $3)',
        [fullname, hashing, email],
      );

      return res
        .status(200)
        .json({ message: 'The credentials have been uploaded successfully' });
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({
        message: 'Could not connect to the user table',
        error: err.detail,
      });
    }
  });

  // Login
  router.post('/login', upload.none(), async (req, res) => {
    const { fullname, password } = req.body;
    console.log(fullname, password);
    try {
      const result = await client.query(
        'SELECT * FROM users WHERE fullname=$1',
        [fullname],
      );

      if (result.rowCount === 0) {
        return res.status(400).send('User name not found');
      }
      const user = result.rows[0];

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ user: user.fullname, email: user.email }, key);
      res.send({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error logging in');
    }
  });

  router.put('/login', (req, res) => {
    const { img, email, password, fullname } = req.body;
    console.log(img[0], email, password);
  });
  function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.sendStatus(401);
    }

    jwt.verify(token, key, (err, user) => {
      if (err) {
        console.error('Token verification :', err.message);
        return res.sendStatus(403);
      }
      req.user = user; // Attach user information to request
      next();
    });
  }

  // Protected route example
  router.get('/protected', authenticateToken, (req, res) => {
    return res.json({ user: req.user });
  });

  return router;
}

export default userRouter;
