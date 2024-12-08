import express from "express";
function DashboardRouter(client) {
  const router = express.Router();

  //Header Dashboard Data
  router.get("/dashboard/:date", async (req, res) => {
    const { date } = req.params;
    const currentDate = new Date();
    const homedate = currentDate.getDate();
    const homemonth = currentDate.getMonth();
    const homeYear = currentDate.getFullYear();
    const isoDate = currentDate.toISOString();

    let newDate;
    let newMonth;
    function dateCalc(val) {
      if (val === 7) {
        if (Number(homedate) <= 7) {
          console.log((newDate = Number(homedate) - val + 30));
          console.log((newMonth = Number(homemonth) - 1));
        }
        if (Number(homedate) >= 8) {
          newDate = Number(homedate) - val;
          newMonth = Number(homemonth);
        }
      }
      if (val === 30) {
        newDate = Number(homedate);
        if (Number(homemonth) !== 1) {
          newMonth = Number(homemonth) - 1;
        } else {
          newMonth = 12;
        }
      }
      if (val === 90) {
        newDate = Number(homedate);
        if (Number(homemonth) === 2) {
          newMonth === 11;
        }
        if (Number(homemonth) === 1) {
          newMonth === 10;
        }
        if (Number(homemonth) !== 1 && Number(homemonth) !== 2) {
          newMonth = Number(homemonth) - 2;
        }
      }
      const dat = new Date(homeYear, newMonth, newDate);
      dat.setHours(1, 0, 0, 0);
      return dat.toISOString();
    }
    // console.log(dateCalc(Number(date)));

    try {
      const result = await client.query(
        "SELECT * FROM bookings WHERE fromdate>=$1 AND todate<=CURRENT_DATE",
        [dateCalc(Number(date))]
      );
      if (result.rowCount === 0) {
        return res.status(400).send("Couldn't fetch the dates");
      }
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).send("Couldn't get the table");
    }
  });
  router.get("/dashboard", async (req, res) => {
    try {
      const result = await client.query(
        `SELECT u.guest_id AS guest_id,u.email AS guest_email,u.nationalid AS guest_nationalid,u.fullname AS guest_fullname,o.booking_id AS booking_id,o.cabin_id,o.fromdate,o.todate,o.ispaid,o.numnight,o.status,o.numguest,o.totalprice,o.hasbreakfast
         FROM guests u
        LEFT JOIN bookings o ON u.guest_id = o.guest_id
         WHERE o.fromdate = CURRENT_DATE OR o.todate = CURRENT_DATE
`
      );
      if (result.rowCount === 0) {
        console.warn("No data found for today.");
        return res
          .status(400)
          .json({ message: "No matching data found for today." });
      }

      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Error fetching dashboard data:", error.stack); // Detailed stack trace
      res
        .status(500)
        .json({ message: "Internal server error. Please try again later." });
    }
  });

  router.get("/graph/dashboard", async (req, res) => {
    try {
      const result = await client.query(
        `SELECT 
    EXTRACT(MONTH FROM fromdate) AS month,
    EXTRACT(YEAR FROM fromdate) AS year,
    SUM(totalprice) AS total_price
FROM bookings
GROUP BY EXTRACT(YEAR FROM fromdate), EXTRACT(MONTH FROM fromdate)`
      );
      if (result.rowCount === 0) {
        return res.status(400).send("Could not find any totalprice values");
      }
      res.status(200).json(result.rows);
    } catch (err) {
      res
        .status(500)
        .send(
          "Could not find the table name called bookings from column value called totalprice"
        );
    }
  });
  router.get("/piechart/dashboard", async (req, res) => {
    try {
      const result = await client.query(
        `SELECT o.cabin_id,SUM(o.totalprice) AS each_cabin_sales FROM bookings o GROUP BY o.cabin_id`
      );
      if (result.rowCount === 0)
        res.status(404).send("Data no found for the pie chart");
      res.status(200).send(result.rows);
    } catch (err) {
      res
        .status(500)
        .send(
          "Could not able to find the table bookings for pie chart creation"
        );
    }
  });

  return router;
}

export default DashboardRouter;
