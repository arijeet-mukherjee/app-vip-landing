import React, { useEffect, useState } from 'react';
import styles from './spotLight.module.css';
import { isMobile } from '@util/index';

interface spotLightProps {
    height?: number;
    width?: number;
    color?: string;
    top?: number;           //according to desktop
    bottom?: number;        //according to desktop
    left?: number;          //according to desktop
    right?: number;         //according to desktop
}

const SpotLight: React.FC<spotLightProps> = React.memo(({ height, width, color, top, bottom, left, right }) => {
    
    const [props, setProps] = useState({
        height: `calc((100vw / 1920)* ${height || 500})`,
        width: `calc((100vw / 1920)* ${width || 500})`,
        top: `calc((100vw / 1920)* ${top})`,
        bottom: `calc((100vw / 1920)* ${bottom})`,
        left: `calc((100vw / 1920)* ${left})`,
        right: `calc((100vw / 1920)* ${right})`
    });

    useEffect(() => {
        if(isMobile()){
            setProps({
                height: `calc((100vw / 393)* ${height && height/2.5 || 200})`,
                width: `calc((100vw / 393)* ${width && width/2.5 || 200})`,
                top: `calc((100vw / 393)* ${top && top/2})`,
                bottom: `calc((100vw / 393)* ${bottom && bottom/2})`,
                left: `calc((100vw / 393)* ${left && left/2})`,
                right: `calc((100vw / 393)* ${right && right/2})`
            })
        }
    },[]);

    return(
        <div className={styles.spotLight} style={{
            height: props.height,
            width: props.width,
            background: color || 'white',
            top: props.top,
            bottom: props.bottom,
            left: props.left,
            right: props.right
        }}></div>
    )
});

export default SpotLight;