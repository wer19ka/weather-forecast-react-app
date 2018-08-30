import React from 'react';
import './WeatherBox.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTachometerAlt, faTint, faSun, faCloud, faBolt, faUmbrella, faSnowflake } from '@fortawesome/free-solid-svg-icons';

library.add(faThermometerHalf, faTachometerAlt, faTint, faSun, faCloud, faBolt, faUmbrella, faSnowflake);

class WeatherBox extends React.Component {
    render() {
        const {weather, temperature, pressure, humidity, units} = this.props;

        return (
            <section className="weather-box">
                <div className="weather-parameter-main">
                    {this.weatherIcon()}
                    <h4>{weather}</h4>
                </div>
                <ul className="weather-parameters">
                    <li><FontAwesomeIcon icon="thermometer-half" className="parameter-icon fa-xs icon" />{temperature}{units}</li>
                    <li><FontAwesomeIcon icon="tachometer-alt" className="parameter-icon fa-xs icon" />{pressure} hPa</li>
                    <li><FontAwesomeIcon icon="tint" className="parameter-icon fa-xs icon" />{humidity}%</li>
                </ul>
            </section>
        );
    }

    weatherIcon = () => {
        let weather = this.props.weather;

        if (weather.includes("thunderstorm")) {
            return <FontAwesomeIcon icon="bolt" className="main-icon fa-3x icon" />;
        } else if (weather.includes("rain")) {
            return <FontAwesomeIcon icon="umbrella" className="main-icon fa-3x icon" />;
        } else if (weather.includes("snow")) {
            return <FontAwesomeIcon icon="snowflake" className="main-icon fa-3x icon" />;
        } else if (weather.includes("clear sky")) {
            return <FontAwesomeIcon icon="sun" className="main-icon fa-3x icon" />;
        } else if (weather.includes("cloud")) {
            return <FontAwesomeIcon icon="cloud" className="main-icon fa-3x icon" />;
        }
    }
}

export default WeatherBox;
