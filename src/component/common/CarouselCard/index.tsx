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
    // currentIndex: number,
    animate: boolean,
    redirectComponent: Function
}
const CarouselCard: React.FC<CardProps> = (props: CardProps) => {
    const { image, title, description, url, toggleButton, buttonText, animate, key, redirectComponent } = props;
    const [animater, setAnimater] = React.useState("");
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
    // console.log(currentIndex, "card");
    React.useEffect(() => {
        setAnimater(animate ? "animation" : "");
    }, []);

    return (
        <div className={styles["carousel-card"] + " " + styles[`${animate ? "animation" : ""}`]} key={key}>
            <div className={styles["carousel-card-image"]}>
                <div className={styles["card-image-outer"]} style={{ backgroundImage: starPath, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                    <div>
                        <Image src={image} alt={title} height={imageHeight} width={imageWidth} className={styles["card-image-inner"]} />
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

export default CarouselCard