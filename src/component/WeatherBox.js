import React from 'react'

const WeatherBox = ({weather}) => {
  return (
    <div className='weather-box'>
        <div>{weather?.name || '날씨를 가져오는데 실패했습니다.' }</div>
        {/* <h2>{weather?.main.temp }C</h2> */}
        {/* <h3>{weather?.weather[0].description}</h3> */}
        <h2>{weather && weather.main ? weather.main.temp  : "" }C</h2>
        <h3>{weather && weather.main ? weather.weather[0].description : "" }</h3>
    </div>
  )
}

export default WeatherBox