import React from 'react';
import WeatherBox from './components/WeatherBox';
import configuration from './config';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            userInput: "",
            units: "",
            weatherCurrent: null,
            weatherForecast: null
        };
    }

    render() {
        const weatherCurrent = this.state.weatherCurrent;
        const weatherForecast = this.state.weatherForecast;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Weather Forecast</h1>
                </header>
                <main className="App-container">
                    <form>
                        <input type="text" placeholder="City..." onInputCapture={this.getUserInput} autoFocus={true}/>
                        <button onClick={this.getWeatherCurrent}>Get current weather!</button>
                    </form>
                    {weatherCurrent && this.renderWeatherCurrent()}
                    {weatherForecast && this.renderWeatherForecast()}
                </main>
            </div>
        );
    }

    componentDidMount() {
        this.getDate();
        this.setUnits(configuration.units);
    }

    getDate = () => {
        const date = new Date();
        this.setState({date: date.toDateString()});
    };

    getUserInput = (e) => {
        e.preventDefault();
        this.setState({
            userInput: e.target.value,
            weatherForecast: null,
            weatherCurrent: null
        });
    };

    setUnits = (units) => {
        switch (units) {
            case "celsius":
                this.setState({units: "metric", unitsSymbol: "°C"});
                break;
            case "fahrenheit":
                this.setState({units: "imperial", unitsSymbol: "°F"});
                break;
        }
    };

    getWeatherCurrent = (e) => {
        e.preventDefault();
        if (this.state.userInput) {
            const userInput = this.state.userInput;
            const units = this.state.units;
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=${units}&APPID=${configuration["api-key"]}`)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(data => this.setState({weatherCurrent: data}));
                    } else {
                        alert(`Couldn't get weather for ${userInput}.`);
                    }
                })
        }
    };

    getWeatherForecast = (e) => {
        e.preventDefault();
        if (this.state.userInput) {
            const userInput = this.state.userInput;
            const units = this.state.units;
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=${units}&APPID=${configuration["api-key"]}`)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(data => this.setState({weatherForecast: data}));
                    } else {
                        alert(`Couldn't get forecast for ${userInput}.`);
                    }
                })
        }
    };

    prepareForecastData = () => {
        const weatherForecast = this.state.weatherForecast;
        return weatherForecast.list.filter(item => item.dt_txt.includes("12:00:00"));
    };

    renderWeatherCurrent = () => {
        const weatherCurrent = this.state.weatherCurrent;
        return (
            <section className="Weather-forecast">
                <p>{this.state.date}</p>
                <h3>Current weather in {this.state.userInput}:</h3>
                <WeatherBox
                    weather={weatherCurrent.weather[0].description}
                    temperature={weatherCurrent.main.temp}
                    pressure={weatherCurrent.main.pressure}
                    humidity={weatherCurrent.main.humidity}
                    units={this.state.unitsSymbol}/>
                <button onClick={this.getWeatherForecast}>Get 5 days forecast!</button>
            </section>
        );
    };

    renderWeatherForecast = () => {
        const weatherForecastFiltered = this.prepareForecastData();
        return (
            <section className="Weather-forecast">
                {weatherForecastFiltered.map(item => (
                    <WeatherBox
                        key={item.dt}
                        weather={item.weather[0].description}
                        temperature={item.main.temp}
                        pressure={item.main.pressure}
                        humidity={item.main.humidity}
                        units={this.state.unitsSymbol}/>))}
            </section>
        );
    };
}

export default App;
