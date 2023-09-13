import React, { useState } from 'react';
import { useLocation, Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Book = () => {
  const location = useLocation();
  const {t} = useTranslation();
  const { flightId, flightName, pas} = location.state;

  const initialPassengers = Array.from({ length: pas}, () => ({
    pass_name: '',
    email: '',
    phoneNumber: '',
  }));
  const [passengers, setPassengers] = useState(initialPassengers);

  console.log(passengers);

  const [results,setResults] = useState("");
    
  const handleBookSeats = ()=>{
    var URL = '/book_flight';
    var token1 = localStorage.getItem('jwtToken');
    var req = {
      bookings:passengers,
      flightId:flightId,
    }
    axios.post(URL,req,{headers : {Authorization: `Bearer ${token1}`}})
    .then((res)=>{
      setResults("Booking is successful");
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  const handlePassengerNameChange = (index, newName) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].pass_name = newName;
    setPassengers(updatedPassengers);
  };

  const handlePassengerEmailChange = (index, newEmail) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].email = newEmail;
    setPassengers(updatedPassengers);
  };

  const handlePassengerPhoneNumberChange = (index, newPhoneNumber) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].phoneNumber = newPhoneNumber;
    setPassengers(updatedPassengers);
  };

  const passengerBlocks = [];

  // if(!results){
    for(let i=0;i<pas;i++){
      passengerBlocks.push(
        <div key={i}>
          <b>Add Passenger {i}:</b> <br/>
          <label htmlFor="name">{t("Name")}:</label>
          <input type="text" placeholder="Name" id={'name'} value={passengers[i].pass_name}
            onChange={(e) => handlePassengerNameChange(i,e.target.value)}
          />
          <label htmlFor="email">{t("Email")}:</label>        
          <input type="email" placeholder="Email" id={'email'} value={passengers[i].email}
            onChange={(e) => handlePassengerEmailChange(i,e.target.value)}
          />
          <label htmlFor='phoneNumber'>{t("Phone Number")}:</label>
          <input type="tel" placeholder="Phone Number" id={'phoneNumber'} value={passengers[i].phoneNumber}
            onChange={(e) => handlePassengerPhoneNumberChange(i,e.target.value)}
          />

        </div>
      );
    }
  // }

  return (
    <>
      {!results?
      (<>
        {<h>Booking {pas} Tickets for {flightName}</h>}
        {passengerBlocks}
        {<button onClick={handleBookSeats}>Book Seats</button>}
      </>):
      (
        <>
        <b>Booking is successful</b> <br/>
        <p>Click on this <Link to='/'>Link</Link> to navigate to Home page</p>
        </>
      )
      }
    </>
    
  );

};

export default Book;

