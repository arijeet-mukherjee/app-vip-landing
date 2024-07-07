import Image from "next/image";
import styles from "./animation.module.css";
import { useEffect, useState } from "react";

const Animation = () => {
    

    return(
        <div className={styles.animation}>
        <Image src="/coupontick.svg" alt="tick sticker" className={styles.couponTick} height={50} width={50} /> 
        <Image src="/couponsent.svg" alt="coupon sent sticker" className={styles.couponSent} height={50} width={50} /> 
        </div>
    )
};

export default Animation;