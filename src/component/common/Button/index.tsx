'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useRef, useEffect, useState } from "react";
import { isMobile } from "@util/index";

interface ButtonProps {
  label: string;
  hc?: Function;
  background?: string;
  backgroundOnHover?: string;
  textColor?: string;
  textColorOnHover?: string;
  borderColor?: string;
  borderImageSource?: boolean;     // Don't use borderColor with this property
  fontSize?:number;               // According to desktop size
}

const Button: React.FC<ButtonProps> = ( props ) => {

  let hc = props.hc || function(){};
  let background = props.background || "transparent";
  let backgroundOnHover = props.backgroundOnHover || "#F4C9A4";
  let textColor = props.textColor || "#ffff";
  let textColorOnHover = props.textColorOnHover || "Black";
  let borderColor = props.borderColor || "#F4C9A4";
  let borderImageSource = props.borderImageSource || false;
  let fontSize = props.fontSize || 24;

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
        setFont(`calc((100vw/393)*10)`);
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
      <button className={ `${styles.button} ${borderImageSource && styles.buttonGradient}`} aria-controls={`${props.label} button`} onMouseEnter={()=> (backgroundOnHover || textColorOnHover) && setHover(true)} onMouseLeave={() => setHover(false)} 
      style={{
        background: hover && backgroundOnHover ? backgroundOnHover : background,
        color: hover && textColorOnHover ? textColorOnHover : textColor,
        border: `${isMobile() ? 'calc((100vw/393)*2)' : 'calc((100vw/1920)*2)'} solid ${borderColor}`,
        fontSize: font,
        padding: padding 
      }}
      onClick={(e) => {if (hc) hc(e)}}>
        {props.label}
      </button>
    </>)
}

export default Button;
