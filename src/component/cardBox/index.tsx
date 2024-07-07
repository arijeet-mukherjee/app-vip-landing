'use client'
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState, ReactNode } from 'react';
import { isMobile, emailVerified, makeWebServiceCall } from '@util/index';

interface CardBoxProps {
    background?: {
        mHeight: string;
        mWidth: string;
        dHeight: string;
        dWidth: string;
    }
    image?: {
        path: string;
        title: string;
        mHeight: string;
        mWidth: string;
        dHeight: string;
        dWidth: string;
    }
    title: string,
    description?: string,
    iconPosition: string,
    buttonText?: string,
    buttonIcon?: string,
    paddingLeftContent: string,
    paddingImageContent?: string
    inputBox?: string,
    bulletPointImg?: string,
    bulletPoints?: Array<string>,
    gridArea?: {
        cardContent: string,
        cardImage: string,
    }
    goTo?: string,
    fullGradient?: boolean,
    child?: ReactNode,
    redirectComponent?: any
};

const CardBox: React.FC<CardBoxProps> = (props: CardBoxProps) => {

    const [cardContentStyle, setCardContentStyle] = useState({});
    const [cardImageStyle, setCardImageStyle] = useState({});
    const [cardGradient, setCardGradient] = useState({});
    const [imageSize, setImageSize] = useState({ height: props.image?.dHeight, width: props.image?.dWidth });
    const [backgroundSize, setBackgroundSize] = useState({ height: props.background?.dHeight, width: props.background?.dWidth })
    const [starPath, setStarPath] = React.useState("url(/starvector.svg)");
    const [email, setEmail] = useState('');
    const inputEmail = useRef<HTMLInputElement>(null!);

    function handelInput(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);

        if (emailVerified(event.target.value)) {
            inputEmail.current.style.outline = "#343a40 solid";
        }
        else {
            inputEmail.current.style.outline = "#dc3545 solid";
        }
    };

    const handelSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (inputBox) {
            if (emailVerified(email)) {
                makeWebServiceCall(process.env.API_URL + '/newsletter/subscribe', 'post', {
                    id: Math.random(),
                    email: email?.toString(),
                    subscriptionUrl: typeof window !== 'undefined' ? window.location.host : ''
                })
                    .then(data => {
                        console.log(data);
                        alert(email + " created successfully");
                        typeof window !== 'undefined' && window.open(`${props.goTo}`, '_self');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
            else {
                alert("Please enter a valid email address");
            }
        }
        else {
            props.redirectComponent(props.goTo);
        }
    };


    useEffect(() => {

        const check = isMobile();

        if (check === true) {
            setStarPath("url(/starvectormobile.svg)");
            setImageSize({ height: props.image?.mHeight, width: props.image?.mWidth });
            setBackgroundSize({ height: props.background?.mHeight, width: props.background?.mWidth });

            if (props.fullGradient) {
                setCardGradient({ background: "linear-gradient(108.31deg, #FFFFFF 34.81%, #C7D5E0 78.11%)" });
            }

            if (props.gridArea) {
                setCardContentStyle({ gridArea: props.gridArea.cardContent });
                setCardImageStyle({ gridArea: props.gridArea.cardImage });
            }
            else {
                setCardContentStyle({ gridRow: 2, gridColumn: 1 });
                setCardImageStyle({ gridRow: 1, gridColumn: 1, background: "linear-gradient(108.31deg, #FFFFFF 34.81%, #C7D5E0 78.11%)" });
            }
        } else {
            setCardContentStyle({ gridColumn: props.iconPosition == "right" ? 1 : 2, gridRow: 1, paddingLeft: props.paddingLeftContent ? props.paddingLeftContent : 0 });
            setCardImageStyle({ gridColumn: props.iconPosition == "right" ? 2 : 1, gridRow: 1, paddingLeft: props.paddingImageContent ? props.paddingImageContent : 0 });
            setCardGradient({ background: props.iconPosition == "left" ? "linear-gradient(270.59deg, #FFFFFF 35.89%, #C7D5E0 79.41%)" : "linear-gradient(108.31deg, #FFFFFF 34.81%, #C7D5E0 78.11%)", gridRow: 1 });
        }
    }, []);

    const { image, background, title, description, iconPosition, buttonText, inputBox, bulletPointImg, bulletPoints, child } = props;
    return (

        <div className={styles["cardbox-card"]} style={cardGradient} >
            <div className={styles["cardbox-content"]} style={cardContentStyle} >
                <h2 className={styles["cardbox-title"]}>{title}</h2>

                {bulletPoints?.length
                    ?
                    <div className={styles.bulletPointContainer}>

                        {bulletPoints.map((points, index) => {
                            return (
                                <div key={index} className={styles.bulletPoints}>
                                    {bulletPointImg && <Image src={bulletPointImg} alt='bullet point' className={styles.bulletPointImg} width={20} height={20} />}
                                    <p className={styles.bulletPointsTxt}>{points}</p>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <p className={styles["cardbox-description"]}>{description}</p>
                }

                {inputBox && buttonText ?
                    (<div className={styles.inputBoxWithButton}>
                        <input type="email" name='email' placeholder={inputBox} ref={inputEmail} value={email} onChange={handelInput} className={styles.inputBox} />
                        <div className={styles["cardbox-button"]} onClick={handelSubmit}>
                            <a className={styles["button"]}>
                                <span className={styles["button-text"]}>{buttonText}</span>
                                <span className={styles["button-icon"]}>
                                    <Image src="/arrowrightwhite.svg" alt="arrow right" className={styles.arrowImg} width={39.83} height={23.31} />
                                </span>
                            </a>
                        </div>
                    </div>)
                    : buttonText ? (<div className={styles["cardbox-button"]} onClick={handelSubmit}>
                        <a className={styles["button"]}>
                            <span className={styles["button-text"]}>{buttonText}</span>
                            <span className={styles["button-icon"]}>
                                <Image src="/arrowrightwhite.svg" alt="arrow right" className={styles.arrowImg} width={39.83} height={23.31} />
                            </span>
                        </a>
                    </div>
                    )
                        : <></>
                }
            </div>
            {(image || child) &&
                <div className={styles["cardbox-image"]} style={cardImageStyle}>
                    <div className={styles["card-image-outer"]} style={{ width: backgroundSize.width, height: backgroundSize.height, backgroundImage: starPath, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
                        {image && <Image src={image?.path} alt={image?.title} style={{ width: imageSize.width, height: imageSize.height }} width={200} height={200} />}               </div>
                    {child && child}
                </div>
            }
        </div>
    );
};

export default CardBox;
