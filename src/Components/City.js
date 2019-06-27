import React from "react";
import { getEmoji } from "./Card";
export default (props) => {
    const emoji = getEmoji(props.current.weather[0].main);
    if (props.fix) {
        return (
            <div className="today-sticky-container">
                {/* <span>Dark Mode</span> */}
                <h1 className="text-center" style={{ margin: "0 0 10px 0" }}>
                    <span role="img" title={props.current.name} aria-label="Round Pushpin">📍</span>
                    <span className="today-city">{props.current.name}</span>
                </h1>
                <span className="today-sticky-temperature">
                    <span role="img" aria-label={props.current.weather[0].description} title={props.current.weather[0].description}>
                        {emoji}
                    </span>
                    {props.current.main.temp}°
                </span>
            </div>);
    } else {
        return (
            <div>
                <h1 className="text-center">
                    <span role="img" title={props.current.name} aria-label="Round Pushpin">📍</span>
                    <span className="today-city">{props.current.name}</span>
                </h1>
            </div>);
    }
};