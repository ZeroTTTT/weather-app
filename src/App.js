import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox.js';
import WeatherButton from './component/WeatherButton.js';
import ClipLoader from "react-spinners/ClipLoader";
// import { Routes, Route } from 'react-router-dom';

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
//2. 날씨정보에는 도시, 섭씨 화씨 날씨상태
//3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다
//5. 현재위치를 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다

function App() {

  const [weather,setWeather]=useState(null);
  const [city,setCity] = useState(null);
  const cities=['paris', 'new york', 'tokyo', 'seoul'];
  const [loading,setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  useEffect(()=>{
    if(city==null){
      getCurrentLocation()
    }else{
      getWeatherByCity()
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude; 
      getWeatherByCurrentLocation(lat, lon);
    });
  }

 const getWeatherByCurrentLocation = async(lat,lon) => {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c00b1fc64fff0edf5f491739184da656&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();

    setWeather(data);
    setLoading(false); 
  } catch (err) {    
    console.log("err",err.message);    
    setAPIError(err.message);
    setLoading(false);
  }
  }

  const getWeatherByCity= async()=>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c00b1fc64fff0edf5f491739184da656&units=metric`
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log("err",err.message);
      setAPIError(err.message);
      setLoading(false);
    }
  }




  return (
    <div>
      {loading ? (
        <div className='container'>        
          <ClipLoader color="#ff88c6b" loading={loading} size={150}/>
        </div>
      ) : !apiError ? (
        <div className='container'>        
        <WeatherBox weather={weather}/>
        <WeatherButton 
          cities={cities} 
          selectedCity={city} 
          handleCityChange={handleCityChange}
        />      
      </div>
      ) : (
        apiError
      )}   
    </div>    
  );
}

export default App;

// 