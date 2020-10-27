import React from "react";

const Anchor = (props) => {
    const { href, text } = props;
    return (
        <a target="_blank" rel="noopener noreferrer" href={href}>{text}</a>
    );
};

export default Anchor;