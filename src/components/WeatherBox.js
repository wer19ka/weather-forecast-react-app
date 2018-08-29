import React from 'react';

class WeatherBox extends React.Component {
    render() {
        const {weather, temperature, pressure, humidity} = this.props;
        return (
            <section className="Current-weather">
                <p>Weather: {weather}</p>
                <p>Temperature: {temperature} Celsius degree</p>
                <p>Pressure: {pressure} hPa</p>
                <p>Humidity: {humidity}%</p>
            </section>
        );
    }
}

export default WeatherBox;
