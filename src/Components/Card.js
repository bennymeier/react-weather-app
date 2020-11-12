import React from 'react';
import Emoji from './Emoji';

const EmojiWeather = (props) => {
  const { mainWeather: w, time, weather } = props;
  const getEmoji = () => {
    const t = parseInt(time);
    const weatherLC = w.toLowerCase();
    if (weatherLC === 'clouds') {
      return '☁️';
    } else if (weatherLC === 'rain') {
      return '🌧️';
    } else if (weatherLC === 'sun') {
      return t > 0 && t < 6 ? '🌙' : '☀️';
    } else if (weatherLC === 'clear') {
      return t > 0 && t < 6 ? '🌙' : '☀️'; // "🌈" "🌌";
    } else if (weatherLC === 'snow') {
      return '❄️';
    } else if (weatherLC === 'extreme') {
      return '🌩️';
    }
  };
  return (
    <Emoji className="card-weather-emoji" name={weather} emoji={getEmoji()} />
  );
};

const Degree = (props) => {
  const { temp } = props;
  const temperature = Math.round(temp);
  return (
    <div className="card-degree">
      <span className="card-degree">{temperature}°C</span>
    </div>
  );
};

export const Card = (props) => {
  const { time, date, minTemp, mainWeather, temp, weather } = props;
  return (
    <div className="card-body text-center">
      <span className="card-date">{date}</span>
      <EmojiWeather weather={weather} time={time} mainWeather={mainWeather} />
      <Degree temp={temp} minTemp={minTemp} />
    </div>
  );
};
export const getEmojiClassName = (weather) => {
    const weatherLC = weather.toLowerCase();
  if (weatherLC === 'clouds') {
    return 'cloud';
  } else if (weatherLC === 'rain') {
    return 'rain';
  }
  return 'sun';
};
