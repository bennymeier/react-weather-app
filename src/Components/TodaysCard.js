import React from "react";
import { getEmoji } from "./Card";
export default (props) => {
    const emoji = props.emoji;
    const main = props.main;
    const sys = props.sys;
    const getTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${hour}:${minutes}`;
    };
    const weatherEmoji = getEmoji(emoji.main);
    return (
        <section className="today-weather">
            <span className="today-as-emoji" role="img" aria-label={emoji.description} title={emoji.description}>{weatherEmoji}</span>
            <span className="today-degree" title={`Temperature: ${main.temp}°`}>{main.temp}°</span>
            <span className="today-min-max-degree" title={`Min: ${main.temp_min} / Max: ${main.temp_max} - Humidity: ${main.humidity}%`}>{main.temp_min}°/ {main.temp_max}° - {main.humidity}%</span>
            <span className="today-sunrise" role="img" title={`Sunrise - ${getTime(sys.sunrise)}`} aria-label="Sunrise">🌘 {getTime(sys.sunrise)}</span>
            <span className="today-sunset" role="img" title={`Sunset - ${getTime(sys.sunset)}`} aria-label="Sunset"> 🌔 {getTime(sys.sunset)}</span>
        </section>
    );
};