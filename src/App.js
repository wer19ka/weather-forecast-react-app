import React from 'react';
import WeatherBox from './components/WeatherBox';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            userInput: "",
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

    getWeatherCurrent = (e) => {
        e.preventDefault();
        if (this.state.userInput) {
            const userInput = this.state.userInput;
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&APPID=b6907d289e10d714a6e88b30761fae22`)
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
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=metric&APPID=b6907d289e10d714a6e88b30761fae22`)
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
                    humidity={weatherCurrent.main.humidity}/>
                <button onClick={this.getWeatherForecast}>Get 5 days forecast!</button>
            </section>
        );
    };

    renderWeatherForecast = () => {
        const weatherForecastFiltered = this.prepareForecastData();
        return (
            <section className="Weather-forecast">
                <WeatherBox
                    weather={weatherForecastFiltered[0].weather[0].description}
                    temperature={weatherForecastFiltered[0].main.temp}
                    pressure={weatherForecastFiltered[0].main.pressure}
                    humidity={weatherForecastFiltered[0].main.humidity}/>
                <WeatherBox
                    weather={weatherForecastFiltered[1].weather[0].description}
                    temperature={weatherForecastFiltered[1].main.temp}
                    pressure={weatherForecastFiltered[1].main.pressure}
                    humidity={weatherForecastFiltered[1].main.humidity}/>
                <WeatherBox
                    weather={weatherForecastFiltered[2].weather[0].description}
                    temperature={weatherForecastFiltered[2].main.temp}
                    pressure={weatherForecastFiltered[2].main.pressure}
                    humidity={weatherForecastFiltered[2].main.humidity}/>
                <WeatherBox
                    weather={weatherForecastFiltered[3].weather[0].description}
                    temperature={weatherForecastFiltered[3].main.temp}
                    pressure={weatherForecastFiltered[3].main.pressure}
                    humidity={weatherForecastFiltered[3].main.humidity}/>
                <WeatherBox
                    weather={weatherForecastFiltered[4].weather[0].description}
                    temperature={weatherForecastFiltered[4].main.temp}
                    pressure={weatherForecastFiltered[4].main.pressure}
                    humidity={weatherForecastFiltered[4].main.humidity}/>
            </section>
        );
    };
}

export default App;
