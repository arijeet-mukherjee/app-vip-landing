import Image from 'next/image';
import styles from './limpidBox.module.css'
import { useEffect, useState } from 'react';
import { isMobile } from '@util/index';

interface LimpidBoxProps {
    image: string;
    text: string;
    textColor: string;
    dHeight: string;
    dWidth: string;
    mHeight: string;
    mWidth: string;
}

const LimpidBox : React.FC<LimpidBoxProps> = ({ image, text, textColor, dHeight, dWidth, mHeight, mWidth }) => {
    const [height, setHeight] = useState(dHeight);
    const [width, setWidth] = useState(dWidth);

    useEffect(() => {
        if(isMobile()) {
            setHeight(mHeight);
            setWidth(mWidth);
        }
    },[]);

    return(
       <div className={styles.limpidBox} style={{height : height, width : width}}>
            {
                image && <Image src={image} alt={`${image} image`} height={270} width={270} className={styles.image}/>
            }
            {
                text && <p aria-label={text} style={{color:textColor}}>{text}</p>
            }
       </div>
    )
}

export default LimpidBox;