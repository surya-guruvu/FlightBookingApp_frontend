import React, {useState} from 'react';
import axios from "axios";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';
import { FormContainer,StyledForm,SearchResultsContainer,BookResultsContainer} from './Styles/FlightSearchFormStyle';
import Book from './Book';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated } from './authenticate';
import * as Sentry from '@sentry/react'; // Import Sentry

//formData was added to add some context. But didnot finish it.
const FlightSearchForm = ({ formData, setFormData }) => {

    const {t} = useTranslation();
    const schema = yup.object().shape({
      origin      : yup.string().required(),
      destination : yup.string().required(),
      date        : yup.date().typeError('Invalide Date').required(),
      passengers  : yup.number().required(),
    });

    const [issue,setIssue] = useState(false);

    const { register, handleSubmit , formState: { errors },reset} = useForm({resolver: yupResolver(schema)});

    const navigate = useNavigate();
    
    const handleBookButtonClick = (flightId,flightName) => {
      if(isUserAuthenticated()){
        setIssue(false);
        navigate(`/book/${flightId}`,{state:{flightId,flightName}}); // Navigate to the "/book" route
      }
      else{
        setIssue(true);
      }
      console.log("Done4");
      
    };


    const [searchResults,setSearchResults] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [error1,setError1] = useState(null);
    const [bookResults,setBookResults] = useState('');
    const [submitted,setSubmitted] = useState('');

    const URL = "/flights";


    const handleSearch = (data) => {

      try{
        const transaction = Sentry.startTransaction({ name: 'FightSearchForm' });
        setFormData(data);
        setBookResults('');
        setSearchResults('');
        setLoading(true);setError(null);setError1(null);setSubmitted("s");

        const sanitizedOrigin = DOMPurify.sanitize(data.origin);
        const sanitizedDestination = DOMPurify.sanitize(data.destination);
        const sanitizedDate = new Date(data.date);
        const sanitizedPassengers = parseInt(data.passengers);

        let searchCriteria = {
          origin: sanitizedOrigin,
          destination: sanitizedDestination,
          date: sanitizedDate.toISOString(),
          passengers: sanitizedPassengers,
        };

        axios.get(URL,{params:searchCriteria/*,headers : {Authorization: `Bearer ${token1}`}*/})
        .then((response) => {
          setSearchResults(response.data.data);
          console.log(response.data.data);
          setLoading(false);
        })
        .catch((err)=>{
          console.log(err);
          setSearchResults("");
          setLoading(false);
          setError(err);
          Sentry.captureException(err);
        });
        transaction.finish();
        
      }
      catch (error) {
        console.log(error);
        // Capture the error with Sentry
        Sentry.captureException(error);
      }



    };
    function formatDate(isoDate) {
      const dateObj = new Date(isoDate);
      const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
      return formattedDate;
    }

    function formatTime(isoDate){
      const flightEndTime = new Date(isoDate);
      const formattedEndTime = flightEndTime.toLocaleTimeString();

      return formattedEndTime;
    }

  return (
    <>
    <FormContainer>
      <StyledForm className="flight-search-form" onSubmit={handleSubmit(handleSearch)}>
        <label htmlFor="origin">{t("Origin")}:</label>
        <input
          type="text"
          id="origin"
          name="origin"
          {...register('origin')}
        />
          <small className="text-danger">
            {errors.origin?.message}
          </small>

        <label htmlFor="destination">{t("Destination")}:</label>
        <input
          type="text"
          id="destination"
          name="destination"
          {...register('destination')}
        />
        <small className="text-danger">
          {errors.destination?.message}
        </small>

        <label htmlFor="date">{t("Date")}:</label>
        <input
          type="date"
          id="date"
          name="date"
          {...register('date')}
          required
        />
        <small className="text-danger">
          {errors.date?.message}
        </small>

        <label htmlFor="passengers">{t("Passengers")}:</label>
        <input
          type="number"
          id="passengers"
          name="passengers"
          {...register("passengers")}
        />
        <small className="text-danger">
          {errors.passengers?.message}
        </small>
        <button type="submit">{t("search")}</button>
      </StyledForm>

      {(loading && !error)&&<div>Loading....</div>}
      {error && <h1>{error.message}</h1>}

    </FormContainer>
  
    <div>
        <SearchResultsContainer>
        {(searchResults && searchResults.length > 0) && (
          <div>
            <h2>Search Results:</h2>
            <ul>
              {searchResults.map((flight) => (
                <li key={flight._id}>
                  <p><b>Flight Number:</b> {flight.flightNumber}</p>
                  <p><b>Origin:</b> {flight.origin}</p>
                  <p><b>Destination:</b> {flight.destination}</p>
                  <p><b>Date:</b> {formatDate(flight.date)}</p>
                  <p><b>Start Time:</b>{formatTime(flight.startTime)}</p>
                  <p><b>End Time:</b> {formatTime(flight.endTime)}</p>
                  <p><b>Seats Available:</b> {flight.seatsAvailable}</p>
                  <button onClick={()=>handleBookButtonClick(flight._id,flight.flightNumber)}>Book</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(issue) && <b>You are not logged in</b>}
        </SearchResultsContainer>

        {bookResults && <BookResultsContainer>
        <p><b>{`Flight ${bookResults.flightNumber} booked`}</b></p>
        </BookResultsContainer>}

        {(searchResults.length<=0 && !error && !error1 && !bookResults && submitted) && <p><b>Flights Not Found</b></p>} 
        {(error1) && <p><b>Unable to book flight</b></p>}
    </div>
    </>

  );
};

export default FlightSearchForm;
