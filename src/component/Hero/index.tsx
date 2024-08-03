'use client'
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from "./hero.module.css";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { isMobile } from '@util/index';
const SpotLight = dynamic(() => import('@component/common/spotLight'));
const Button = dynamic(() => import('@component/common/Button'));
const VipCard = dynamic(() => import('@component/vipCard'));
const Header = dynamic(() => import('@component/Header'));

interface HeroProps {
    // Your props goes here
    introduction: Array<string>;
    content: Array<any>;
    openModal: Function;
    modalState: boolean;
    headerData: any;
    front: any;           //Front side content of vip card
    back: any;           //Back side content of vip card
    outerLogo: string;  //Transparent side Logo of vip card
};

const Hero: React.FC<HeroProps> = React.memo(({ introduction, content, openModal, modalState, headerData, front, back, outerLogo }) => {
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

    return (
        <div className={styles["hero"]}>
            <SpotLight color='#FFA260' top={-100} right={-200} />
            <SpotLight bottom={-50} left={-400} />
            <div className={styles["header"]}>
                <Header openModal={openModal} modalState={modalState} headerData={headerData} />
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
                    <Button label={headerData["button-name"]} />
                </div>
                <div className={styles.vipSection}>
                    <Image src='vipshield.svg' alt='vip shield' height={100} width={100} className={styles.vipShield} />
                    <VipCard front={front} back={back} outerLogo={outerLogo} />
                </div>
            </div>
        </div>
    );
});

export default Hero;
