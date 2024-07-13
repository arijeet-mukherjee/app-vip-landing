'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from "./hero.module.css";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { isMobile } from '@util/index';
import Button from '@component/common/Button';
import Vipcard from '@component/vipCard';

const Header = dynamic(() => import('@component/Header'));
interface HeroProps {
    // Your props goes here
    introduction: Array<string>;
    content: Array<any>;
    openModal: Function;
    modalState: boolean;
    headerData: any;
    refList: any;
    front: any;
    back: any;
    outerLogo: string;
};

const Hero: React.FC<HeroProps> = React.memo(({ introduction, content, openModal, modalState, headerData, refList, front, back, outerLogo }) => {
    //If either introduction or content length is not eqaul to 2, throw an error

    const [checkMobile, setCheckMobile] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText, setCurrentText] = useState(0);
    const [fade, setFade] = useState(true);

    if (introduction.length !== 2 || content.length !== 2) {
        throw new Error("Introduction and content must be an array of two strings");
    }

    useEffect(() => {
        setCheckMobile(isMobile())
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentText(prevIndex => (prevIndex + 1) % content[0].length);
                setFade(true);
            }, 250); // Time for fade out effect
        }, 2000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentIndex]);

    function handelClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        typeof window !== 'undefined' && window.Tawk_API?.maximize();
    }

    const [cardFlip, setCardFlip] = useState(false);


    function handelMouseEnter(e: React.MouseEvent<HTMLDivElement>): void {
        setTimeout(() => {
            setCardFlip(true);
        }, 500);
    }
    function handelMouseLeave(e: React.MouseEvent<HTMLDivElement>): void {
        setTimeout(() => {
            setCardFlip(false);
        }, 500);
    }
    return (
        <div className={styles["hero"]}>
            <div className={styles.colorSport} style={{ background: '#FFA260', top: 'calc((100vw / 1920)* -50)', right: 'calc((100vw / 1920)* -200)' }}></div>
            <div className={styles.colorSport} style={{ background: 'white', bottom: 'calc((100vw / 1920)* -50)', left: 'calc((100vw / 1920)* -400)' }}></div>
            {/* Your component content goes here */}
            <div className={styles["header"]}>
                <Header openModal={openModal} modalState={modalState} headerData={headerData} refList={refList} />
            <div className={styles.horizontalLine}></div>
            </div>
            <div className={styles['heroBlock']}>
                <div className={styles['heroContent']}>
                    <div className={styles["heroIntroduction"]}>
                        <p style={{ margin: "0", padding: "0" }}>
                            <span className={styles['framer-text']}>
                                {introduction && introduction[0]}
                            </span>
                        </p>
                        <p style={{ margin: "0", padding: "0" }}>
                            <span className={styles['framer-text']}>
                                {introduction && introduction[1]}
                            </span>
                        </p>
                    </div>
                    <div className={styles["heroText"]}>
                        <p>
                            {!checkMobile && (content && content[1]) ? (<>
                                <span className={styles['hear-back-text']}>{content[1].split(',')[0] + ","}</span><br />
                                <span className={styles['hear-back-text']}>{content[1].split(',').slice(1).join(' ')}</span>
                            </>) : <> <span className={styles['hear-back-text']}>{content[1]}</span><br /></>}

                        </p>
                        <div className={styles["bullet-transform"]}>
                            {content && content[0] ?

                                (
                                    <>
                                        <Image src='tickBulletPoint.svg' alt='tick bullet point' height={33} width={33} className={styles['tick']} />
                                        <span className={fade ? styles.fade : styles.fadeExit}>{content[0][currentText]}</span>
                                    </>
                                )

                                : <></>}
                        </div>

                    </div>
                    {/** import button from common */}
                    <Button label={headerData["button-name"]} hc={handelClick} background='transparent' backgroundOnHover='#F4C9A4' textColor='white' textColorOnHover='black' borderColor='#F4C9A4' />
                </div>
                <div className={styles.vipSection}>
                    <Image src='vipshield.svg' alt='vip shield' height={100} width={100} className={styles.vipShield} />
                    <Vipcard front={front} back={back} outerLogo={outerLogo}/>
                </div>
            </div>
        </div>
    );
});

export default Hero;
