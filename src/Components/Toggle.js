import React from "react";
import { useState, useCallback } from "react";

export default () => {
    const useToggle = (initialState = false) => {
        const [state, setState] = useState(initialState);
        const toggle = useCallback(() => {
            setState(state => !state);
            document.body.classList.toggle("dark");
            // TODO: Save in localStorage
        }, []);

        return [state, toggle];
    }
    const [isDark, toggle] = useToggle(false);
    return (<input className="switch" checked={isDark} onChange={toggle} type="checkbox" />);
};