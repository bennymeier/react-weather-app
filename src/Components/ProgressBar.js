import React from "react";

export default class ProgressBar extends React.Component {
    constructor() {
        super();
        this.state = { percent: "0%" };
    }
    calcProgress = () => {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        this.setState({ percent: `${scrolled}%` });
    };
    onScroll = () => {
        window.addEventListener("scroll", this.calcProgress);
    };
    componentDidMount = () => {
        this.onScroll();
    };
    componentWillUnmount = () => {
        window.removeEventListener("scroll", this.calcProgress);
    };
    render() {
        const { percent } = this.state;
        return (
            <div className="header">
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: percent }}></div>
                </div>
            </div>
        );
    }
};