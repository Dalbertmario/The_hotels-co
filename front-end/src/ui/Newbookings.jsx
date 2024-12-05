import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';

const Newbookings = () => {
  const { register } = useForm();
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
    console.log(date); // Handle the selected date
  };
  const tileDisabled = ({ date }) => {
    const today = new Date();
    return (
      date.getMonth() !== today.getMonth() ||
      date.getFullYear() !== today.getFullYear()
    );
  };
  return (
    <div className="h-screen">
      <form>
        <input type="date" />
      </form>
    </div>
  );
};

export default Newbookings;
