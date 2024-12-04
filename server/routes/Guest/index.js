import express from 'express';

function GuestRouter(client) {
  const router = express.Router();

  //Get guest
  router.get('/guests', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM guests');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  });
  router.get('/guests/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await client.query(
        'SELECT * FROM guests WHERE guest_id=$1',
        [id],
      );
      if (result.rowCount === 0) res.status(404).send('Guest not found');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).send('Could not connect with the table ', err.message);
      console.log(err.message);
    }
  });
  return router;
}

export default GuestRouter;
