import React, { FC } from 'react';
import styles from './visualBreakup.module.css';
import Image from 'next/image';



export default function VisualBreakup({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <Image src='visualbreakupbackground.svg'
                alt=''
                height={300}
                width={1366}
                className={styles.bgartOne}
                />
            <Image src='visualbreakupbackground.svg'
                alt=''
                height={300}
                width={1366}
                className={styles.bgartTwo}
                 />
            {children}
        </div>
    )
}
