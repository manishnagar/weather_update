import React, { useState } from 'react'
import { FaSearch, FaWind } from 'react-icons/fa'
import '../component/wheather.css'
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

const Wheather = () => {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState();
  const [error, setError] = useState();

  const API_KEY = "54fca053ade2b4f2024b24ebb0b343a3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;


  function handleOnChange(event) {
    setCity(event.target.value);
    console.log(event.target.value);
  }

  async function FetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        console.log(output, "hello")
        setError('');
      }
      else {
        setError('No Data found, Please enter valid city')
      }
    }
    catch (error) {

    }
  }

  return (
    <div>

      <div className='container'>
      <div className='text'>Please check current weather By City Name </div>
        <div className='city'>
          <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name'></input>
          <button onClick={() => FetchData()}><FaSearch></FaSearch></button>
        </div>
        {error && <div className='error-message'>{error}</div>}
        {
          weather && weather.weather &&
          <div className='content'>
            <div className='weather-image'>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
              <div className='desc'>{weather.weather[0].description}</div>
            </div>

            <div className='weather-temp'>
              <div>{weather.main.temp}<span>&deg;C</span></div>
            </div>

            <div className='weather-city'>
              <div className='location'>
                <MdLocationOn></MdLocationOn>
              </div>
              <div className='city-name'>{weather.name}, <span>{weather.sys.country}</span></div>
            </div>

            <div className='weather-stats'>
              <div className='wind'>
                <div className='wind-icon'>
                  <FaWind></FaWind>
                </div>

                <h3 className='wind-speed'>{weather.wind.speed}<span>Km/h</span></h3>
                <div className='wind-heading'>Wind Speed</div>
              </div>

              <div className='humidity'>
                <div className='humidity-icon'>
                  <WiHumidity></WiHumidity>
                </div>
                <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                <h3 className='humidity-heading'>Humidity</h3>

              </div>
            </div>

          </div>
        }
      </div>
    </div>
  )
}

export default Wheather