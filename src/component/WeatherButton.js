import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



const WeatherButton = ({ setcityName, cityName }) => {
    let Cl = '';
    let PA = '';
    let NY = ''
    if (cityName == 'Current Location') {
        Cl = 'CL'
    }
    else if (cityName == 'paris') {
        PA = 'PA'
    }
    else if (cityName == 'new york') {
        NY = 'NY'
    }
    return (
        <div>
            <Button variant="warning" className={`${Cl}`} onClick={(e) => {
                setcityName(e.currentTarget.textContent)
            }}>Current Location</Button>
            <Button variant="warning" className={`${PA}`} onClick={(e) => {
                setcityName(e.currentTarget.textContent)
            }}
            >paris</Button>
            <Button variant="warning" className={`${NY}`} onClick={(e) => {
                setcityName(e.currentTarget.textContent)
            }}>new york</Button>
        </div>
    )
}

export default WeatherButton
