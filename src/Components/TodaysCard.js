import React from "react";
import { getEmoji } from "./Card";
import Emoji from "./Emoji";
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
            <Emoji className="today-as-emoji" name={emoji.description} emoji={weatherEmoji} />
            <span className="today-degree" title={`Temperature: ${main.temp}°`}>{main.temp}°</span>
            <span className="today-min-max-degree" title={`Min: ${main.temp_min} / Max: ${main.temp_max} - Humidity: ${main.humidity}%`}>{main.temp_min}°/ {main.temp_max}° - {main.humidity}%</span>
            <Emoji className="today-sunrise" name={`Sunrise - ${getTime(sys.sunrise)}`} emoji={`🌘 ${getTime(sys.sunrise)}`} />
            <Emoji className="today-sunset" name={`Sunset - ${getTime(sys.sunset)}`} emoji={`🌘 ${getTime(sys.sunset)}`} />
        </section>
    );
};