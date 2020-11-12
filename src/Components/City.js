import React from 'react';
import { getEmojiClassName } from './Card';
import Toggle from './Toggle';
import Emoji from './Emoji';
import { getEmoji } from '../helpers';

const City = (props) => {
  const { current, fix } = props;
  const emoji = getEmojiClassName(current.weather[0].main);
  if (fix) {
    return (
      <div className="today-sticky-container">
        <Toggle />
        <h1 className="text-center" style={{ margin: '0 0 10px 0' }}>
          <Emoji name={current.name} emoji="📍" />
          <Emoji
            className="today-city"
            name={current.name}
            emoji={current.name}
          />
        </h1>
        <span className="today-sticky-temperature">
          <Emoji
            name={current.weather[0].description}
            emoji={getEmoji(emoji)}
          />
          {current.main.temp}°
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <Toggle />
        <h1 className="text-center">
          <Emoji name={current.name} emoji="📍" />
          <span className="today-city">{current.name}</span>
        </h1>
      </div>
    );
  }
};

export default City;
