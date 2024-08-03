import React, { useState, useEffect, useRef } from 'react';
import styles from './vipcard.module.css';
import Image from 'next/image';
import {vipNumber, getLetter, isFirefox} from '@util/index';
interface VipCard {
    // Your props goes here
    front: {
        label: string;
        title: string;
        cardName: string;
        cardNumber: number;
        innerLogo: string;
    },
    back: {
        label: string;
        title: string;
        cardName: string;
        cardNumber: number;
        innerLogo: string;
    }
    outerLogo: string;
};

const Vipcard: React.FC<VipCard> = React.memo(({ front, back, outerLogo }) => {

    // const frontRef = useRef<HTMLDivElement>(null);
    // const backRef = useRef<HTMLDivElement>(null);

    const [hover, setHover] = useState(false);

    return (
        <div className={styles.vipCard} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
            <div className={styles.solid}>
                <div className={styles.front}>
                    <Image src='/cardtexture.svg' alt='card texture' fill={true} className={styles.texture} />
                    <div className={`${styles.branding} ${styles.transform}`}>
                        {
                            front.innerLogo &&
                            <Image src={front.innerLogo} alt='logo' height={50} width={50} className={styles.innerLogo} />
                        }
                        <p aria-label={front.label} className={styles.label}>{
                            getLetter(front.label).map((value, index) =>{
                                return <span key={index}>{value}</span>
                            })
                        }</p>
                    </div>

                    {(front.cardName || front.title) &&
                    <div className={styles.info}>
                        {
                            front.title &&
                        <h2 aria-label={front.title} className={`${styles.title} ${styles.transform}`}>{front.title}</h2>
                        }
                        {
                            front.cardName &&
                        <h3 aria-label={front.cardName} className={`${styles.cardName} ${styles.transform}`}>{front.cardName}</h3>
                        }
                    </div>
                        }
                    {
                        front.cardNumber &&
                    <div className={`${styles.cardNumber} ${styles.transform}`}>
                        <h1 aria-label={`${front.cardNumber}`}>{vipNumber(front.cardNumber)}</h1>
                    </div>
                    }
                </div>

                <div className={`${styles.back} ${isFirefox() && styles.backFirefox}`}>
                    <Image src='/cardtexture.svg' alt='back' fill={true} className={styles.texture} />
                    <div className={styles.branding}>
                        {
                            back.innerLogo &&
                            <Image src={back.innerLogo} alt='logo' height={50} width={50} className={styles.innerLogo} />
                        }
                        {
                            back.label &&
                            <p className={styles.label} aria-label={back.label}>{
                                getLetter(back.label).map((value, index) =>{
                                    return <span key={index}>{value}</span>
                                })
                            }</p>
                        }
                    </div>
                    {(back.cardName || back.title) &&
                    <div className={styles.info}>
                        {
                            back.title &&
                        <h2 aria-label={back.title} className={`${styles.title} ${styles.transform}`}>{back.title}</h2>
                        }
                        {
                            back.cardName &&
                        <h3 aria-label={back.cardName} className={`${styles.cardName} ${styles.transform}`}>{back.cardName}</h3>
                        }
                    </div>
                        }

                    {
                        back.cardNumber &&
                    <div className={styles.cardNumber}>
                        <h1 aria-label={`${back.cardNumber}`}>{vipNumber(back.cardNumber)}</h1>
                    </div>
                    }
                </div>
            </div>
            <div className={`${styles.transparent} ${isFirefox() && styles.transparentFirefox}`}>
                <Image src={outerLogo} alt='secdesk logo' height={52.77} width={52.77} className={styles.outerLogo} />
            </div>
        </div>
    )
});

export default Vipcard;