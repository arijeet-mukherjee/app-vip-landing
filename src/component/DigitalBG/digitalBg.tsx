import React from 'react';
import styles from './digitalbg.module.css';
import VisualBreakup from '@component/common/VisualBreakup/VisualBreakup';
import MetalBadge from '@component/common/MetalBadge/MetalBadge';


const defaultData = {
    badgeText: "YOUR DIGITAL SECURITY MATTERS A LOT",
    badgeColor: "silver",
    Title: "Why Digital Bodyguards?",
    descriptionArray: [
        "The attacks against the industry leaders and people in the spotlight have become common, and the attackers are always on the lookout for a new target.",
        "Despite the dangers of the digital world at an all time high, it is exceptionally rare to find a team of digital bodyguards to safeguard your online security. ",
        "SecDesk VIP is a world class team of online security experts specialized in their fields, ready to become your digital bodyguards. Join the community of digitally secured elites protected by our VIP security expert team."
    ]
}


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
    badgeText = badgeText || defaultData.badgeText;
    badgeColor = badgeColor || defaultData.badgeColor;
    Title = Title || defaultData.Title;
    descriptionArray = descriptionArray || defaultData.descriptionArray;

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