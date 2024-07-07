'use client'
import React from 'react'
import Image from 'next/image';
import styles from "./card.module.css"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { isMobile, goToTop } from '@util/index';

interface CardProps {
  heading?: string;
  content?: string;
  image?: {
    pathDesktop?: string;
    pathMobile?: string;
    name: string;
  }
  bg?: {
    backgroundColorDesktop?: string;
    backgroundColorMobile?: string;
    backgroundImg?: string,
    backgroundPosition?: string;
  }
  textColor?: {
    desktop?: string;
    mobile?: string;
  };
  translate?: number;
  gridArea?: string;
  button?: {
    backgroundColorDesktop?: string,
    textColorDesktop?: string,
    backgroundColorMobile?: string,
    textColorMobile?: string,
    desktopText?: string;
    mobileText?: string;
    mobileImg?: string;
    desktopImg?: string;
    url: string;
  }
};

const Card: React.FC<CardProps> = ({ heading, content, image, bg, textColor, translate, gridArea, button }) => {
  const [backgroundImage, setBackgroundImage] = useState('none');
  const [backgroundColor, setBackgroundColor] = useState(bg?.backgroundColorDesktop);
  const [cardImage, setCardImage] = useState(image?.pathDesktop)
  const [txtColor, setTxtColor] = useState(textColor?.desktop);
  const [buttonTxt, setButtonTxt] = useState(button?.desktopText);
  const [buttonColor, setButtonColor] = useState(button?.backgroundColorDesktop);
  const [buttonTextColor, setButtonTextColor] = useState(button?.textColorDesktop);
  const [buttonImg, setButtonImg] = useState(button?.desktopImg);

  useEffect(() => {
    if (isMobile()) {
      setBackgroundImage(`url(${bg?.backgroundImg})`);
      setBackgroundColor(bg?.backgroundColorMobile);
      setCardImage(image?.pathMobile);
      setTxtColor(textColor?.mobile);
      setButtonTxt(button?.mobileText);
      setButtonColor(button?.backgroundColorMobile);
      setButtonTextColor(button?.textColorMobile);
      setButtonImg(button?.mobileImg);
    }
  }, []);

  function handelClick() {
    goToTop()
  }

  return (
    <div className={styles.card} style={{ backgroundColor: backgroundColor, color: txtColor, backgroundImage: backgroundImage, backgroundRepeat: 'no-repeat', backgroundSize: 'calc((100vw / 393)*173)', backgroundPosition: bg?.backgroundPosition, transform: `translate(0, calc((100vw/1920)*${translate}))`, gridArea: gridArea }}>
      {image && cardImage &&
        <div className={styles['cardImgContainer']}>
          <Image src={cardImage} alt={image?.name} height={60} width={60} className={styles.cardImage} />
        </div>
      }
      <h3 aria-label={heading} className={styles.heading}>{heading}</h3>
      <p aria-label={content} className={styles.content}>{content}</p>
      {buttonTxt && button && <div className={styles["card-button"]} tabIndex={0} style={{ backgroundColor: buttonColor }} onClick={handelClick} role='button'>
        <a className={styles["button"]}>
          <span className={styles["button-text"]} style={{ color: buttonTextColor }}>{buttonTxt}</span>
          <span className={styles['button-icon']}>
            {buttonImg &&
              <Image src={buttonImg} className={styles.buttonImage} alt="arrow right" width={30} height={23.31} />
            }
          </span>
        </a>
      </div>}
    </div>
  )
};


export default Card;
