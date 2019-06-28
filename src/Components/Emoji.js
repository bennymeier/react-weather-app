import React from "react";
export default (props) => {
    return (
        <span className={props.className} role="img" aria-label={props.name} title={props.name}>{props.emoji}</span>
    );
};