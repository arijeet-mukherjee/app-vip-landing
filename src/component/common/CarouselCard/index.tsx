"use client"

import React from 'react';
import Link from 'next/link';
import styles from "./card.module.css";
import Image from 'next/image';
import { isMobile } from '@util/index';

interface CardProps {
    image: string,
    title: string,
    description: string,
    url: string,
    toggleButton: boolean,
    buttonText: string,
    key: number
    redirectComponent: Function,
}
const CarouselCard: React.FC<CardProps> = (props: CardProps) => {
    const { image, title, description, url, toggleButton, buttonText, key, redirectComponent } = props;
    const [starPath, setStarPath] = React.useState("url(/starvector.svg)");
    const [imageHeight, setImageHeight] = React.useState(178.67);
    const [imageWidth, setImageWidth] = React.useState(167);

    React.useEffect(() => {
        if (isMobile()) {
            setStarPath("url(/starvectormobile.svg)")
            setImageWidth(128.99);
            setImageHeight(128.99);
        }
    }, []);

    return (
        <div className={styles["carousel-card"]} key={key}>
            <div style={{ "padding": "0 4px 0 4px" }}>
                <div className={styles["carousel-card-image"]}>
                    <div className={styles["card-image-outer"]}>
                        <div>
                            <Image src={image} alt={title} height={imageHeight} width={imageWidth} className={styles["card-image-inner"]} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["carousel-card-content"]}>
                <h3 className={styles["carousel-card-title"]}>{title}</h3>
                <p className={styles["carousel-card-description"]}>{description}</p>
                {toggleButton && (
                    <p className={styles["carousel-card-button"]} onClick={() => redirectComponent(url)}>{buttonText}</p>
                )}
            </div>
        </div>
    )
}

// styles[`${animate && prevIndex !== index ? "animation" : ""}`] + " " + styles[`${animate ? "" : ""}`] + " " + styles[`${prevIndex === index ? "animation-out" : ""}`]
// " " + styles[`${animate ? "animation" : prevIndex === index ? "animation-out" : "card-inactive"}`]}
export default CarouselCard