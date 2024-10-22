// src/components/LocationSelector.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LocationSelector.css'; // Import the CSS file

const LocationSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    // Load countries on component mount
    useEffect(() => {
        const loadCountries = async () => {
            try {
                const response = await axios.get('https://crio-location-selector.onrender.com/countries');
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        loadCountries();
    }, []);

    // Handle country selection
    const handleCountryChange = async (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedState(''); // Reset selected state
        setCities([]); // Reset cities

        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
            setStates(response.data);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    // Handle state selection
    const handleStateChange = async (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedCity(''); // Reset selected city

        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`);
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    return (
        <div className="location-selector">
            <h1>Select Location</h1>
            <select onChange={handleCountryChange} value={selectedCountry}>
                <option value="">Select Country</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>

            <select onChange={handleStateChange} value={selectedState} disabled={!selectedCountry}>
                <option value="">Select State</option>
                {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                ))}
            </select>

            <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity} disabled={!selectedState}>
                <option value="">Select City</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

            {selectedCity && selectedState && selectedCountry && (
                <p>You Selected {selectedCity}, {selectedState}, {selectedCountry}</p>
            )}
        </div>
    );
};

export default LocationSelector;