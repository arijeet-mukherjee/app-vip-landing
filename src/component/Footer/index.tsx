'use client';
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.css";
import Image from 'next/image';
import { getCurrentYear, goToTop } from '../../utils/util/index';
import Link from 'next/link';

interface content {
  contentName: string;
  contentUrl: string;
}
interface socialMedia {
  socialName: string;
  socialUrl: string;
  socialIcon: string;
}
interface logo {
  logoName: string;
  logoUrl: string;
}
interface background{
  backgroundName: string;
  backgroundUrl: string;
}
interface FooterProps {
  contents?: Array<content>;
  socialMedias?: Array<socialMedia>;
  branding?: string;
  logo?: logo;
  background?: background;
};

const Footer: React.FC<FooterProps> = React.memo(({ contents, socialMedias, branding, logo, background }) => {

  const [firstHalf, setFirstHalf] = useState<content[]>();
  const [secondHalf, setSecondHalf] = useState<content[]>();

  useEffect(() => {
    if (contents && contents.length) {
      const length = contents.length;
      const half = Math.ceil(length / 2);
      setFirstHalf(contents.slice(0, half));
      setSecondHalf(contents.slice(half, length));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Image src={background?.backgroundUrl ? background.backgroundUrl : "/netherland.svg"}
        alt={background?.backgroundName ? background.backgroundName : "netherland"}
        className={styles.netherland}
        width={250}
        height={225}
      />
      
        <Image
          className={styles.logo}
          tabIndex={0}
          src={logo?.logoUrl ? logo.logoUrl : '/logo.svg'}
          alt={logo?.logoName ? logo.logoName : "secDesk logo"}
          width={100}
          height={48}
        />

      <div className={styles.topBtn} aria-label="back to top" onClick={() => { goToTop() }} tabIndex={0}>
        <Image
          className={styles.topBtn_img}
          src="/topBtn.svg"
          alt="top button"
          width={20}
          height={10} />Back to top</div>

      <hr className={styles.horizontalLine} aria-label='horizontal line' />

      <div className={styles.center}>
        <ul className={styles.center_options} id={styles.center_list1}>
          {firstHalf?.map(function (val, index) {
            return <li key={index}>
              <Link href={val.contentUrl}>{val.contentName}</Link>
            </li>
          })}
        </ul>
        <ul className={styles.center_options} id={styles.center_list2}>
          {secondHalf?.map(function (val, index) {
            return <li key={index}>
              <Link href={val.contentUrl}>{val.contentName}</Link>
            </li>
          })}
        </ul>
      </div>

      <div className={styles.branding} aria-label={`${branding ? branding : ''} ${getCurrentYear()}`} tabIndex={0}>{`${branding ? branding + ','  : ''} ${getCurrentYear()}`}</div>

      <div className={styles.socials}>

        {socialMedias?.map(function (val, index) {
          return <Link href={val.socialUrl} tabIndex={0} key={index}>
            <Image
              src={val.socialIcon}
              alt={val.socialName}
              className={styles.socials_icon}
              width={20}
              height={20}
            />
          </Link>
        })}
      </div>
    </div>
  )
});
export default Footer;
