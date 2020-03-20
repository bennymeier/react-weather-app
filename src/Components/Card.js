import React from 'react';
import Emoji from "./Emoji";

const TimeHeader = ({ time }) => <h2 className="card-time">{time}</h2>;
const EmojiWeather = (props) => {
    const { mainWeather: w, time, weather } = props;
    const getEmoji = () => {
        const t = parseInt(time);
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
        <Emoji className="card-weather-emoji" name={weather} emoji={getEmoji()} />
    );
};

const Degree = (props) => {
    const { temp, minTemp } = props;
    const temperature = Math.round(temp);
    const minTemperature = Math.round(minTemp);
    return (
        <div className="card-degree">
            <span className="card-degree">{temperature}°</span> <span className="card-separator">|</span> <span className="card-min-degree">{minTemperature}°</span>
        </div>
    );
};

export const Card = (props) => {
    const { time, date, minTemp, mainWeather, temp, weather } = props;
    return (
        <div className="card-body text-center">
            <TimeHeader time={time} />
            <span className="card-date">{date}</span>
            <EmojiWeather weather={weather} time={time} mainWeather={mainWeather} />
            <Degree temp={temp} minTemp={minTemp} />
        </div>
    );
};
export const getEmoji = (weather) => {
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
};