import React from "react";
export default (props) => {
    const { className, name, emoji } = props;
    return (
        <span className={className} role="img" aria-label={name} title={name}>{emoji}</span>
    );
};