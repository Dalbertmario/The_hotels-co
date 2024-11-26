import React, { useState } from 'react';
import UseGetBooking from '../features/bookings/getBooking';
import BookingSorting from '../ui/BookingSoting';
import Bookingrow from '../features/bookings/Bookingrow';
import BookingHeader from '../ui/BookingHeader';
import UseFetchGuest from '../features/bookings/GetGuests';
import BookingFooter from '../ui/BookingFooter';

const Bookings = () => {
  const { bookingdata = [] } = UseGetBooking();
  const [leftbtn, setleftbtn] = useState(0);
  const [rightbtn, setRightbtn] = useState(10);
  const { guestFetch = [] } = UseFetchGuest();
  const sliceBookingData = bookingdata.slice(leftbtn, rightbtn);
  return (
    <div className="flex flex-col gap-4 max-w-[1400px] m-auto min-h-[89vh]">
      <BookingSorting />
      <div className="outline outline-1 outline-slate-200 rounded-md">
        <BookingHeader />
        {sliceBookingData.map((el) => (
          <Bookingrow
            bookings={el}
            key={el.booking_id}
            guestdata={guestFetch}
          />
        ))}
        <BookingFooter
          left={setleftbtn}
          bookLen={bookingdata}
          right={setRightbtn}
          rightval={rightbtn}
          leftval={leftbtn}
        />
      </div>
    </div>
  );
};

export default Bookings;
