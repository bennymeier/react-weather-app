import React from "react";
export default class Toggle extends React.Component {
    constructor() {
        super();
        this.state = { isDark: false };
    }
    componentDidMount() {
        const isDarkMode = () => {
            if (localStorage.getItem("darkMode") === "false") {
                return false;
            } else if (localStorage.getItem("darkMode") === "true") {
                return true;
            } else {
                return false;
            }
        }
        this.setState({ isDark: isDarkMode() }, () => this.setInitialClass());
    }
    changeMode() {
        const isDarkMode = !this.state.isDark;
        this.setState({ isDark: isDarkMode }, () => {
            localStorage.setItem("darkMode", `${isDarkMode}`);
            if (this.state.isDark) {
                document.body.classList.add("dark");
            } else {
                document.body.classList.remove("dark");
            }
        });
    };
    setInitialClass() {
        if (this.state.isDark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }
    render() {
        return (<input className="switch" checked={this.state.isDark} onChange={this.changeMode.bind(this)} type="checkbox" />);
    }
};