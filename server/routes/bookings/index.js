import { ca } from 'date-fns/locale';
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
      res
        .status(500)
        .json({ message: 'Could not able to find the the booking id' });
      console.error(err.message);
    }
  });
  router.put('/bookings/:id', async (req, res) => {
    const { status, id } = req.body;

    try {
      const result = await client.query(
        'UPDATE bookings SET status=$1 WHERE booking_id=$2',
        [status, id],
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Invalid booking ID' });
      }
      res.status(200).json({ message: 'Booking updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Could not find the bookings table',
      });
    }
  });

  router.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const parsing = parseInt(id, 10);
    console.log(parsing);
    try {
      const result = await client.query(
        'DELETE FROM bookings WHERE booking_id=$1',
        [parsing],
      );
      if (result.rowCount === 0) {
        res.status(400).json({ message: 'Invalid  data' });
      }

      res.status(204).send('Booking deleted successfully');
    } catch (err) {
      console.log('Error deleting booking:');
      res.status(500).send('Error in deleteing bookings');
    }
  });
  return router;
}

export default bookingRouter;
