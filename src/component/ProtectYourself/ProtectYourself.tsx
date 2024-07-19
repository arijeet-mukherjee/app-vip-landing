import React from 'react';
import styles from './protectYourself.module.css';
import VisualBreakup from '@component/common/VisualBreakup/VisualBreakup';
/**
 * @param {string} title - Title of the section
 * @param {string} buttonLabel - Label for the button **/
export default function ProtectYourself({
  title , 
  buttonLabel,
  hc,
}: {
  title: string,
  buttonLabel: string,
  hc: Function
}) {
  
   // Use default values if props are not provided
   title = title || '';
   buttonLabel = buttonLabel || '';

  return (
    <VisualBreakup>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <button className={styles.customButton}
          onClick={(e) => {
            e.preventDefault();
            hc();
            e.stopPropagation();
          }}
          aria-controls={`${buttonLabel} button`}>{buttonLabel}</button>
      </div>
    </VisualBreakup>
  )
}
