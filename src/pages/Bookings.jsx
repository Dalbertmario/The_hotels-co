import React, { useState } from 'react';
import UseGetBooking from '../features/bookings/getBooking';
import BookingSorting from '../ui/BookingSoting';
import Bookingrow from '../features/bookings/Bookingrow';
import BookingHeader from '../ui/BookingHeader';
import UseFetchGuest from '../features/bookings/GetGuests';
import BookingFooter from '../ui/BookingFooter';
import { useSelector } from 'react-redux';
import datetimeformate from '../helper/dateformate';

const Bookings = () => {
  const { bookingdata = [], isLoading } = UseGetBooking();
  const { guestAll, checkedOut, checkIn, unconfirmed, selectingSort } =
    useSelector((state) => state.uistore);
  const [leftbtn, setleftbtn] = useState(0);
  const [rightbtn, setRightbtn] = useState(10);
  const { guestFetch = [] } = UseFetchGuest();
  const sliceBookingData = bookingdata.slice(leftbtn, rightbtn);
  const bookUnconfirmed = bookingdata.filter(
    (el) => el.status === 'Unconfirmed',
  );
  const bookCheckedIn = bookingdata.filter((el) => el.status === 'Checked In');
  const bookCheckedOut = bookingdata.filter(
    (el) => el.status === 'Checked Out',
  );

  return (
    <div className="flex flex-col gap-4 max-w-[1400px] m-auto min-h-[89vh]">
      <BookingSorting />
      <div className="outline outline-1 outline-slate-200 rounded-md">
        <BookingHeader />
        {checkedOut &&
          bookCheckedOut
            .sort(
              (a, b) =>
                selectingSort === 'high-price'
                  ? b.totalprice - a.totalprice
                  : a.totalprice - b.totalprice,
              0,
            )
            .map((el) => (
              <Bookingrow
                bookings={el}
                key={el.booking_id}
                guestdata={guestFetch}
              />
            ))}
        {checkIn &&
          bookCheckedIn
            .sort(
              (a, b) =>
                selectingSort === 'high-price'
                  ? b.totalprice - a.totalprice
                  : a.totalprice - b.totalprice,
              0,
            )
            .map((el) => (
              <Bookingrow
                bookings={el}
                key={el.booking_id}
                guestdata={guestFetch}
              />
            ))}
        {unconfirmed &&
          bookUnconfirmed
            .sort(
              (a, b) =>
                selectingSort === 'high-price'
                  ? b.totalprice - a.totalprice
                  : a.totalprice - b.totalprice,
              0,
            )
            .map((el) => (
              <Bookingrow
                bookings={el}
                key={el.booking_id}
                guestdata={guestFetch}
              />
            ))}
        {guestAll &&
          sliceBookingData
            .sort(
              (a, b) =>
                selectingSort === 'high-price'
                  ? b.totalprice - a.totalprice
                  : a.totalprice - b.totalprice,
              0,
            )
            .map((el) => (
              <Bookingrow
                bookings={el}
                key={el.booking_id}
                guestdata={guestFetch}
              />
            ))}
        <BookingFooter
          bookunconfirmed={bookUnconfirmed}
          bookcheckIn={bookCheckedIn}
          bookcheckedOut={bookCheckedOut}
          bookguestAll={sliceBookingData}
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
