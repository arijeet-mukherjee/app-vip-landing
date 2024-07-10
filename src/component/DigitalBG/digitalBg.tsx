import React from 'react';
import styles from './digitalbg.module.css';
import VisualBreakup from '@component/common/VisualBreakup/VisualBreakup';
import MetalBadge from '@component/common/MetalBadge/MetalBadge';


/**
 * @param {string} badgeText - Badge text
 * @param {string} badgeColor - Badge color
 * @param {string} Title - Title of the section **/

export default function DigitalBg({
    badgeText,
    badgeColor,
    Title,
    descriptionArray
}: {
    badgeText: string,
    badgeColor: string,
    Title: string,
    descriptionArray: string[]
}) {
    // Use default values if props are not provided
    badgeText = badgeText || '';
    badgeColor = badgeColor || '';
    Title = Title || '';
    descriptionArray = descriptionArray || '';

    return (
        <VisualBreakup>
            <div className={styles.container}>
                <MetalBadge label={badgeText} colorVariant={badgeColor}/>
                <h1 className={styles.detailTitle}>{Title}</h1>
                {descriptionArray.map((description, index) => {
                    return <p key={index} className={styles.detailpoints}>{description}</p>
                })}
            </div>
        </VisualBreakup>
    )
}