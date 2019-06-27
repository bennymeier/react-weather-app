import React from 'react';
import './App.css';
import { API_KEY } from "./config";
import { Card, getEmoji } from "./Components/Card";
import ProgressBar from "./Components/ProgressBar";
import TodaysCard from "./Components/TodaysCard";
import City from "./Components/City";
import { getDate, getTime, hasGeolocationSupport } from "./Helpers";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { btnDisabled: false, fixCity: false, geoAccess: null };
    this.coords = null;
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
    if (hasGeolocationSupport()) {
      this.fetchTodaysWeather();
      this.onScroll();
    }
  }
  onScroll() {
    window.addEventListener("scroll", this.fixCityBar.bind(this));
  }
  fixCityBar() {
    if (window.scrollY > 70 && !this.state.fixCity) {
      this.setState({ fixCity: true });
    } else if (window.scrollY <= 70 && this.state.fixCity) {
      this.setState({ fixCity: false })
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.fixCityBar.bind(this));
  }
  fetchTodaysWeather() {
    navigator.geolocation.getCurrentPosition(async (c) => {
      this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.coords.latitude}&lon=${this.coords.longitude}&units=metric&APPID=${API_KEY}`)
        .then(weather => weather.json())
        .then(data => this.setState({ current: data, geoAccess: true }, () => console.log(this.state)));
    }, () => alert("Permission denied. Can't show weather information."));
  }
  fetchForecastWeather() {
    navigator.geolocation.getCurrentPosition(async (c) => {
      //console.log(`http://api.openweathermap.org/data/2.5/forecast?lat=${c.coords.latitude}&lon=${c.coords.longitude}&units=metric&APPID=${API_KEY}`);
      this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.coords.latitude}&lon=${this.coords.longitude}&units=metric&APPID=${API_KEY}`)
        .then(weather => weather.json())
        .then(data => this.setState({ ...data, btnDisabled: true, geoAccess: true }, () => console.log(this.state)));
    }, () => alert("Permission denied. Can't show weather information."));
  }
  render() {
    return (
      <>
        {this.state.geoAccess && <ProgressBar />}
        {this.state.current && this.state.current.name && <City current={this.state.current} fix={this.state.fixCity} />}
        {this.state.current && this.state.current.weather && <TodaysCard emoji={this.state.current.weather[0]} main={this.state.current.main} sys={this.state.current.sys} />}
        {this.state.current && this.state.geoAccess && <button disabled={this.state.btnDisabled} style={{ opacity: this.state.btnDisabled ? "0" : "1" }} onClick={this.fetchForecastWeather.bind(this)} className="btn-fetch">Load 5 day weather forecast</button>}
        {this.state.geoAccess && <div className="container">
          {this.state.list && this.state.list.map((w, index) =>
            <Card key={index} date={getDate(w.dt)} emoji={getEmoji(w.weather[0].main, getTime(w.dt))} mainWeather={w.weather[0].main} maxTemp={w.main.temp_max} minTemp={w.main.temp_min} temp={w.main.temp} time={getTime(w.dt)} weather={w.weather[0].description} />)}
        </div>}
      </>
    );
  }
}

export default App;
