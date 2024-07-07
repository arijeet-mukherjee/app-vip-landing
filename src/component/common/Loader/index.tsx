'use client';
import React from "react";
import Image from 'next/image';
import styles from './loader.module.css';
export default function Loader() {
    return (
        <>
            <div className={styles.parent}>
                <div className={styles.loader} title="0">
                    <span className={styles.loadingText}>Loading SecDesk.....</span>
                    <Image id="loader-1" src="/loader.svg" alt="Loading" width={100} height={100} />
                </div>
            </div>
        </>
    );
}
