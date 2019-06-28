import React from "react";
export default (props) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={props.href}>{props.text}</a>
    );
};