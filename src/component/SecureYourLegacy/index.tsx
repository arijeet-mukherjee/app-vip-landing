'use client'
import React, { useState } from "react";
import styles from './secure.module.css'
import ImageSlider from "@component/common/ImageSlider";
import data from '@component/data/EN.json'
import Image from "next/image";
import Button from "@component/common/Button";
import { isMobile } from "@util/index";
interface SecureYourLegacyProps {
    bulletPointImg: string,
    bulletPoints: Array<string>,
    buttonLabel: string,
    imageSliderText: string;
}

const SecureYourLegacy: React.FC<SecureYourLegacyProps> = ({ bulletPointImg, bulletPoints, buttonLabel, imageSliderText }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    function handelClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        typeof window !== 'undefined' && window.Tawk_API?.maximize && window.Tawk_API?.maximize();
    }


    return (
        <div className={styles["container"]}>
            <div className={styles["imageSlider-section"]}>
                <ImageSlider data={data.imageSlider.slides} onSlideChange={handleSlideChange} />
            </div>
            <div className={styles["content-section"]}>
                <div className={styles.bulletPointContainer}>
                    {bulletPoints.map((points, index) => {
                        return (
                            <div key={index} className={styles.bulletPoints}>
                                {currentSlide === index ? <Image src={bulletPointImg} alt='bullet point' className={styles.bulletPointImg} width={20} height={20} /> : <Image src="/imageSliderbullet.svg" alt='bullet point' className={styles.bulletPointImg} width={20} height={20} />}
                                <p className={`${styles.bulletPoints} ${currentSlide === index ? styles.activeBulletPoint : styles.bulletPointsTxt}`}>{points}</p>
                            </div>
                        )
                    })}
                </div>
                {!isMobile() ? <>
                    <div className={styles["text-section"]}>
                        <div className={styles["text-section-centent"]}>{imageSliderText}</div>
                    </div>
                    <div className={styles["secure-button"]}>
                        <Button label={buttonLabel} hc={handelClick} />
                    </div>
                </> : <div style={{height:"0", width:"0", display:"none"}}></div>}
            </div>
            {
                isMobile() ? <>
                    <div className={styles["text-section"]}>
                        <div className={styles["text-section-centent"]}>{imageSliderText}</div>
                    </div>
                    <div className={styles["secure-button"]}>
                        <Button label={buttonLabel} hc={handelClick} />
                    </div>
                </> : <div style={{height:"0", width:"0", display:"none"}}></div>
            }
        </div>
    );
};

export default SecureYourLegacy;