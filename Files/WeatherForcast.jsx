import { useState , useEffect} from 'react'
import axios from 'axios';

function WeatherForcast( {latitude , longitude}) {
    const [ weatherData , setWeatherData] = useState([
        {
            date : "",
            temp: "",
            weather: "",
            icon: ""
        }
    ])

    const API_KEY = '3d4c4d964c2239b7841a1f0d5397c190';

    const getWeatherForcast =   async (lat , lon ) => {
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const updatedWeatherData = [];
         for (let i = 0; i < response.data.list.length; i+=2) {
             updatedWeatherData.push({
                date: response.data.list[i].dt_txt,
                temp: response.data.list[i].main.temp,
                weather : response.data.list[i].weather[0].description,
                icon : response.data.list[i].weather[0].icon,
            }

             );
            }
            setWeatherData(updatedWeatherData)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        
        getWeatherForcast(latitude , longitude)

      }, [])

    

  return (
    <div className='flex justify-center'>
<div>
    <table className='justify-center' style={{ border: '2px solid black', width: '50%', maxWidth: '75vw' ,   }}>
        <tr className='whitespace-nowrap' style={{ border: '1px solid black'}}>
        <th className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '8px'}} > Date and Time</th>
        <th className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '8px'}}> Temp</th>
        <th className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '8px'}}> Weather</th>
        <th className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '8px'}}> icon</th>
        </tr>
       { weatherData.map((data , index) => (
        <tr key={index} style={{ border: '1px solid black'}}>
            <td className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '2px' }}>{data.date}</td>
            <td className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '2px'}}>{data.temp}</td>
            <td className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '2px'}}>{data.weather}</td>
            <td className='whitespace-nowrap' style={{ border: '1px solid black' , padding : '2px'}}>
            <img src={`https://openweathermap.org/img/w/${data.icon}.png`} alt="Weather Icon" />
            </td>
        </tr>

       ))}
    </table>
    </div>

    </div>
  )
}
export default WeatherForcast