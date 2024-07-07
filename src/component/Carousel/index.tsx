"use client"

import React, { useRef } from 'react';
import Link from 'next/link';
import styles from "./carousel.module.css";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { isMobile } from '@util/index';
const CarouselCard = dynamic(() => import('@component/common/CarouselCard'));
import Indicator from '@component/common/Indicator';

interface CardProps {
    image: string,
    title: string,
    description: string,
    url: string,
    toggleButton: boolean,
    buttonText: string,
    redirectComponent: Function
}

interface CarouselProps {
    title: string,
    description: string,
    toggleScrollButtonPosition: boolean,
    hideIndicator: boolean,
    cardProps: CardProps[],
    isBackgroundDark: boolean
    redirectComponent: Function
};

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
    const { title, description, toggleScrollButtonPosition, hideIndicator, cardProps, isBackgroundDark, redirectComponent } = props;

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [cardPropsState, setCardPropsState] = React.useState(cardProps);
    const [indicator, setIndicator] = React.useState<Number[]>([]);

    const touchStartX = useRef(0);
    const cards: number = cardProps.length;
    const slides: number = Math.ceil(cards / 3);

    const scrollDesktop = () => {
        if (cards - currentIndex < 3) {
            setCardPropsState([...cardProps.slice(currentIndex, currentIndex + (cards - currentIndex))]);
        } else {
            setCardPropsState(cardProps.slice(currentIndex, currentIndex + 3));
        }
    }

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        const touchEndX = event.changedTouches[0].clientX;
        const diffX = touchStartX.current - touchEndX;

        if (diffX > 50) {
            setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cards - 1));
        } else if (diffX < -50) {
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const scrollMobile = () => {
        setCardPropsState([cardProps[currentIndex]]);
    }

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards - 1 : prevIndex - 3));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cards - 1 ? 0 : prevIndex + 3));
    };

    const trackerMapDesktop = () => {
        const buttonTracker: Map<number, number> = new Map();

        buttonTracker.set(0, 0);
        for (let i = 1; i < slides; i++) {
            buttonTracker.set(i, i + 2);
        }
        if (cards % 3 != 0) {
            buttonTracker.set(slides - 1, Math.floor(cards / 3) * 3);
        }
        setIndicator(Array.from(buttonTracker.values()));
    }

    const trackerMapMobile = () => {
        const buttonTracker: Map<number, number> = new Map();
        for (let i = 0; i < cards; i++) {
            buttonTracker.set(i, i);
        }
        setIndicator(Array.from(buttonTracker.values()));
    }

    const dotClick = (index: number) => {
        setCurrentIndex(index);
    }

    React.useEffect(() => {
        if (isMobile()) {
            trackerMapMobile();
        } else {
            trackerMapDesktop();
        }
    }, [])

    React.useEffect(() => {
        if (isMobile()) {
            scrollMobile();
        } else {
            scrollDesktop();
        }

    }, [currentIndex]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            if (isMobile()) {
                setCurrentIndex((prevIndex) => (prevIndex === cards - 1 ? 0 : prevIndex + 1));
            } else {
                setCurrentIndex((prevIndex) => (((cards - prevIndex - 1) < 3) ? 0 : prevIndex + 3));
            }
        }, 11000);

        return () => {
            clearInterval(timer);
        };
    }, [cardPropsState]);


    return (
        <div className={styles["carousel-wrapper"]}>
            <div className={styles["carousel-header"]} style={{ "color": `${isBackgroundDark ? "#FFFFFF" : "#3E3E3F"}` }}>
                <div className={styles["carousel-subheader"]}>
                    <h2 className={styles["carousel-title"]}>{title}</h2>
                    {description && (
                        <p className={styles["carousel-description"]}>
                            {description}
                        </p>
                    )}
                </div>
                {(!hideIndicator && toggleScrollButtonPosition) && (
                    <div className={styles["carousel-scroll-buttons-top"]}>
                        <button onClick={handlePrevClick} className={styles["carousel-scroll-button-top-prev"]}>
                            <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5625 2L2 8.5625L8.5625 15.125" stroke="white" strokeWidth="3.75" stroke-linecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button onClick={handleNextClick} className={styles["carousel-scroll-button-top-next"]}>
                            <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.4375 2L9 8.5625L2.4375 15.125" stroke="white" strokeWidth="3.75" stroke-linecap="round" stroke-strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className={`${styles["carousel-content"]} `} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                {cardPropsState && cardPropsState.map((cardProp: CardProps, index: number) => {
                    let newCardProp = { ...cardProp, animate: true };
                    return <CarouselCard {...newCardProp} key={Math.random()} redirectComponent={redirectComponent} />
                })}
            </ div>
            <div className={`${styles["carousel-dot-button"]}`}>
                {indicator && indicator.map((value, key) => {
                    let IndicatorProps = {
                        currentIndex: value as number,
                        isActive: currentIndex === value,
                        onClick: dotClick,
                        isBackgroundDark: isBackgroundDark
                    }
                    return <Indicator {...IndicatorProps} key={key} />
                })}
            </div>
        </div>
    )
}

export default Carousel;
