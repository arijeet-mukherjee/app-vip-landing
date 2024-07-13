import React from 'react';
import styles from './metalbadge.module.css';

export default function MetalBadge({
    label,
    colorVariant,
}: {
    label: string,
    colorVariant: string, // 'gold', 'silver', 'bronze'
}) {
  return (
    <div className={colorVariant==="silver"?styles.containerSilver:styles.containerGold}>{label}</div>
  )
}
