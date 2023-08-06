import React, { useState } from 'react';
import { useParams, useLocation} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Book = () => {
    const [passengers, setPassengers] = useState([]);
    const [newPassenger, setNewPassenger] = useState({
        pass_name: '',
        email: '',
        phoneNumber: '',
     });

     const [editingIndex,setEditingIndex] = useState(-1);

     const [results,setResults] = useState("");

    // const {flightId} = useParams();
    const location = useLocation();
    const { flightId, flightName } = location.state;

    const handleAddPassenger = ()=>{
        console.log("Done2");
        if(editingIndex!==-1){
            const curPassengers = [...passengers];
            curPassengers[editingIndex] = newPassenger;
            setPassengers(curPassengers);
            setEditingIndex(-1);
        }
        else if(newPassenger.pass_name && newPassenger.email && newPassenger.phoneNumber){
            setPassengers([...passengers,newPassenger]);
        }
        setNewPassenger({
            pass_name: '',
            email: '',
            phoneNumber: '',
        })
    };

    const handleRemovePassenger = (index) => {
        const updatedPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(updatedPassengers);
    };
    const handleEditPassenger = (index) => {
        console.log("Done1");
        const passengerToEdit = passengers[index];
        setNewPassenger(passengerToEdit);
        setEditingIndex(index);
    };

    
    const handleBookSeats = ()=>{
      var URL = '/book_flight';
      var token1 = localStorage.getItem('jwtToken');
      var req = {
        bookings:passengers,
        flightId:flightId,
      }
      axios.post(URL,req,{headers : {Authorization: `Bearer ${token1}`}})
      .then((res)=>{
        setPassengers([]);
      })
      .catch((error)=>{
        console.log(error);
      });
    };

    return (
    <>
        <div className="book-form">
        <h2>Booking for Flight {flightName}</h2>
        </div>

        <div>
        {passengers.map((passenger, index) => (
          <div key={index}>
            <p>Passenger {index + 1}:</p>
            <p>Name: {passenger.pass_name}</p>
            <p>Email: {passenger.email}</p>
            <p>Phone: {passenger.phoneNumber}</p>
            <button onClick={() => handleEditPassenger(index)}>Edit</button>
            <button onClick={() => handleRemovePassenger(index)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Add Passenger</h3>
        <input
          type="text"
          placeholder="Name"
          value={newPassenger.pass_name}
          onChange={(e) => setNewPassenger((prevState)=>({...prevState,pass_name:e.target.value}))}
        />
        <input
          type="email"
          placeholder="Email"
          value={newPassenger.email}
          onChange={(e) => setNewPassenger((prevState)=>({...prevState,email:e.target.value}))}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={newPassenger.phoneNumber}
          onChange={(e) => setNewPassenger((prevState)=>({...prevState,phoneNumber:e.target.value}))}
        />
        <button onClick={handleAddPassenger}>
          {editingIndex !== -1 ? 'Save Changes' : 'Add Passenger'}
        </button>
        <br/>
        <button onClick={handleBookSeats}>
          Book Seats
        </button>
      </div>
    </>);

};

export default Book;