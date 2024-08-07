'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import Header from '@component/Header';
import Button from '@component/common/Button';
import { useAppSelector, useAppDispatch } from '@store/store';
import { setGlobalLanguage } from '@store/globalLanguageSlice';


interface dd {
    label: string;
    url: string;
}

interface navlink {
    label: String;
    url: string;
    dditem?: dd[];
}
interface MobileNavModalProps {
    list: navlink[];
    closeModal: Function;
    modalState: boolean;
    headerData: any;
    navbarData: any;
}
const MobileNavModal: FC<MobileNavModalProps> = ({ list, closeModal, modalState, headerData, navbarData }) => {
    const globalLanguage = useAppSelector<any>(state => state.globalLanguage);
    const dispatch = useAppDispatch();
    const handleLanguage = (lang: string) => {
        dispatch(setGlobalLanguage({ globalLanguage: lang }))
    }



    function handelClick(e: MouseEvent) {
        e.preventDefault();
    }

    return (
        <div className={styles.mobileNavModal} style={modalState ? {
            height: '100vh',
            zIndex: 10000,
            overflow: 'hidden',
        } : {
            height: '0vh',
            zIndex: 10000,
            overflow: 'hidden',
        }}>
            <div className={styles.headerContainer}>
                <Header openModal={closeModal} modalState={modalState} headerData={headerData} />
            </div>
            <div className={styles.navBar}>
                {list?.map((item, index) => {
                    if (item.dditem?.length === 0) {
                        return (
                            <div className={styles.navItem} key={index} onClick={() => {
                                closeModal(item.url)
                            }} >{item.label}</div>
                        )
                    }
                }
                )}
            </div>
            <div className={styles.btnContainer}>
                <Button label={headerData.navigation_bar.button.label} hc={handelClick} background='transparent' backgroundOnHover='#F4C9A4' textColor='white' textColorOnHover='black' borderColor='#F4C9A4' fontSize={20} />
            </div>
        </div>
    );
};
export default MobileNavModal;
//