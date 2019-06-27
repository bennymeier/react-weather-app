import React from 'react';
import './App.css';
import { API_KEY } from "./config";
import { Card, getEmoji } from "./Components/Card";
import ProgressBar from "./Components/ProgressBar";
import TodaysCard from "./Components/TodaysCard";

const City = (props) => <h1 className="text-center"><span role="img" title={props.city} aria-label="Round Pushpin">📍</span> <span className="today-city">{props.city}</span></h1>;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { btnDisabled: false, geoAccess: null };
    this.coords = null;
  }
  componentDidMount() {
    this.fetchTodaysWeather();
  }
  fetchTodaysWeather() {
    if (this.hasGeolocation) {
      navigator.geolocation.getCurrentPosition(async (c) => {
        this.setState({ geoAccess: true });
        this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.coords.latitude}&lon=${this.coords.longitude}&units=metric&APPID=${API_KEY}`)
          .then(weather => weather.json())
          .then(data => this.setState({ current: data }, () => console.log(this.state)));
      }, () => alert("Permission denied. Can't show weather information."));
    }
  }
  hasGeolocation() {
    return !!navigator.geolocation;
  }
  fetchForecastWeather() {
    this.setState({ btnDisabled: true });
    if (this.hasGeolocation()) {
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
    const d = new Date(date * 1000);
    const day = d.getDay();
    const getDay = () => {
      if (day === 1) {
        return "Monday";
      } else if (day === 2) {
        return "Tuesday";
      } else if (day === 3) {
        return "Wednesday";
      } else if (day === 4) {
        return "Thursday";
      } else if (day === 5) {
        return "Friday";
      } else if (day === 6) {
        return "Saturday";
      } else {
        return "Sunday";
      }
    };
    return new Date().getDay() === day ? "Today" : getDay();
  }
  getTime(time) {
    return `${new Date(time * 1000).getHours()}:00`;
  }
  render() {
    return (
      <>
        {this.state.geoAccess && <ProgressBar />}
        {this.state.current && this.state.current.name && <City city={this.state.current.name} />}
        {this.state.current && this.state.current.weather && <TodaysCard emoji={this.state.current.weather[0]} main={this.state.current.main} sys={this.state.current.sys} />}
        {this.state.current && this.state.geoAccess && <button disabled={this.state.btnDisabled} style={{ opacity: this.state.btnDisabled ? "0" : "1" }} onClick={this.fetchForecastWeather.bind(this)} className="btn-fetch">Load 5 day weather forecast</button>}
        {this.state.geoAccess && <div className="container">
          {this.state.list && this.state.list.map((w, index) =>
            <Card key={index} date={this.getDate(w.dt)} emoji={getEmoji(w.weather[0].main, this.getTime(w.dt))} mainWeather={w.weather[0].main} maxTemp={w.main.temp_max} minTemp={w.main.temp_min} temp={w.main.temp} time={this.getTime(w.dt)} weather={w.weather[0].description} />)}
        </div>}
      </>
    );
  }
}

export default App;
