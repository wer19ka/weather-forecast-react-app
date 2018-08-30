import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTachometerAlt, faTint, faSun, faCloud, faBolt, faUmbrella, faSnowflake } from '@fortawesome/free-solid-svg-icons';

library.add(faThermometerHalf, faTachometerAlt, faTint, faSun, faCloud, faBolt, faUmbrella, faSnowflake);

class WeatherBox extends React.Component {
    render() {
        const {weather, temperature, pressure, humidity, units} = this.props;

        return (
            <section className="Current-weather">
                <p>Weather: {weather}</p>
                {this.weatherIcon()}
                <FontAwesomeIcon icon="thermometer-half" /><p>{temperature}{units}</p>
                <FontAwesomeIcon icon="tachometer-alt" /><p>Pressure: {pressure} hPa</p>
                <FontAwesomeIcon icon="tint" /><p>Humidity: {humidity}%</p>
            </section>
        );
    }

    weatherIcon = () => {
        let weather = this.props.weather;

        if (weather.includes("thunderstorm")) {
            return <FontAwesomeIcon icon="bolt"/>;
        } else if (weather.includes("rain")) {
            return <FontAwesomeIcon icon="umbrella"/>;
        } else if (weather.includes("snow")) {
            return <FontAwesomeIcon icon="snowflake"/>;
        } else if (weather.includes("clear sky")) {
            return <FontAwesomeIcon icon="sun"/>;
        } else if (weather.includes("cloud")) {
            return <FontAwesomeIcon icon="cloud"/>;
        }
    }
}

export default WeatherBox;
