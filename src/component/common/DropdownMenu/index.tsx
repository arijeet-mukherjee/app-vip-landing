import styles from './styles.module.css';
import Link from 'next/link';
import { isMobile } from '@util/index';
import { useAppSelector, useAppDispatch } from '@store/store';
import { setGlobalLanguage } from '@store/globalLanguageSlice';

interface listItem {
    label: string;
    url: string;
}
interface DDMenuProps {
    list?: listItem[];
    offsetX?: number;
    offsetY?: number;
}
const DDMenu: React.FC<DDMenuProps> = ({ list, offsetX = 0, offsetY = 0 }) => {
    const dispatch = useAppDispatch();
    const handleLanguage = (lang: string) => {
        dispatch(setGlobalLanguage({ globalLanguage: lang }))
    }
    return (
        <div className={styles.dropdown} style={{
            translate: `calc((100vw/${isMobile() ? 393 : 1920})*${offsetX}) calc((100vw/${isMobile() ? 393 : 1920})*${isMobile() ? offsetY - 20 : offsetY})`
        }} aria-label='language menu'>
            {list?.map((item, index) => {
                return (
                    <div className={styles.tile} key={index}>
                        <Link href={`${item.url}`} aria-label={item.label} className={styles.ddItem} onClick={() => handleLanguage(item.label)} >{item.label}</Link>
                    </div>
                )
            })}
        </div>
    );
};

export default DDMenu;
