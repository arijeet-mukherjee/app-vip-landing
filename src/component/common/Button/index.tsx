'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useRef, useEffect, useState } from "react";
import { isMobile } from "@util/index";

interface ButtonProps {
  label: string;
  hc?: Function;
  background: string;
  backgroundOnHover: string;
  textColor: string;
  textColorOnHover: string;
  borderColor?: string;
  borderimagesource?: string;
  fontSize:number;             //according to desktop size
}

const Button: React.FC<ButtonProps> = ({ label, hc, background, backgroundOnHover, textColor, textColorOnHover, borderColor, fontSize }) => {

  const [hover, setHover] = useState(false);
  const [font, setFont] = useState(``);
  const [padding, setPadding] = useState(``);

  useEffect(() => {
    if(fontSize && (fontSize >=20 && fontSize < 24)){
      if(isMobile()){
        setFont(`calc((100vw/393)*14)`);
        setPadding('calc((100vw/393)*8) calc((100vw/393)*12)');
      }
      else{
        setFont(`calc((100vw/1920)*${fontSize})`);
        setPadding('calc((100vw/1920)*10) calc((100vw/1920)*23)');
      }
    }
    else if(fontSize && (fontSize >=24 && fontSize < 30)){
      if(isMobile()){
        setFont(`calc((100vw/393)*8)`);
        setPadding('calc((100vw/393)*10) calc((100vw/393)*15)');
      }
      else{
        setFont(`calc((100vw/1920)*${fontSize})`);
        setPadding('calc((100vw/1920)*20) calc((100vw/1920)*30)');
      }
    }
  },[[], font]);

  return (
    <>
      <button className={styles.button} aria-controls={`${label} button`} onMouseEnter={()=>setHover(true)} onMouseLeave={() => setHover(false)} 
      style={{background: hover ? backgroundOnHover : background,
         color: hover ? textColorOnHover : textColor,
         border: `${isMobile() ? 'calc((100vw/393)*2)' : 'calc((100vw/1920)*2)'} solid ${borderColor}`,
         borderImageSource: borderColor,
         fontSize: font,
         padding: padding }}
      onClick={(e) => {if (hc) hc(e)}
         }>
        {label}
      </button>

    </>)
}

export default Button;
