import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const axios = require('axios');
import FlightSearchForm from "./FlightSearchForm";


jest.mock('axios');


describe("Flight Search Form",()=>{

    it("should display search results after form submission",async ()=>{
        mockedData = {
            data:{
                data:[{
                    flightNumber: 'F123',
                    origin: 'City A',
                    destination: 'City B',
                    date: '2023-08-14T18:30:00Z',
                    seatsAvailable: 150,
                    startTime: '2023-08-15T04:30:00Z',
                    endTime: '2023-08-15T06:30:00Z',
                }],
            },
        };

        axios.get.mockResolvedValue([mockedData]);

        render(<FlightSearchForm/>);

        fireEvent.change(screen.getByLabelText("Origin"),{target:{value:"City A"}});
        fireEvent.change(screen.getByLabelText("Desitination"),{target:{value:"City B"}});
        fireEvent.change(screen.getByLabelText("Date"),{target:{value:"2023-08-15"}});
        fireEvent.change(screen.getByLabelText("Passengers"),{target:{value:10}});
        fireEvent.click(screen.getByText('search'));

        await waitFor(() => {
            const flightNumberElement = screen.getByText('Flight Number:');
            expect(flightNumberElement).toBeInTheDocument();
        });

    });

});



/*fireEvent is a utility provided by the @testing-library/react library, 
which is commonly used for testing React components. 
It allows you to simulate user interactions with your components in a test environment. 
With fireEvent, you can mimic actions such as clicking, typing, submitting forms, and more, 
as if a user were interacting with your application.*/