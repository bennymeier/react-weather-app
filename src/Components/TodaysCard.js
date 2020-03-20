import React from "react";
import { getEmoji } from "./Card";
import Emoji from "./Emoji";
export default (props) => {
    const { emoji, main, sys } = props;
    const getTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return `${hour}:${minutes}`;
    };
    const weatherEmoji = getEmoji(emoji.main);
    const mainTemp = Math.round(main.temp);
    const mainTempMin = Math.round(main.temp_min);
    const mainTempMax = Math.round(main.temp_max);
    return (
        <section className="today-weather">
            <Emoji className="today-as-emoji" name={emoji.description} emoji={weatherEmoji} />
            <span className="today-degree" title={`Temperature: ${mainTemp}°`}>{mainTemp}°</span>
            <span className="today-min-max-degree" title={`Min: ${mainTempMin} / Max: ${mainTempMax} - Humidity: ${main.humidity}%`}>{mainTempMin}°/ {mainTempMax}° - {main.humidity}%</span>
            <Emoji className="today-sunrise" name={`Sunrise - ${getTime(sys.sunrise)}`} emoji={`🌘 ${getTime(sys.sunrise)}`} />
            <Emoji className="today-sunset" name={`Sunset - ${getTime(sys.sunset)}`} emoji={`🌘 ${getTime(sys.sunset)}`} />
        </section>
    );
};