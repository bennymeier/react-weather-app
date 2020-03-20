import React from "react";
export default class Toggle extends React.Component {
    constructor() {
        super();
        this.state = { isDark: false };
    }
    componentDidMount = () => {
        const isDarkMode = () => {
            if (localStorage.getItem("darkMode") === "false") {
                return false;
            } else if (localStorage.getItem("darkMode") === "true") {
                return true;
            } else {
                return false;
            }
        };
        this.setState({ isDark: isDarkMode() }, () => this.setInitialClass());
    };
    changeMode = () => {
        const { isDark } = this.state;
        const isDarkMode = !isDark;
        this.setState({ isDark: isDarkMode }, () => {
            localStorage.setItem("darkMode", `${isDarkMode}`);
            if (this.state.isDark) {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
        });
    };
    setInitialClass = () => {
        const { isDark } = this.state;
        if (isDark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    };
    render() {
        const { isDark } = this.state;
        return (<input className="switch" checked={isDark} onChange={this.changeMode} type="checkbox" />);
    }
};