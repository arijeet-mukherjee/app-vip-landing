'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import Header from '@component/Header';
import Button from '@component/common/Button';
import { useAppSelector, useAppDispatch } from '@store/store';
import { setGlobalLanguage } from '@store/globalLanguageSlice';
import { goTo } from '@util/index';

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
    refList: {};
}
const MobileNavModal: FC<MobileNavModalProps> = ({ list, closeModal, modalState, headerData, navbarData, refList }) => {
    const globalLanguage = useAppSelector<any>(state => state.globalLanguage);
    const dispatch = useAppDispatch();
    const handleLanguage = (lang: string) => {
        dispatch(setGlobalLanguage({ globalLanguage: lang }))
    }
    return (
        <div className={styles.mobileNavModal} style={modalState ? {
            height: '100vh'
        } : {
            height: '0vh',
        }}>
            <div className={styles.headerContainer}>
                <Header refList={refList} openModal={closeModal} modalState={modalState} headerData={headerData} />
            </div>
            <div className={styles.navBar}>
                {list?.map((item, index) => {
                    if (item.dditem?.length === 0) {
                        return (
                            <div className={styles.navItem} onClick={() => closeModal(true, refList, item.label)} key={index} >{item.label}</div>
                        )
                    }
                }
                )}
            </div>
            <div className={styles.btnContainer}>
                <Button label={navbarData.button.label} action_svg={navbarData.button.action_svg} />
            </div>
            <div className={styles.navModalBackground}>
                <Image src='/navModalBackground.svg'
                    alt="nav modal background"
                    objectFit='cover'
                    fill={true}
                />
            </div>
        </div>
    );
};
export default MobileNavModal;