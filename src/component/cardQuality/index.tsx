import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const Card = dynamic(() => import('./Card'));
import styles from "./quality.module.css"
import Image from 'next/image'
import Link from 'next/link'
import { isMobile } from '@util/index';

interface qualityCard {
  heading?: Array<string>;
  content?: string;
  redirectComponent: Function;
  background?: {
    name: string;
    path: string;
  };
  button?: {
    name: string;
    url: string;
  };
  childCardProp?: {
    left?: {
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
        backgroundImg?: string;
        backgroundPosition?: string;
      }
      textColor?: {
        desktop?: string;
        mobile?: string;
      };
      button?: {
        desktop?: string;
        mobile?: string;
        url: string;
      }
    }[],
    right?: {
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
        backgroundImg?: string;
        backgroundPosition?: string;
      }
      textColor?: {
        desktop?: string;
        mobile?: string;
      };
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
    }[]
  }
}

const QualityCard: React.FC<qualityCard> = ({ heading, content, background, button, childCardProp, redirectComponent }) => {

  const [title, setTitle] = useState<string[]>([]);

  const [gridArea, setGridArea] = useState({
    box1: '1/1',
    box2: '2/1',
    box3: '1/2',
    box4: '2/2'
  });
  const [translate, setTranslate] = useState({
    left: -20,
    right: 20
  });

  useEffect(() => {
    if (isMobile()) {
      setGridArea({
        box1: '4/1',
        box2: '2/1',
        box3: '1/1',
        box4: '3/1'
      });
      setTranslate({
        left: 0,
        right: 0
      });

      if (heading && heading.length > 2) {
        let arr: string[] = [];
        for (let i = heading.length - 1; i >= 0; i -= 2) {
          if (heading[i] && heading[i - 1]) {
            let h1 = heading[i];
            let h2 = heading[i - 1];
            let temp = h2.concat(h1);
            arr.push(temp);
          }
          else if (heading[i]) {
            let h1 = heading[i];
            arr.push(h1);
          }
        }
        setTitle(arr.reverse());
      }
      else if (heading && heading.length) {
        setTitle(heading);
      }
    }
    else {
      if (heading && heading.length) {
        setTitle(heading);
      }
    }
  }, []);

  return (
    <div className={styles.homeQuality}>
      <div className={styles.intro}>
        {heading &&
          <div>
            {title?.map((head, index) => {
              return <h1 className={styles.introHeading} key={index} aria-label={head}>{head}</h1>
            })
            }
          </div>
        }
        <p className={styles.introContent} aria-label={content}>{content}</p>
        {button &&
          <div className={styles["home-button"]} role='button' tabIndex={0} onClick={() => redirectComponent(button.url)}>
            <a className={styles["button"]}>
              <span className={styles["button-text"]} aria-label={button.name} >{button.name}</span>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <Image src="/arrowrightwhite.svg" className={styles.buttonImage} alt="arrow right" width={39.83} height={25} />
              </span>
            </a>
          </div>
        }
      </div>
      <div className={styles.cardContainer}>
        <Image src={background?.path ? background.path : "/qualitybackground.svg"} alt={background?.name ? background.name : "background"} fill={true} className={styles.background} />
        <div className={styles.subCardContainer}>
          <Card heading={childCardProp?.left?.[0]?.heading} content={childCardProp?.left?.[0]?.content} image={childCardProp?.left?.[0]?.image} bg={childCardProp?.left?.[0]?.bg} textColor={childCardProp?.left?.[0]?.textColor} translate={translate.left} gridArea={gridArea.box1} button={childCardProp?.left?.[0]?.button} />
          <Card heading={childCardProp?.left?.[1]?.heading} content={childCardProp?.left?.[1]?.content} image={childCardProp?.left?.[1]?.image} bg={childCardProp?.left?.[1]?.bg} textColor={childCardProp?.left?.[1]?.textColor} translate={translate.left} gridArea={gridArea.box2} button={childCardProp?.left?.[1]?.button} />
          <Card heading={childCardProp?.right?.[0]?.heading} content={childCardProp?.right?.[0]?.content} image={childCardProp?.right?.[0]?.image} bg={childCardProp?.right?.[0]?.bg} textColor={childCardProp?.right?.[0]?.textColor} translate={translate.right} gridArea={gridArea.box3} button={childCardProp?.right?.[0]?.button} />
          <Card heading={childCardProp?.right?.[1]?.heading} content={childCardProp?.right?.[1]?.content} image={childCardProp?.right?.[1]?.image} bg={childCardProp?.right?.[1]?.bg} textColor={childCardProp?.right?.[1]?.textColor} translate={translate.right} gridArea={gridArea.box4} button={childCardProp?.right?.[1]?.button} />
        </div>
      </div>
    </div>
  )
}

export default QualityCard;
