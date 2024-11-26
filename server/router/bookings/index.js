import express from 'express';
function bookingRouter(client) {
  const router = express.Router();

  //GET BOOKING
  router.get('/bookings', async (req, res) => {
    try {
      const result = await client.query('SELECT * FROM bookings');
      res.status(200).json(result.rows);
      if (result.rowCount === 0) {
        res.status(400).send('booking not found');
      }
    } catch (err) {
      res.status(500).send('Could not able read booking table');
      console.log(err);
    }
  });

  router.get('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await client.query(
        'SELECT * FROM bookings WHERE booking_id=$1',
        [id],
      );
      if (result.rowCount === 0) {
        res.status(404).send('Booking id does not find the table');
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Could not able to find the the booking id');
    }
  });
  return router;
}

export default bookingRouter;
