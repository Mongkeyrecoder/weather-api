import { useEffect, useState } from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
const API_key = '37964d61c09e551d9b090a698ed08906'
function App() {
  const [weather, setWeather] = useState(null)
  const [weatherCondition, SetweatherCondition] = useState(``)
  const getCity = async (city) => {
    console.log('getCitiy')
    setLoading(true)
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
    let data = await response.json();
    console.log('getCity', data)
    SetweatherCondition(data.weather[0].main)
    setLoading(false)
    setWeather(data)
  }
  const getCurrentLocation = () => {
    console.log('getCurrentLocation')
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude;
      setLoading(true)
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
      let data = await response.json();
      SetweatherCondition(data.weather[0].main)
      setLoading(false)
      setWeather(data)
    })
  }
  let [cityName, setcityName] = useState('')
  let Background = ''

  useEffect(() => {
    let Container = document.getElementById('container')
    if (cityName === 'Current Location' || cityName == '') {
      getCurrentLocation()
    }
    else {
      getCity(cityName)
    }

    if (weatherCondition === 'Clear') {
      Container.classList.remove('rain')
      Container.classList.remove('default')
      Container.classList.remove('snow')
      Container.classList.remove('clouds')
      Container.classList.add('clear')
    }
    else if (weatherCondition == 'Rain') {
      Container.classList.remove('clouds')
      Container.classList.remove('default')
      Container.classList.remove('snow')
      Container.classList.remove('clear')
      Container.classList.add('snow')
    } else if (weatherCondition === 'Clouds') {
      Container.classList.remove('rain')
      Container.classList.remove('default')
      Container.classList.remove('snow')
      Container.classList.remove('clear')

      Container.classList.add('clouds')
    }
    else if (weatherCondition == 'Snow') {
       Container.classList.remove('rain')
      Container.classList.remove('default')
      Container.classList.remove('clear')
      Container.classList.remove('clouds')
      Container.classList.add('snow')
    }
    else {
      Container.classList.remove('rain')
      Container.classList.remove('snow')
      Container.classList.remove('clear')
      Container.classList.remove('clouds')
      Container.classList.add('default')
    }

  }, [cityName, weatherCondition])
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  return (
    <div id="container">
      {weatherCondition}
      {

        loading ? <div className='container' > <ClipLoader
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
