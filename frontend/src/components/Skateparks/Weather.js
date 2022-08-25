import { useState } from "react";
import { useEffect } from "react";
import './single-skatepark.css';

function Weather({ skatepark }) {
  const [weatherData, setWeatherData] = useState({});

  // useEffect(() => {
  //   async function fetchWeatherData() {
  //     const lat = skatepark.lat;
  //     const long = skatepark.long;
  //     const apiKey = '72e1254d82dca8a4820cbebc1fa55825'
  //     const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`);
  //     // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`)
  //     let resData = await res.json();
  //     console.log(resData, 'res dataaaaaaaaaaaa')
  //     setWeatherData(resData)
  //   }
  //   fetchWeatherData();
  // }, [])

  useEffect(() => {
    async function fetchWeatherData() {
      const lat = skatepark.lat;
      const long = skatepark.long;
      const apiKey = '7489aa0d8dae4ecd951212610222408'
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=1`)
      let resData = await res.json();
      console.log(resData, 'res dataaaaaaaaaaaa new dealio')
      setWeatherData(resData)
      console.log(weatherData, 'this is the weather dataaaaaa')
    }
    fetchWeatherData();
  }, [])

  return (
    <div className="weather-container">
        {weatherData && weatherData.current &&
          <div className="weather-div">
            {console.log(weatherData)}
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
                <p className="current-temp">{weatherData.current.temp_f}</p>
                <p>Feels like {weatherData.current.feelslike_f}</p>
              </div>
              <div className="weather-info-div-three">
                <p className="max-min-temp"> ⌄{weatherData.forecast.forecastday[0].day.maxtemp_f} ⌃{weatherData.forecast.forecastday[0].day.mintemp_f}</p>
                <p className="wind">Wind: {weatherData.current.wind_mph}mp/h</p>
                <div className="rain-snow-div">
                  <p className="rain">💧 {weatherData.forecast.forecastday[0].day.daily_chance_of_rain*100}%</p>
                  <p className="snow">❄️ {weatherData.forecast.forecastday[0].day.daily_chance_of_snow*100}%</p>
                </div>
              </div>
            </div>
          </div>
        }
    </div>
  );
}

export default Weather;
