import React from "react";
import { getEmoji } from "./Card";
import Toggle from "./Toggle";
import Emoji from "./Emoji";
export default (props) => {
    const emoji = getEmoji(props.current.weather[0].main);
    if (props.fix) {
        return (
            <div className="today-sticky-container">
                <Toggle />
                <h1 className="text-center" style={{ margin: "0 0 10px 0" }}>
                    <Emoji name={props.current.name} emoji="📍" />
                    <Emoji className="today-city" name={props.current.name} emoji={props.current.name} />
                </h1>
                <span className="today-sticky-temperature">
                    <Emoji name={props.current.weather[0].description} emoji={emoji} />
                    {props.current.main.temp}°
                </span>
            </div>);
    } else {
        return (
            <div>
                <Toggle />
                <h1 className="text-center">
                    <Emoji name={props.current.name} emoji="📍" />
                    <span className="today-city">{props.current.name}</span>
                </h1>
            </div>);
    }
};