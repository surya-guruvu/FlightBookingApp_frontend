import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function formatTime(isoDate){
    const flightEndTime = new Date(isoDate);
    const formattedEndTime = flightEndTime.toLocaleTimeString();

    return formattedEndTime;
}

const LoadingText = styled.div`
    font-size: 1.2rem;
    margin: 2rem auto;
    text-align: center;
`;

const ErrorText = styled.div`
    font-size: 1.2rem;
    margin: 2rem auto;
    text-align: center;
`;

const BookingsContainer = styled.div`
    text-align: center;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 800px;
`;

const BookingItem = styled.li`
    list-style-type: none;
    border: 1px solid #eee;
    padding: 1rem;
    margin: 1rem 0;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const FlightInfo = styled.div`
    text-align: left;
`;

const FlightNumber = styled.div`
    font-weight: bold;
`;

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [loggedIn,setLoggedIn] = useState(false);
  
    useEffect(()=>{
      var token = localStorage.getItem('jwtToken');
      if(token){
        axios.get('users/check_auth',{headers : {Authorization: `Bearer ${token}`}})
        .then((res)=>{
          setLoggedIn(true);
        })
        .catch((err)=>{
          localStorage.removeItem('jwtToken');
          setLoggedIn(false);
        });
      }
      else{
        setLoggedIn(false);
      }
    },[]);

    useEffect(() => {
        // Fetch your bookings when the component mounts
        var URL = '/book_flight';
        var token1 = localStorage.getItem('jwtToken');
        axios.get(URL,{headers : {Authorization: `Bearer ${token1}`}})
        .then(response => {
            console.log(response.data);
            setBookings(response.data.data);
            setLoading(false);
            setError(null);
        })
        .catch(err => {
            setBookings([]);
            setLoading(false);
            setError('Error fetching bookings');
        });
    }, []);

    if (loading) {
        return <LoadingText>Loading...</LoadingText>;
    }

    // if (error) {
    //     return <ErrorText>{error}</ErrorText>;
    // }

    return (
        <>
        {(loggedIn)?
        <>
        <BookingsContainer>
            <h2>My Bookings</h2>
            <ul>
                {bookings.map((booking) =>{
                    return(
                        <BookingItem key={booking._id}>
                            <FlightInfo>
                                <FlightNumber>Flight Number: {booking.flight.flightNumber}</FlightNumber>
                                <div>Name: {booking.name}</div>
                                <div>Email: {booking.email}</div>
                                <div>Phone Number: {booking.phoneNumber}</div>
                                <div>Start Time: {formatTime(booking.flight.startTime)}</div>
                                <div>End Time: {formatTime(booking.flight.endTime)}</div>

                                {booking.cancelled && <b>This Flight is cancelled.</b>}
                            </FlightInfo>
                        </BookingItem>

                    )
                })}
            </ul>
        </BookingsContainer>
        {error && <ErrorText>{error}</ErrorText>}
        </>
        :<BookingsContainer><h2>You are not logged In</h2></BookingsContainer>
        }
            </>
    );
}

export default MyBookings;
