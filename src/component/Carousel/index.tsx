"use client"

import React, { useRef } from 'react';
import styles from "./carousel.module.css";
import dynamic from 'next/dynamic';
import { isMobile } from '@util/index';
const CarouselCard = dynamic(() => import('@component/common/CarouselCard'));
import Indicator from '@component/common/Indicator';
import MetalBadge from '@component/common/MetalBadge/MetalBadge';

const ReactSimplyCarousel = dynamic(() => import('react-simply-carousel'), { ssr: false });

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
    const [showCarousel, setShowCarousel] = React.useState(false);
    const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

    const touchStartX = useRef(0);
    const cards: number = cardProps.length;
    const slides: number = cards;

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

    const trackerMap = () => {
        const buttonTracker: Map<number, number> = new Map();
        for (let i = 0; i < cards; i++) {
            buttonTracker.set(i, i);
        }
        setIndicator(Array.from(buttonTracker.values()));
    }


    React.useEffect(() => {
        trackerMap();
    }, [])

    React.useEffect(() => {
        if (isMobile()) {
            scrollMobile();
        }
    }, [currentIndex]);

    const dotClick = (index: number) => {
        setCurrentIndex(index);
        setActiveSlideIndex(index)
    }

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShowCarousel(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className={styles["carousel-wrapper"]}>
            <div className={styles["carousel-header"]} style={{ "color": `${isBackgroundDark ? "#FFFFFF" : "#3E3E3F"}` }}>
                <div className={styles["carousel-subheader"]}>
                    {title !== '' ? (<MetalBadge label={title} colorVariant="silver" />) : (<></>)}
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
            {
                showCarousel && (

                    <ReactSimplyCarousel
                        containerProps={
                            {
                                className: styles["carousel-content"],
                                style: {
                                    // width: "100%",
                                    // justifyContent: "space-between",
                                    // userSelect: "none",
                                }
                            }
                        }
                        forwardBtnProps={{
                            children: "",
                            style: {
                                display: "none"
                            },
                        }}
                        backwardBtnProps={{
                            children: "",
                            style: {
                                display: "none"
                            },
                        }}
                        activeSlideIndex={activeSlideIndex}
                        onRequestChange={setActiveSlideIndex}
                        itemsToShow={3}
                        itemsToScroll={1}
                        easing='linear'
                        centerMode
                        speed={2000}
                        responsiveProps={[
                            {
                                maxWidth: 1100,
                                itemsToShow: 1,
                                itemsToScroll: 1,
                            },
                        ]}
                    >
                        {cardPropsState && cardPropsState.map((cardProp: CardProps, index: number) => {
                            return (
                                <div key={index}>
                                    <CarouselCard {...cardProp} key={Math.random()} redirectComponent={redirectComponent} />
                                </div>
                            )
                        })}
                    </ReactSimplyCarousel>
                )
            }
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
        </div >
    )
}

export default Carousel;