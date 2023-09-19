import React, { useState } from "react";
import { FormContainer,StyledForm } from './Styles/FlightSearchFormStyle';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import axios from "axios";
import { getSocket } from "../socket";

const RemoveFlightForm = ()=>{
    const schema = yup.object().shape({
        flightNumber: yup.string().required(),
        date: yup.date().typeError('Invalid Date').required(),
    });



    const { register, handleSubmit , formState: { errors }} = useForm({resolver: yupResolver(schema)});
    
    const [result,setResult] = useState("");
    

    const handleRemoveFlight = (data)=>{
        setResult("");
        const date = new Date(data.date);
        const dateString = date.toISOString();

        console.log(dateString);
        let flightData = {
            flightNumber : data.flightNumber,
            date : dateString,
        }
        const URL = `/flights?flightNumber=${flightData.flightNumber}&date=${flightData.date}`;
        axios.delete(URL)
        .then((response)=>{
            const socket = getSocket();
            socket.emit('notify',{
                value:1,
            });
            setResult("Flight Cancelled Successfully");
          })
          .catch((error)=>{
            alert('Failed to cancel flight. Please try again.');
        });
    }

    return (
        <FormContainer>
            <h2>Cancel Flight Form</h2>
            <StyledForm onSubmit={handleSubmit(handleRemoveFlight)}>
                <label htmlFor="flightNumber">Flight Number:</label>
                <input type="text" id="flightNumber" name="flightNumber" {...register('flightNumber')}/>
                <small className="text-danger"> {errors.flightNumber?.message}</small>

                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" {...register('date')}/>
                <small className="text-danger">{errors.date?.message}</small>

                <button type="submit">Cancel Flight</button>

            </StyledForm>
            {result && <p>{result}</p>} 
        </FormContainer>
    );
}

export default RemoveFlightForm;