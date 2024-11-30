import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import datetimeformate from '../helper/dateformate';
import Moneyformate from '../helper/Moneyformate';
import Loading from '../ui/Loading';

const Details = () => {
  const { id } = useParams();
  const [bookingdata = [], setData] = useState();
  const [isLoading, setLoading] = useState(false);
  const [guestdata = [], setGuest] = useState();
  const gg = useLocation();
  const back = useNavigate();
  const guestID = gg.state.guest_id;
  const bookstate = gg.state.status;
  console.log(bookstate);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/hotel/bookings/${id}`,
        );
        if (!response.ok) throw new Error(`${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [id]);
  useEffect(() => {
    async function getDetailsGuest() {
      try {
        setLoading(true);
        const result = await fetch(
          `http://localhost:3000/hotel/guests/${guestID}`,
        );
        if (!result.ok) throw new Error('Guest id not found in the table');
        const res = await result.json();
        setGuest(res);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getDetailsGuest();
  }, [guestID]);
  const {
    fromdate,
    hasbreakfast,
    numguest,
    numnight,
    status,
    todate,
    totalprice,
    booking_id,
    cabin_id,
  } = bookingdata;
  function handelBack() {
    back(-1);
  }

  return (
    <div className="h-[89vh] flex flex-col max-w-[1400px] m-auto">
      {isLoading ? (
        <div className="mt-[200px]">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-5">
            <h1 className="font-semibold">Bookings #{booking_id}</h1>
            <div className="flex gap-5">
              <h1
                className={clsx(
                  `${status === 'Checked In' && 'bg-green-200 text-green-900 p-1'} ${status === 'Checked Out' && 'bg-gray-300 text-grey-900 p-1'} ${status === 'Unconfirmed' && 'bg-blue-200 text-blue-800'} rounded-md font-semibold max-h-10 py-1 m-auto`,
                )}
              >
                {status}
              </h1>
              <button className="text-red-700 text-medium">
                <span
                  onClick={handelBack}
                  className="flex justify-center content-center items-center transition-all hover:translate-x-1"
                >
                  <IoMdArrowRoundBack />
                  <h1>Back</h1>
                </span>
              </button>
            </div>
          </div>
          <div>
            <h1 className="bg-blue-600 font-semibold text-white flex p-5 gap-2 justify-center rounded-t-md py-7">
              <h2>{numnight}</h2> night in {fromdate} In cabin {cabin_id} -{' '}
              {todate}
            </h1>
          </div>
          <div className="bg-white p-7 flex flex-col gap-5 leading-10">
            {guestdata.map((el) => (
              <ul className="flex justify-between mt-10 details">
                <li className="font-semibold ">
                  {el.fullname} +{numguest} guests
                </li>
                <li className="text-slate-600">{el.email}</li>
                <li className="text-slate-600">National ID {el.nationalid}</li>
              </ul>
            ))}

            <h1 className="flex gap-2">
              <h1 className="font-semibold">Breakfast included ? </h1>
              {hasbreakfast ? 'YES' : 'NO'}
            </h1>

            <div
              className={clsx(` 
              ${status === 'Unconfirmed' && 'font-semibold text-amber-600'} ${status === 'Checked Out' && 'bg-green-200'} ${status === 'Checked In' && 'bg-green-100 text-green-600'} flex justify-between p-5 bg-amber-200 rounded-md font-semibold`)}
            >
              <h1
                className={clsx(
                  `${status === 'Unconfirmed' && 'font-semibold text-amber-600'} ${status === 'Checked In' && 'bg-green-100 text-green-600'} ${status === 'Checked Out' && 'text-green-600 bg-green-200'} flex justify-between  bg-amber-200 rounded-md`,
                )}
              >
                Total price {Moneyformate(totalprice)}
              </h1>
              <h1
                className={clsx(
                  `${status === 'Unconfirmed' && 'font-semibold text-amber-600'} ${status === 'Checked In' && 'bg-green-100 text-semibold text-green-600'} ${status === 'Checked Out' && 'text-green-500'}`,
                )}
              >
                {status === 'Unconfirmed' && 'WILL PAY AT PROPERTY'}
                {status === 'Checked Out' && 'PAID'}
                {status === 'Confimed' && 'PAID'}
                {status === 'Checked In' && 'PAID'}
              </h1>
            </div>
          </div>
          <div className="flex flex-row gap-3 item-right p-3">
            <button
              className={clsx(
                `${(bookstate && 'bg-blue-500 text-white p-2 hover:bg-blue-600 rounded-md transition-all font-medium px-5') || 'bg-red-500 p-2 font-medium text-white rounded-md hover:bg-red-600 transition-all px-5'}`,
              )}
            >
              {(bookstate === 'check in' && `Check In #${booking_id}`) ||
                (bookstate === 'check out' && `check out  #${booking_id}`) ||
                'Delete booking'}
            </button>
            <button
              onClick={handelBack}
              className="bg-slate-500 p-2  text-white rounded-md font-medium hover:bg-slate-600 transition-all"
            >
              Back
            </button>
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default Details;
