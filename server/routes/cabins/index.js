import express from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';

function cabinrouter(client, S3) {
  const router = express.Router();

  // Get all cabins
  router.get('/cabins', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM cabins');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });

  const storage = multer.memoryStorage();
  const upload = multer({ storage }).single('img');

  router.post('/cabins', upload, async (req, res) => {
    //Copy Cabin
    if (req.body.img && req.body.img.startsWith('http')) {
      await client.query(
        'INSERT INTO cabins(img,price,description,discount) VALUES($1,$2,$3,$4)',
        [req.body.img, req.body.price, req.body.description, req.body.discount],
      );
      return res
        .status(200)
        .send('Cabin added successfully with external image URL');
    }
    //Post form cabin
    const OnlyImg = req.file;
    const nameing = `${Math.random()}-${OnlyImg.originalname}`;
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    const s3Params = {
      Bucket: 'theapplication',
      Key: `cabins/${nameing}`,
      Body: OnlyImg.buffer,
      ACL: 'public-read',
      ContentType: OnlyImg.mimetype,
    };

    // Upload to S3
    try {
      const uploadCommand = new PutObjectCommand(s3Params);
      const data = await S3.send(uploadCommand);

      const s3Url = `https://theapplication.s3.us-east-1.amazonaws.com/cabins/${nameing}`;
      const psUpdate = {
        img: s3Url,
        discount: Number(req.body.discount),
        price: Number(req.body.price),
        description: req.body.description,
      };

      // Insert into the database
      await client.query(
        'INSERT INTO cabins (img, price, description, discount) VALUES($1, $2, $3, $4)',
        [psUpdate.img, psUpdate.price, psUpdate.description, psUpdate.discount],
      );

      res.status(200).send('Cabin uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error uploading cabin');
    }
  });

  //Cabin delete
  router.delete('/cabins/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const parsing = parseInt(id, 10);
    if (isNaN(parsing)) {
      return res.status(400).send('Invalid Cabin Id');
    }
    try {
      const result = await client.query(`DELETE FROM cabins WHERE id = $1`, [
        parsing,
      ]);
      if (result.rowCount === 0) {
        return res.status(400).send('Cabin not found');
      }
      res.status(200).send('Cabin deleted successfully');
    } catch (err) {
      res.status(500).json({ message: err });
      console.log(err);
    }
  });

  //UPDATE
  router.put('/cabins/:id', upload, async (req, res) => {
    const { id } = req.params;

    // If the image is a URL
    if (req.body.img && req.body.img.startsWith('http')) {
      try {
        await client.query(
          'UPDATE cabins SET img=$1, price=$2, discount=$3, description=$4 WHERE id=$5',
          [
            req.body.img,
            req.body.price,
            req.body.discount,
            req.body.description,
            id,
          ],
        );
        return res.status(200).send('Cabin edited successfully');
      } catch (err) {
        console.error(err);
        return res.status(500).send("Cabin can't be edited");
      }
    }

    // If the image is a file
    const file = req.file;
    if (!file) {
      return res.status(400).send('Image file is required');
    }

    const uniqueName = `${Math.random()}-${file.originalname}`;
    const { price, discount, description } = req.body;

    const s3Params = {
      Bucket: 'theapplication',
      Key: `/cabins/${uniqueName}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    const s3Url = `https://theapplication.s3.us-east-1.amazonaws.com/cabins/${uniqueName}`;

    try {
      // Upload to S3
      const uploadCommand = new PutObjectCommand(s3Params);
      await S3.send(uploadCommand);

      // Update the database
      const pgUpload = await client.query(
        'UPDATE cabins SET img=$1, price=$2, discount=$3, description=$4 WHERE id=$5',
        [s3Url, price, discount, description, id],
      );

      if (pgUpload.rowCount === 0) {
        return res.status(404).json({ error: 'Cabin not found' });
      }

      res.status(200).send('Cabin edited successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send("Cabin couldn't be uploaded");
    }
  });

  return router;
}

export default cabinrouter;
