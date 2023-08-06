import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
// import DOMPurify from 'dompurify';
// import { parse, isDate, isValid } from 'date-fns'; 

import { FormContainer,StyledForm } from './Styles/FlightSearchFormStyle';


const AddFlightForm = ()=>{

    const schema = yup.object().shape({
      flightNumber: yup.string().required(),
      origin: yup.string().required(),
      destination: yup.string().required(),
      date: yup.date().typeError('Invalid Date').required(),
      startTime: yup.string().required('Time 1 is required')
          .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
      endTime: yup.string().required('Time 2 is required')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
      seatsAvailable: yup.number().required(),
    });

    const { register, handleSubmit , formState: { errors }} = useForm({resolver: yupResolver(schema)});
  

    const [result,setResult] = useState("");

    // const handleFlightChange = (e)=>{
    //     const name  = e.target.name;
    //     const value = e.target.value;

    //     setNewFlightData((prevState)=>({...prevState,[name]:value}));
    // };
    const URL = "/flights";

    const handleAddFlight = (data)=>{
        setResult("");
        // console.log("YES");

        const myDate = new Date(data.date);
        

        
        const startHours = parseInt(data.startTime.split(':')[0], 10); // Extract hours from HH:MM format
        const startMinutes = parseInt(data.startTime.split(':')[1], 10);

        let dStart = new Date(myDate);
        let dEnd   = new Date(myDate);

        console.log(data.endTime);

        dStart.setHours(dStart.getHours()+startHours);
        dStart.setMinutes(dStart.getMinutes()+startMinutes);

        const endHours = parseInt(data.endTime.split(':')[0], 10); // Extract hours from HH:MM format
        const endMinutes = parseInt(data.endTime.split(':')[1], 10);

        dEnd.setHours(dEnd.getHours()+endHours);
        dEnd.setMinutes(dEnd.getMinutes()+endMinutes);

        console.log(myDate);
        console.log(dStart);
        console.log(dEnd);

        let newFlightData = {
          flightNumber : data.flightNumber,
          origin : data.origin,
          destination : data.destination,
          date : myDate,
          startTime : dStart,
          endTime : dEnd,
          seatsAvailable : data.seatsAvailable,

        };

        axios.post(URL,newFlightData)
        
        .then((response)=>{
          console.log("axios");
            setResult("Flight Added Successfully");
        })
        .catch((error)=>{
          console.log("axios");
            alert('Failed to add a new flight. Please try again.');
        });
    };

    return(
        <FormContainer>
        <h2>Add a New Flight</h2>
        <StyledForm onSubmit={handleSubmit(handleAddFlight)}>
          <label htmlFor="flightNumber">Flight Number:</label>
          <input
            type="text"
            id="flightNumber"
            name="flightNumber"
            {...register('flightNumber')}
          />
          <small className="text-danger">
            {errors.flightNumber?.message}
          </small>
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            name="origin"
            {...register('origin')}
          />
          <small className="text-danger">
            {errors.origin?.message}
          </small>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            {...register('destination')}
          />
          <small className="text-danger">
            {errors.destination?.message}
          </small>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            {...register('date')}
          />
          <small className="text-danger">
            {errors.date?.message}
          </small>
          <label htmlFor="seatsAvailable">Seats Available:</label>
          <input
            type="number"
            id="seatsAvailable"
            name="seatsAvailable"
            {...register("seatsAvailable")}
          />
          <small className="text-danger">
            {errors.seatsAvailable?.message}
          </small>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            {...register("startTime")}
          />
          <small className="text-danger">
            {errors.startTime?.message}
          </small>

          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            {...register("endTime")}
          />
          <small className="text-danger">
            {errors.endTime?.message}
          </small><br/>

          <button type="submit">Add Flight</button>

          {result && <p>{result}</p>} 
        </StyledForm>
      </FormContainer>
    );
}

export default AddFlightForm;