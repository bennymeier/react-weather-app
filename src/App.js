import React from "react";
import "./App.css";
import { API_KEY } from "./config";
import { Card, getEmojiClassName } from "./Components/Card";
import ProgressBar from "./Components/ProgressBar";
import TodaysCard from "./Components/TodaysCard";
import City from "./Components/City";
import { getDate, getTime, hasGeolocationSupport } from "./helpers";
import Emoji from "./Components/Emoji";
import Anchor from "./Components/Anchor";

const PERMISSION_DENIED = "Permission denied. Can't show weather information.";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: false,
      darkMode: false,
      fixCity: false,
      geoAccess: null,
      forecasts: []
    };
    this.coords = null;
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    if (hasGeolocationSupport()) {
      this.fetchTodaysWeather();
      this.onScroll();
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.fixCityBar);
  };

  fetchTodaysWeather = () => {
    navigator.geolocation.getCurrentPosition((c) => {
      this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.coords.latitude}&lon=${this.coords.longitude}&units=metric&APPID=${API_KEY}`)
        .then(weather => weather.json())
        .then(data => this.setState({ current: data, geoAccess: true }));
    }, () => alert(PERMISSION_DENIED));
  };

  fetchForecastWeather = () => {
    navigator.geolocation.getCurrentPosition((c) => {
      this.coords = { longitude: c.coords.longitude, latitude: c.coords.latitude };
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.coords.latitude}&lon=${this.coords.longitude}&units=metric&APPID=${API_KEY}`)
        .then(weather => weather.json())
        .then(data => {
          // Take every 8th forecast: 40 forecasts/5 days = 8
          const forecasts = data.list.filter((_, index) => index % 8 === 0);
          this.setState({ ...data, forecasts, btnDisabled: true, geoAccess: true })
        });
    }, () => alert(PERMISSION_DENIED));
  };

  fixCityBar = () => {
    const { fixCity } = this.state;
    if (window.scrollY > 70 && !fixCity) {
      this.setState({ fixCity: true });
    } else if (window.scrollY <= 70 && fixCity) {
      this.setState({ fixCity: false });
    }
  };

  onScroll() {
    window.addEventListener("scroll", this.fixCityBar);
  }

  render() {
    const { geoAccess, current, fixCity, btnDisabled, forecasts } = this.state;
    if (geoAccess && current && !!API_KEY) {
      return (
        <>
          <ProgressBar />
          <City current={current} fix={fixCity} />
          <TodaysCard
            emoji={current.weather[0]}
            main={current.main}
            city={current.name}
          />
          <button
            disabled={btnDisabled}
            style={{ opacity: btnDisabled ? "0" : "1", visibility: btnDisabled ? "hidden" : ""}}
            onClick={this.fetchForecastWeather.bind(this)}
            className="btn-fetch"
          >
            Load 5 day weather forecast
          </button>
          {this.state.list && (
            <div className="container">
              {forecasts.map((w, index) => (
                <Card
                  key={index}
                  date={getDate(w.dt)}
                  emoji={getEmojiClassName(w.weather[0].main, getTime(w.dt))}
                  mainWeather={w.weather[0].main}
                  maxTemp={w.main.temp_max}
                  minTemp={w.main.temp_min}
                  temp={w.main.temp}
                  time={getTime(w.dt)}
                  weather={w.weather[0].description}
                />
              ))}
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          {!API_KEY && (
            <h1 className="text-center">
              No API-Key given in <i>src\config.js</i>
            </h1>
          )}
          {!geoAccess && (
            <h2 className="text-center heading-location-access">
              Allow location access.
            </h2>
          )}
          <div className="container center-item">
            <h2>
              <Emoji name="Earth Globe" emoji="🌎" /> Weather App build with...{" "}
              <Emoji name="Earth Globe" emoji="🌎" />
            </h2>
            <ul className="no-margin">
              <li>
                <Anchor href="https://reactjs.org" text="React" />
              </li>
              <li>
                <Anchor
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation"
                  text="Geolocation"
                />
              </li>
              <li>
                <Anchor
                  href="https://openweathermap.org"
                  text="openweathermap.org-API"
                />
              </li>
            </ul>
          </div>
        </>
      );
    }
  }
}

export default App;
