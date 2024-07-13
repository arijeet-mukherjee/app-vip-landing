import React from 'react'
import styles from './vipcard.module.css'
import Image from 'next/image';
import {vipNumber} from '@util/index'
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

    return (
        <div className={styles.vipCard}>
            <div className={styles.solid}>
                <div className={styles.front}>
                    <Image src='/cardtexture.svg' alt='back' fill={true} className={styles.texture} />
                    <div className={`${styles.branding} ${styles.transform}`}>
                        {
                            front.innerLogo &&
                            <Image src={front.innerLogo} alt='logo' height={50} width={50} className={styles.innerLogo} />
                        }
                        <p aria-label={front.label} className={styles.label}>{front.label}</p>
                    </div>

                    <div className={styles.info}>
                        <h2 aria-label={front.title} className={`${styles.title} ${styles.transform}`}>{front.title}</h2>
                        <h3 aria-label={front.cardName} className={`${styles.cardName} ${styles.transform}`}>{front.cardName}</h3>
                    </div>

                    {
                        front.cardNumber &&
                    <div className={`${styles.cardNumber} ${styles.transform}`}>
                        <h1>{vipNumber(front.cardNumber)}</h1>
                    </div>
                    }
                </div>
                <div className={styles.back}>
                    <Image src='/cardtexture.svg' alt='back' fill={true} className={styles.texture} />
                    <div className={styles.branding}>
                        {
                            back.innerLogo &&
                            <Image src={back.innerLogo} alt='logo' height={50} width={50} className={styles.innerLogo} />
                        }
                        <p className={styles.label}>{back.label}</p>
                    </div>
                    <div className={styles.info}>
                        <h2 aria-label={back.title} className={styles.title}>{back.title}</h2>
                        <h3 aria-label={back.cardName} className={styles.cardName}>{back.cardName}</h3>
                    </div>

                    {
                        back.cardNumber &&
                    <div className={styles.cardNumber}>
                        <h1>{vipNumber(back.cardNumber)}</h1>
                    </div>
                    }
                </div>
            </div>
            <div className={styles.transparent}>
                <Image src={outerLogo} alt='secdesk logo' height={52.77} width={52.77} className={styles.outerLogo} />
            </div>
        </div>
    )
});

export default Vipcard;