import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities,selectedCity,handleCityChange}) => {
  return (
    <div>
        {/* <Button variant="warning">Current Location</Button> 현재위치 재조회 미적용*/}
        {/* <Button variant="warning"  onClick={()=>setCity("")}>Current Location</Button> 내가 적용했던 방식*/}

        <Button 
          variant= {`${selectedCity == null ? "warning" : "outline-warning"}`}
          onClick={()=>handleCityChange("current")}
        >
          Current Location
        </Button> 

        { cities.map((item, index) => (
            <Button 
              variant={`${selectedCity == item ? "warning" : "outline-warning"}`}
              key={index} 
              onClick={()=>handleCityChange(item)} 
            >
              {item}
            </Button>
        ))}
    </div>
  )
}

export default WeatherButton