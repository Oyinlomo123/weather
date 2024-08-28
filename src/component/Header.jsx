import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"




const Header = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let timeString = `${hours}:${minutes} `;
  
  const [myWeather, setWeather]= useState(null)
  const [cityName, setCityName] = useState("Lagos");
  const [query, setQuery] = useState("London");
  const [temp, setTemp] = useState(20);
  const [description, setDescription] = useState("cloud")
  const [humidity, setHumidity] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [visibility, setVisibility] = useState(0)
  const [wind, setWind] = useState()
  
  async function getWeatherDefault () {
    const apikey = "19bd4e969d077d71612eeeffccac7b98"
    const myURL =`https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=${apikey}&units=metric`

    await axios.get(myURL).then((res)=>{
      setWeather(res.data);
      setTemp((res.data.main.temp).toFixed(0))
      setDescription(res.data.weather[0].description)
      setHumidity(res.data.main.humidity)
      setMin((res.data.main.temp_min).toFixed(0))
      setMax((res.data.main.temp_max).toFixed(0))
      setVisibility(res.data.visibility)
      setWind(res.data.wind.speed)
      console.log(res.data)
    });
  };
  // console.log(cityName);
  async function getWeatherData() {
    const apikey = "19bd4e969d077d71612eeeffccac7b98"
    const myURL =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`

    await axios.get(myURL).then((res)=>{
      setWeather(res.data);
      setTemp((res.data.main.temp).toFixed(0))
      setDescription(res.data.weather[0].description)
      setHumidity(res.data.main.humidity)
      setMin((res.data.main.temp_min).toFixed(0))
      setMax((res.data.main.temp_max).toFixed(0))
      setVisibility(res.data.visibility)
      setWind(res.data.wind.speed)
      console.log(res.data)
    });
  };
  useEffect(()=>{
    getWeatherDefault();
  },[]
  );
 
  // const handleSubmit =(e)=>{
  //   e.preventDefault()
  //   setQuery(cityName)
  // };
  return (
    <>
    <div className="body">
      <div className='weather-content'>
        <h1>{timeString}</h1>
        <h4>{formattedDate}</h4>
        <div>
          <input className="search" type="search" name="" id="" placeholder="search" value={cityName}
          onChange={(e)=> {setCityName (e.target.value)
            getWeatherData()
          }}/>
          <button onClick={getWeatherData} className="btn"><i className="ri-search-line"></i></button>
          
        </div>
      </div>
    </div>
    <div className="read">
    <div className="country">
          <h1>{temp}°C</h1>
          <h3>{cityName}</h3>
          <h4>{description}</h4>
    </div>
        <div className="temperature">
          <h4>Felt temp: <span>{temp}°C</span></h4>
          <h4>Humidity: <span>{humidity}</span></h4>
          <h4>wind: <span>{wind}</span></h4>
        </div>
        <div className="temperature">
        <h4>Visibility: <span>{visibility} km</span></h4>
        <h4>max Temp: <span>{max}°C </span></h4>
        <h4>min temp: <span>{min}°C </span></h4>
        </div>
      </div>
    </>
  )
}

export default Header