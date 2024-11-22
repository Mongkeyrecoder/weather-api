import { useEffect, useState } from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
const API_key = '37964d61c09e551d9b090a698ed08906'
function App() {
  const [weather, setWeather] = useState(null)
  const getCity = async (city) => {
    console.log(city)
    setLoading(true)
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
    let data = await response.json();
    console.log('getCity', data)
    setLoading(false)
    setWeather(data)
  }
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude;
      setLoading(true)
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
      let data = await response.json();
      setLoading(false)
      setWeather(data)
    })
  }
  let [cityName, setcityName] = useState('')


  useEffect(() => {

    if (cityName === 'Current Location' || cityName == '') {
      getCurrentLocation()
    }
    else {
      getCity(cityName)
    }
  }, [cityName])
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  return (
    <div >
      {
        
        loading ?<div className='container'> <ClipLoader
          color={color}
          loading={loading}

          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /> 
        </div>
         : <div className='container'>

          <WeatherBox weather={weather} />
          <WeatherButton setcityName={setcityName} cityName={cityName} />
        </div>
      }


    </div>
  );
}

export default App;
