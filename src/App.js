import React from 'react';
import './App.css';
import { API_KEY } from "./config";
const Card = (props) => {
  const getEmoji = () => {
    const w = props.mainWeather;
    const t = parseInt(props.time);
    if (w === "Clouds") {
      return "☁️";
    } else if (w === "Rain") {
      return "🌧️";
    } else if (w === "Sun") {
      return (t > 0 && t < 6) ? "🌙" : "☀️";
    } else if (w === "Clear") {
      return (t > 0 && t < 6) ? "🌙" : "☀️"; // "🌈" "🌌";
    } else if (w === "Snow") {
      return "❄️";
    } else if (w === "Extreme") {
      return "🌩️";
    }
  };
  return (
    <div className="card-body" style={{ background: props.backgroundColor }}>
      <h2 className="card-time">{props.time}</h2>
      <span className="card-date">{props.date}</span>
      <span className="card-weather-emoji" role="img" title={props.weather} aria-label={props.weather}>{getEmoji()}</span>
      <div className="card-degree">
        <span className="card-degree">{props.temp}°</span> <span className="card-separator">|</span> <span className="card-min-degree">{props.minTemp}°</span>
      </div>
    </div>
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.coords = null;
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (c) => {
        //console.log(`http://api.openweathermap.org/data/2.5/forecast?lat=${c.coords.latitude}&lon=${c.coords.longitude}&units=metric&APPID=${API_KEY}`);
        this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.coords.latitude}&lon=${this.coords.longitude}&units=metric&APPID=${API_KEY}`)
          .then(weather => weather.json())
          .then(data => this.setState({ ...data }, () => console.log(this.state)));
      }, () => alert("Permission denied. Can't show weather information."));
    } else {
      alert("No Geolocation Support!")
    }
  }
  getDate(date) {
    return new Date(date * 1000).toLocaleDateString();
  }
  getTime(time) {
    return `${new Date(time * 1000).getHours()}:00`;
  }
  getEmoji(weather) {
    /**
     * Timezones:
     * Night: 0-6
     * Morning: 6-11
     * Afternoon: 11-18
     * Evening- 18-0
     */
    if (weather === "Clouds") {
      return "☁️";
    } else if (weather === "Rain") {
      return "🌧️";
    } else if (weather === "Sun") {
      return "☀️";
    } else if (weather === "Clear") {
      return "☀️";
    } else if (weather === "Snow") {
      return "❄️";
    } else if (weather === "Extreme") {
      return "🌩️";
    }
  }
  getBackgroundColor(time) {
    const t = parseInt(time);
    if (t > 0 && t < 6) {
      return "linear-gradient(117deg, rgb(185, 185, 185), rgba(23, 23, 23, 0.82))";
    } else if (t >= 6 && t <= 11) {
      return "linear-gradient(145deg, #ffffff, #fff4a9)";
    } else if (t >= 11 && t <= 18) {
      return "linear-gradient(328deg, #fde051, rgb(255, 244, 169))";
    } else if (t >= 18 && t <= 23) {
      return "linear-gradient(100deg, rgb(253, 224, 81), rgba(140, 140, 140, 0.02))";
    } else {
      return "linear-gradient(117deg, rgb(185, 185, 185), rgba(23, 23, 23, 0.82))";
    }
  }
  render() {
    return (
      <div className="text-center">
        <h1>{this.state.city && this.state.city.name && this.state.city.name}</h1>
        <div className="container">
          {this.state.list && this.state.list.map((w, index) => <Card key={index} backgroundColor={this.getBackgroundColor(this.getTime(w.dt))} date={this.getDate(w.dt)} emoji={this.getEmoji(w.weather[0].main, this.getTime(w.dt))} mainWeather={w.weather[0].main} maxTemp={w.main.temp_max} minTemp={w.main.temp_min} temp={w.main.temp} time={this.getTime(w.dt)} weather={w.weather[0].description} />)}
        </div>
      </div>
    );
  }
}

export default App;
