import React from "react";
import { getEmojiClassName } from "./Card";

const TodaysCard = (props) => {
  const { emoji, main, city } = props;
  const weatherClassName = getEmojiClassName(emoji.main);
  const mainTemp = Math.round(main.temp);
  return (
    <>
      <div className="weather-wrapper">
        <div className="weather-card">
          <div className={`weather-icon ${weatherClassName}`}></div>
          <h1>{mainTemp}°C</h1>
          <p>{city}</p>
        </div>
      </div>
    </>
  );
};

export default TodaysCard;