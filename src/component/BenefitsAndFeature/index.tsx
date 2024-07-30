'use client'
import React, { useState } from "react";
import styles from './benefits.module.css'
import Image from "next/image";
import Button from "@component/common/Button";
import MetalBadge from "@component/common/MetalBadge/MetalBadge";
interface BenefitAndFeatureProps {
    bulletPointImg: string,
    bulletPoints: Array<string>,
    heading: string,
    badgeColor: string,
    badgeText: string;
}

const BenefitAndFeature: React.FC<BenefitAndFeatureProps> = ({ bulletPointImg, bulletPoints, heading, badgeColor, badgeText }) => {

    return (
        <div className={styles["container"]}>
            <div className={styles["metalBadge"]}>
                <MetalBadge label={badgeText} colorVariant={badgeColor} />
            </div>
            <div className={styles["text-section"]}>
                <div className={styles["text-section-content"]}>{heading}</div>
            </div>
            <div className={styles.bulletPointContainer}>
                {bulletPoints.map((points, index) => {
                    return (
                        <div key={index} className={styles.bulletPoints}>
                            <Image src={bulletPointImg} alt='bullet point' className={styles.bulletPointImg} width={20} height={20} />
                            <p className={styles.bulletPointsTxt}>{points}</p>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default BenefitAndFeature;