import React, { useState, useEffect, useRef } from 'react';
import styles from './ourProcessesSection.module.css';
import Image from 'next/image';
import TechnologyMeetsOldSchoolSophistication from '@component/TechnologyMeetsOldSchoolSophistication';
import { ImageError } from 'next/dist/server/image-optimizer';
import data from '@component/data/EN.json'
import { configDotenv } from 'dotenv';


interface OurProcessesSectionProps {
  sectionHeading: string;
  gapBetweenItems: number;
  textContainerHeight: number;
  textContainerWidth: number;
  itemArray: {
    image: string;
    text: string;
  }[];
}


/**
 * @param {string} image - The URL of the image to be displayed in the circular icon.
 * @param {number} heightOfLink - The height of the linkage line.
 * @param {boolean} next - A boolean indicating whether this is the next item in the sequence.
 */
function CircularIcon({
  image,
  heightOfLink,
  next,
  dimension,
  cid
}: {
  image: string,
  heightOfLink: number,
  next: boolean,
  dimension: number,
  cid: number,
}) {

  return (
    <>
      <style>
        {
          `
.linkage${cid} {
    width: calc((100vw/1920)*4);
    background: linear-gradient(#caad74 17.03%, #D8C08F 53.21%) border-box;
    position: absolute;
    justify-self: center;
    animation: slide 2s ease ${cid*2000}ms forwards;

}

@keyframes slide {
    from {
        height: 0px;
        bottom: 0px;

    }

    to {
        height: calc((100vw/1920)*${
                heightOfLink
            });

        bottom: calc((100vw/1920)* -${
                heightOfLink
            });
    }

}
        `
        }
      </style>
      <div className={styles.metalCircleContainer}
        style={{
          height: `calc((100vw/1920)*${dimension})`,
          width: `calc((100vw/1920)*${dimension})`
        }}>
        <div className={styles.circle}></div>
        <Image
          fill
          src={image}
          alt="Image"
          className={styles.imageInCirlce}
          style={{ borderRadius: '100%' }} />
        {next &&
          <div
            className={`linkage${cid}`}></div>}
      </div>
    </>
  )
}


/**
 * @param {string} sectionHeading - The title of the progress section.
 * @param {number} gapBetweenItems - The gap between each progress item.
 * @param {number} textContainerHeight - The height of the text container.
 * @param {number} textContainerWidth - The width of the text container.
 * @param {Object[]} itemArray - An array of objects containing the image and text for each progress item.
 */
export default function OurProcessesSection({
  sectionHeading,
  gapBetweenItems,
  textContainerHeight,
  textContainerWidth,
  itemArray
}: OurProcessesSectionProps) {

  const sectionHeadingDefault = sectionHeading || "Our Processes";
  const gapBetweenItemsDefault = gapBetweenItems || 54;
  const textContainerHeightDefault = textContainerHeight || 125;
  const textContainerWidthDefault = textContainerWidth || 1249;
  const itemArrayDefault = itemArray || [];

  return (
    <>
      <div style={{
        gap: `calc((100vw/1920)*${gapBetweenItemsDefault})`
      }}
        className={styles.ourProgressContainer} >
        <div className={styles.titleContainer}><h1>{sectionHeadingDefault}</h1></div>
        {itemArrayDefault.map(async (item, index) => {

          return (
            <>
              <div className={styles.checkPointContainer} key={index} aria-label={`Checkpoint ${index + 1}`}>
                <CircularIcon
                  image={item.image}
                  next={(itemArray.length - 1) !== index}
                  heightOfLink={gapBetweenItemsDefault}
                  dimension={textContainerHeightDefault} 
                  cid={index}/>
                <div className={styles.checkPointDetailContainer}
                  style={{
                    width: `calc((100vw/1920)*${textContainerWidthDefault})`,
                    height: `calc((100vw/1920)*${textContainerHeightDefault})`,
                  }}
                  aria-label={`Description for Checkpoint ${index + 1}`}>
                  <p>{item.text}</p>
                </div>
              </div>
            </>
          )
        })}
      </div>
      <div className={styles.opsMobile}>
        <TechnologyMeetsOldSchoolSophistication heading={sectionHeading} limpidBoxes={data.ourProcessesSection.limpidBoxes} />
      </div>
    </>
  )
}
