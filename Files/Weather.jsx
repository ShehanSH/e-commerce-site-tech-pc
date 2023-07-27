import  { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';



const Weather = ({latitude , longitude}) => {
    const [weatherData, setWeatherData] = useState(
        { name : '',
          temp : 0,
          description : '',
          icon : '',
      }
    )
    const API_KEY = '3d4c4d964c2239b7841a1f0d5397c190';
  
    const getWeather =  (lat , lan ) =>  {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lan}&appid=${API_KEY}&units=metric`)
        .then(response => {
          setWeatherData(
            { name : response.data.name,
              temp : response.data.main.temp,
              description : response.data.weather[0].description,
              icon : response.data.weather[0].icon,
            }
          )
          console.log(weatherData)
        }).catch(error => {
          console.log(error)
        })}

        useEffect(() => {
            if (latitude && longitude) {
                getWeather(latitude, longitude)
            }
        }, [latitude, longitude])

    
    return (
      <div className=' justify-center flex-col bg-cyan-600'>

        <div className='flex justify-center mb-2 '>
        <p className='justify-center font-bold text-4xl font-lexendG'>Weather</p>
        </div>
        
        {weatherData.name && 

        <div className='justify-center flex gap-4'>
        <p className='text-white font-semibold font-LexandExa'>{weatherData.name}</p>
        <p className='text-white font-semibold font-LexandExa'>{weatherData.temp}°C</p>
        <p className='text-white font-semibold font-LexandExa'>{weatherData.description}</p>
        <div className=''><img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="weather icon" className='flex'/></div>
        
        </div>
        }
        
      </div>
    )
  }

    export default Weather;