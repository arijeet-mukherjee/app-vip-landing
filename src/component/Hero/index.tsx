'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from "./hero.module.css";
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { isMobile } from '@util/index';
const Header = dynamic(() => import('@component/Header'));
interface HeroProps {
    // Your props goes here
    introduction: Array<string>;
    content: Array<any>;
    openModal: Function;
    modalState: boolean;
    headerData: any;
    refList: any
};

const Hero: React.FC<HeroProps> = React.memo(({ introduction, content, openModal, modalState, headerData, refList }) => {
    //If either introduction or content length is not eqaul to 2, throw an error

    const [checkMobile, setCheckMobile] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');

    if (introduction.length !== 2 || content.length !== 2) {
        throw new Error("Introduction and content must be an array of two strings");
    }

    useEffect(() => {
        setCheckMobile(isMobile())
    });

    useEffect(() => {
        setCurrentText(content[0][currentIndex]);

        const timeoutId = setTimeout(() => {
            // If currentIndex is at the last index, wrap around to 0; otherwise, increment currentIndex
            setCurrentIndex(currentIndex < content[0].length - 1 ? currentIndex + 1 : 0);
        }, 5000); // Adjust this value to match the duration of your typewriter animation

        return () => clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or currentIndex changes
    }, [currentIndex]);

    function handelClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        typeof window !== 'undefined' && window.Tawk_API?.maximize();
    }

    return (
        <div className={styles["hero"]}>
            {/* Your component content goes here */}
            <div className={styles["header"]}>
                <Header openModal={openModal} modalState={modalState} headerData={headerData} refList={refList} />
            </div>
            <div className={styles['heroBlock']}>
                <div className={styles["heroIntroduction"]}>
                    <p style={{ margin: "0", padding: "0" }}>
                        <span className={styles['framer-text']}>
                            {introduction && introduction[0]}
                        </span>
                    </p>
                    <p style={{ margin: "0", padding: "0" }}>
                        <span className={styles['secondary-text']}>
                            {introduction && introduction[1]}
                        </span>
                    </p>
                </div>
                <div className={styles["heroContent"]}>
                    <div className={styles["about-spacing"]} style={{ display: "flex", width: "max-content" }}>
                        {content && content[0] ?

                            (
                                <>
                                    <div className={styles['about-text']}>{content[0][0].split(' ')[0] + " "}</div>
                                    <div key={currentText} className={`${styles['online-text']} ${styles.typewriter}`}>{currentText.split(' ').slice(1).join(' ')}</div>
                                </>
                            )

                            : <></>}
                    </div>
                    <p>

                        {!checkMobile && (content && content[1]) ? (<>
                            <span className={styles['hear-back-text']}>{content[1].split('.')[0] + "."}</span><br />
                            <span className={styles['hear-back-text']}>{content[1].split('.').slice(1).join(' ') + "."}</span>
                        </>) : <> <span className={styles['hear-back-text']}>{content[1]}</span><br /></>}

                    </p>
                </div>
                {/** Write a button with text on left and icon on right */}
                <div className={styles["hero-button"]} tabIndex={0} onClick={handelClick}>
                    <a className={styles["button"]}>
                        <span className={styles["button-text"]}>{headerData["button-name"]}</span>
                        <span className={styles["button-icon"]}>
                            <Image src="/arrowrightblack.svg" alt="arrow right" className={styles.arrowImg} width={21.37} height={9.77} />
                        </span>
                    </a>
                </div>
            </div>
            <div className={styles['emptyArea']}></div>
        </div>
    );
});

export default Hero;
