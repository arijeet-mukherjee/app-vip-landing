import React from 'react';
import styles from './protectYourself.module.css';
import VisualBreakup from '@component/common/VisualBreakup/VisualBreakup';
import Button from '@component/common/Button';
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
          <Button
          label={buttonLabel} 
          background='black'
          borderImageSource={true}
          borderColor='transparent'
          hc={hc}/>
      </div>
    </VisualBreakup>
  )
}
