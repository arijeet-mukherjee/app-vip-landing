'use client';
import Image from 'next/image';
import styles from './styles.module.css';
import { useRef, useEffect, useState } from "react";
import { setShieldState } from '@store/shieldSlice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/store';
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
  fontSize?:number;
}

const Button: React.FC<ButtonProps> = ({ label, hc, background, backgroundOnHover, textColor, textColorOnHover, borderColor, fontSize }) => {

  const [hover, setHover] = useState(false);

  return (
    <>
      <button className={styles.button} aria-controls={label} onMouseEnter={()=>setHover(true)} onMouseLeave={() => setHover(false)} style={{background: hover ? backgroundOnHover : background, color: hover ? textColorOnHover : textColor, border:`2px solid ${borderColor}`, borderImageSource: borderColor, fontSize:`calc((100vw/1920)*${fontSize})`}} aria-label={`${label} button`} onClick={(e) => {
        if (hc) hc(e);
      }}>
        {label}
      </button>

    </>)
}

export default Button;
