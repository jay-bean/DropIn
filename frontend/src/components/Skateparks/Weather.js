import { useState } from "react";
import { useEffect } from "react";
import './single-skatepark.css';
import dayjs from 'dayjs';

const weatherBtns = ["Current Weather", "Weekly Forecast", "Daylight"];

function Weather({ skatepark }) {
  const [weatherData, setWeatherData] = useState({});
  const [selectedWeatherButton, setSelectedWeatherButton] = useState(0);

  useEffect(() => {
    async function fetchWeatherData() {
      const lat = skatepark.lat;
      const long = skatepark.long;
      const apiKey = '7489aa0d8dae4ecd951212610222408'
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=5`)
      let resData = await res.json();
      setWeatherData(resData)
    }
    fetchWeatherData();
  }, [])

  const handleWeatherClick = (index) => {
    setSelectedWeatherButton(index);
  }

  return (
    <>
      <div className="weather-btn-container">
        {weatherBtns.map((btn, index) => {
          return (
            <button className={selectedWeatherButton === index ? 'weather-btn active-weather-btn' : 'weather-btn'} onClick={() => handleWeatherClick(index)}>{btn}</button>
          );
        })}
      </div>
      <div className="weather-container">
        <div style={{ display: selectedWeatherButton === 0 ? 'flex' : 'none' }} className="current-weather-container">
          {weatherData && weatherData.current &&
            <div className="weather-div">
              <div className="name-date-div">
                <div className="weather-city-div">
                  <img className="weather-location-icon" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/44A3E198-32A5-4E30-9677-EB8D6C0F09F7_4_5005_c.jpeg"/>
                  <p className="weather-city">{weatherData.location.name}</p>
                </div>
                <p className="weather-date">{dayjs(weatherData.forecast.date).format('dddd')}</p>
              </div>
              <div className="weather-info-container">
                <div className="weather-info-div-one">
                  <img className="current-condition-icon" src={`${weatherData.current.condition.icon}`}/>
                  <p className="current-condition-text">{weatherData.current.condition.text}</p>
                </div>
                <div className="weather-info-div-two">
                  <p className="current-temp">{weatherData.current.temp_f}°</p>
                  <p className="feels-like">Feels like {weatherData.current.feelslike_f}°</p>
                </div>
                <div className="weather-info-div-three">
                  <p className="max-min-temp">{weatherData.forecast.forecastday[0].day.maxtemp_f}° / {weatherData.forecast.forecastday[0].day.mintemp_f}° F</p>
                    <p className="wind">Wind: {weatherData.current.wind_mph}mp/h</p>
                    <div className="rain-snow-div">
                      <p className="rain"><img className="arrows" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/5CDC8854-37BE-4585-A1EA-0FEA1FCD7D04_4_5005_c.jpeg"/> {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                      <p className="snow"><img className="arrows" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/54ADF5BC-BFAC-4EC1-982F-DBCE35B8F6C1_4_5005_c.jpeg"/> {weatherData.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
                    </div>
                </div>
              </div>
            </div>
          }
      </div>
      <div style={{ display: selectedWeatherButton === 1 ? 'flex' : 'none' }} className="forecast-container">
        {weatherData && weatherData.forecast && weatherData.forecast.forecastday.map(day => {
          return (
            <div className="forecast-card">
              <p className="forecast-weekday">{dayjs(day.date).format('dddd')}</p>
              <img className="forecast-img" src={day.day.condition.icon}/>
              <div className="forecast-min-max">
                <p className="forecast-temps">{day.day.maxtemp_f}° / {day.day.mintemp_f}° F</p>
              </div>
            </div>
          );
        })}
      </div>
        {weatherData && weatherData.forecast && weatherData.forecast.forecastday &&
          <div style={{ display: selectedWeatherButton === 2 ? 'flex' : 'none' }} className="daylight-container">
            <div className="daylight-card">
              <p className="daylight-p-sun">Sunrise</p>
              <img className="daylight-img" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/71A764C2-DC0C-4C61-A21C-AEC07F153B10_4_5005_c.jpeg"/>
              <p className="daylight-p">{weatherData.forecast.forecastday[0].astro.sunrise}</p>
            </div>
            <div className="daylight-card">
              <p className="daylight-p-sun">Sunset</p>
              <img className="daylight-img" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/BB7FF1D0-B4F8-488B-824A-BFB959FA7833_4_5005_c.jpeg"/>
              <p className="daylight-p">{weatherData.forecast.forecastday[0].astro.sunset}</p>
          </div>
        </div>
        }
    </div>
  </>
  );
}

export default Weather;
