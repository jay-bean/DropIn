import { useState } from "react";
import { useEffect } from "react";
import './single-skatepark.css';

function Weather({ skatepark }) {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    async function fetchWeatherData() {
      const lat = skatepark.lat;
      const long = skatepark.long;
      const apiKey = '7489aa0d8dae4ecd951212610222408'
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=1`)
      let resData = await res.json();
      setWeatherData(resData)
    }
    fetchWeatherData();
  }, [])

  return (
    <div className="weather-container">
        {weatherData && weatherData.current &&
          <div className="weather-div">
            <div className="name-date-div">
              <div className="weather-city-div">
                <img className="weather-location-icon" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/C92DF9C4-7053-4DA7-A8F6-0BD9E45487A8_4_5005_c.jpeg"/>
                <p className="weather-city">{weatherData.location.name.toUpperCase()}</p>
              </div>
              <p className="weather-date">{weatherData.location.localtime.split(' ')[0].split('-')[1]}-{weatherData.location.localtime.split(' ')[0].split('-')[2]}-{weatherData.location.localtime.split(' ')[0].split('-')[0]}</p>
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
                <p className="max-min-temp"> <img className="arrows" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/9482DEDA-3A89-4647-87BB-EF527A986976_4_5005_c.jpeg"/>{weatherData.forecast.forecastday[0].day.maxtemp_f}° <img className="arrows" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/3F3FAB57-097E-477A-BC0D-010185E6C083_4_5005_c.jpeg"/>{weatherData.forecast.forecastday[0].day.mintemp_f}°</p>
                <div className="elements-container">
                  <p className="wind">Wind: {weatherData.current.wind_mph}mp/h</p>
                  <div className="rain-snow-div">
                    <p className="rain"><img className="arrows" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/2621FCE0-D97C-4C06-907C-01F5AF62C7B1_4_5005_c.jpeg"/> {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
                    <p className="snow"><img className="arrows" src="https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/0C6BA54B-B94F-456E-B2CE-51EF0E63F623_4_5005_c.jpeg"/> {weatherData.forecast.forecastday[0].day.daily_chance_of_snow}%</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        }
    </div>
  );
}

export default Weather;
