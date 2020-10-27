import React from "react";

const Emoji = (props) => {
    const { className, name, emoji } = props;
    return (
        <span className={className} role="img" aria-label={name} title={name}>{emoji}</span>
    );
};

export default Emoji;