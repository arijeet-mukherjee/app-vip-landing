import React from 'react';
import Link from 'next/link';
import styles from "./Indicator.module.css";

import { isMobile } from '@util/index';

interface IndicatorProps {
    currentIndex: number;
    isActive: boolean;
    onClick: (index: number) => void;
    isBackgroundDark: boolean;
}

const Indicator: React.FC<IndicatorProps> = (props: IndicatorProps) => {
    const { currentIndex, isActive, onClick, isBackgroundDark } = props;
    const [active, setActive] = React.useState(isActive);

    const [dark, setDark] = React.useState(isBackgroundDark);

    const handleClick = () => {
        onClick(currentIndex);
    }

    React.useEffect(() => {
        if (isMobile()) {
            setDark(false);
        }
    }, [])

    React.useEffect(() => {
        setActive(isActive);
    }, [isActive]);

    // isBackgroundDark ? styles["dot-button-active"] = 

    return (
        <>
            <button className={`${styles["dot-button"]} ${active ? styles["dot-button-active"] : ""}`} style={{ "backgroundColor": `${active && !dark ? "#402ea1" : ""}` }} onClick={handleClick}>
                <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="https://commons.wikimedia.org/wiki/File:No_image.svg"></svg>
            </button>
        </>
    )
}

export default Indicator;