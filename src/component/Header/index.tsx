
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from "./styles.module.css";
import Button from '../common/Button';
import Link from 'next/link';
import { useAppSelector } from '@store/store';
import DDMenu from '@component/common/DropdownMenu';
import { isMobile } from '@util/index';

interface HeaderProps {
    openModal: Function;
    modalState: boolean;
    headerData: any;
};

const Header: React.FC<HeaderProps> = ({ openModal, modalState, headerData }) => {
    const [logoSize, setLogoSize] = useState({
        height: 48,
        width: 176
    })
    const [open, setOpen] = useState(false);
    const globalLanguage = useAppSelector<any>(state => state.globalLanguage);
    const handledd: Function = () => {
        setOpen(!open)
    }

    function handelClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        typeof window !== 'undefined' && window.Tawk_API?.maximize && window.Tawk_API?.maximize();
    };

    useEffect(() => {
        if (isMobile()) {
            setLogoSize({
                height: 63,
                width: 125
            })
        }
    }, []);

    return (
        <nav className={styles.header}>
            <div >
                <Link href={headerData.navigation_bar.logo.href}>
                    <Image
                        src={headerData.navigation_bar.logo.src}
                        alt={headerData.navigation_bar.logo.alt}
                        width={logoSize.width}
                        height={logoSize.height}
                        className={styles.logo}
                    />
                </Link>
            </div>
            <div className={styles.navbar}>
                {headerData.navigation_bar.navbarItems?.map((item: any, index: any) => {
                    if (item.dditem?.length === 0) {
                        return (
                            <div aria-label={item.label} key={index}>
                                <Link className={styles.navItem} href={`#${item.url}`} >{item.label}</Link>
                            </div>
                        )
                    }
                    return (
                        <div aria-label={item.label} key={index}
                            className={styles.navItem}
                            onClick={(e) => {
                                e.preventDefault;
                                handledd();
                            }}
                            style={{ color: 'white' }}
                        >{globalLanguage.globalLanguage}
                            <span className={styles.arrowDown} style={{
                                transform: open ? 'rotate(180deg)' : ''
                            }}></span>
                            {open && <DDMenu list={item.dditem} offsetX={0} offsetY={70} />}
                        </div>

                    )
                })
                }

                <Button label={headerData.navigation_bar.button.label} hc={handelClick} fontSize={20} />
            </div>
            {modalState && <div className={styles.mobileLang}>
                {headerData.navigation_bar.navbarItems?.map((item: any, index: any) => {
                    if (item.dditem?.length !== 0) {
                        return (
                            <div aria-label={item.label} key={index}
                                className={styles.navItem}
                                onClick={(e) => {
                                    e.preventDefault;
                                    handledd();
                                }}
                                style={{ color: 'white' }}
                            >{globalLanguage.globalLanguage}
                                <span className={styles.arrowDown} style={{
                                    transform: open ? 'rotate(180deg)' : ''
                                }}></span>
                                {open && <DDMenu list={item.dditem} offsetX={0} offsetY={70} />}
                            </div>
                        )
                    }
                })
                }
            </div>}
            {isMobile() ? <div className={styles.burgerMenuLogo}>
                <Image src={modalState ? "/closebtn.svg" : "/burger-menu-icon.svg"} alt="menu"
                    height={35}
                    width={35}
                    className={styles.burgerSize}
                    onClick={(e) => {
                        e.preventDefault();
                        openModal();
                    }}
                />
            </div> : <></>}
        </nav>
    );
};

export default Header;
