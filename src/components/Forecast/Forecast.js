import React, { useEffect, useState } from "react";
import Conditions from "../Conditions/Conditions";
import classes from "./Forecast.module.css";
import umbrella from "../../assets/umbrella.jpg";
import lake from "../../assets/lake.jpg";
import lakeGif from "../../assets/lake.gif";
import stars from "../../assets/stars.jpg";
import '../../App.css'


const Forecast = ({setGif}) => {
    
    const [responseObj, setResponseObj] = useState({});
    const [city, setCity] = useState("");
    const [unit, setUnit] = useState("imperial");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const uriEncodedCity = encodeURIComponent(city);
  
  function getForecast(e) {
    e.preventDefault();

    if (city.length === 0) {
      return setError(true);
    }

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_api_key,
      },
    };

    setError(false);
    setResponseObj({});
    setLoading(true);

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        
        if (response.cod !== 200) {
          throw new Error();
        }
        setResponseObj(response);
        setLoading(false);
        if (response.weather[0].description === "overcast clouds") {
          setGif(umbrella);
        } else if (response.weather[0].description === "light rain") {
          setGif(stars);
        } else if (response.weather[0].description === "clear sky") {
          setGif(lakeGif);
        }
        
        
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }
  
  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <input
          type="text"
          placeholder="Enter City"
          maxLength="50"
          value={city}
          className={classes.textInput}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
          Celsius
        </label>
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>

        <button className={classes.Button} type="submit">
          Get forecast
        </button>
      </form>
      <Conditions
        responseObj={responseObj}
        error={error}
        loading={loading}
      />
      
    </div>
  );
};
export default Forecast;
