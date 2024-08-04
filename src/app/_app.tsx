'use client'
import React, { useState, useRef, useCallback } from "react";
import dynamic from 'next/dynamic';
import styles from './app.module.css';
import Hero from "@component/Hero";
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/store';

const MobileNavModal = dynamic(() => import('@component/MobileNavModal'));
const Carousel = dynamic(() => import('@component/Carousel'), { ssr: false });
const Footer = dynamic(() => import('@component/Footer'), { ssr: false });
const TawkChatWidget = dynamic(() => import('@component/common/TawkChat'), { ssr: false });
import { isMobile } from "@util/index";
import DigitalBg from "@component/DigitalBG/digitalBg";
import ProtectYourself from "@component/ProtectYourself/ProtectYourself";
const TechnologyMeetsOldSchoolSophistication = dynamic(() => import('@component/TechnologyMeetsOldSchoolSophistication'), { ssr: false });
const SpotLight = dynamic(() => import('@component/common/spotLight'));
import OurProcessesSection from "@component/ourProcessesSection/OurProgress";
import SecureYourLegacy from "@component/SecureYourLegacy";
import BenefitAndFeature from "@component/BenefitsAndFeature";
import CardBox from "@component/cardBox";

export default function Home() {
  const globalLanguage = useAppSelector<any>(state => state.globalLanguage);
  const data = require(`../component/data/${globalLanguage.globalLanguage}.json`);

  const [modalOpen, setModalOpen] = useState(false);

  const redirectComponent = useCallback((item: string) => {
  }, []);

  function handleNavigation(id: any) {
    const element = document && document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openModal = useCallback((id: any) => {
    setModalOpen(prevModalOpen => !prevModalOpen);
    if (id) {
      setTimeout(() => {
        handleNavigation(id)
      }, 400)
    }
  }, []);

  return (
    <>
      {isMobile() ? <MobileNavModal modalState={modalOpen} closeModal={openModal} list={data.header.navigation_bar.navbarItems} headerData={data.header} navbarData={data.header.navigation_bar} /> : <></>}
      <div className={styles["container"]} style={modalOpen ? { height: '100vh', overflow: 'hidden' } : {}}>

        <Hero
          introduction={data.header.introduction}
          content={data.header.content}
          openModal={openModal}
          modalState={modalOpen}
          headerData={data.header}
          front={data.header.front}
          back={data.header.back}
          outerLogo={data.header.outerLogo}
        />

        <div id='introduction'>
          <DigitalBg
            badgeText={data.digitalBodyGaurdSection.badgeText}
            badgeColor={data.digitalBodyGaurdSection.badgeColor}
            Title={data.digitalBodyGaurdSection.Title}
            descriptionArray={data.digitalBodyGaurdSection.descriptionArray}
          />
        </div>

        <div className={styles.wrapper} id='usp'>
          <SpotLight color="rgb(255 162 96 / 60%)" bottom={-200} right={-400} width={1000} height={1500} />
          <div className={styles.whatItIsFor}>
            <div className={styles.whatItIsForHeading}>{data.imageSlider.whatItIsForHeading}</div>
            <div className={styles.whatItIsForText}>{data.imageSlider.whatItIsForText}</div>
          </div>
          <SecureYourLegacy
            bulletPointImg={data.imageSlider.bulletPointImg}
            imageSliderText={data.imageSlider.imageSliderText}
            bulletPoints={data.imageSlider.bulletPoints}
            buttonLabel={data.imageSlider.buttonlabel} />
          <TechnologyMeetsOldSchoolSophistication heading={data.technologyMeetsOldSchoolSophistication.heading} limpidBoxes={data.technologyMeetsOldSchoolSophistication.limpidBoxes} />
        </div>

        <div className={styles.benefitAndFeature} id='benefits' style={{ backgroundImage: 'url(/benifitAndFeature.png)' }}>
          <BenefitAndFeature
            bulletPointImg={data.benefitAndFeature.bulletPointImg}
            bulletPoints={data.benefitAndFeature.bulletPoints}
            heading={data.benefitAndFeature.heading}
            badgeText={data.benefitAndFeature.badgeText}
            badgeColor={data.benefitAndFeature.badgeColor}
          />
        </div>

        {!modalOpen ? <div className={styles["carousel-wrapper"] + " " + styles["cardCarousalRemain"]} id='services'>
          <Carousel {...data.carouselCurrentSubscription} redirectComponent={redirectComponent} />
          <SpotLight color="rgb(255 162 96 / 60%)" top={240} right={-300} width={1000} height={950} />
          <Carousel {...data.carouselUpcomingSubscription} redirectComponent={redirectComponent} />
        </div> : <></>}

        <div className={styles.wrapper} id='process'>
          <SpotLight color="rgb(255 255 255 / 60%)" bottom={-100} left={-200} width={800} height={800} />
          <OurProcessesSection
            sectionHeading={data.ourProcessesSection.sectionHeading}
            gapBetweenItems={data.ourProcessesSection.gapBetweenItems}
            textContainerHeight={data.ourProcessesSection.textContainerHeight}
            textContainerWidth={data.ourProcessesSection.textContainerWidth}
            itemArray={data.ourProcessesSection.itemArray}
          />
        </div>

        <div className={styles.founderWrapper}>
          <SpotLight color="rgb(242 215 133 / 80%)" bottom={400} right={-200} width={630} height={630} />
          <div className={styles.founderText}>{data.OurfounderText}</div>
          <CardBox
            title={data.founder1.title}
            description={data.founder1.description}
            background={data.founder1.background}
            image={data.founder1.image}
            iconPosition="left"
            badgeText={data.founder1.badgeText}
            badgeColor={data.founder1.badgeColor}
            credentials={data.founder1.credentials}
          />

          <CardBox
            title={data.founder2.title}
            description={data.founder2.description}
            background={data.founder2.background}
            image={data.founder2.image}
            iconPosition="left"
            badgeText={data.founder1.badgeText}
            badgeColor={data.founder1.badgeColor}
            credentials={data.founder1.credentials}
          />
        </div>

        <ProtectYourself
          title={data.protectYourselfNow.title}
          buttonLabel={data.protectYourselfNow.buttonLabel}
          hc={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            typeof window !== 'undefined' && window.Tawk_API?.maximize && window.Tawk_API?.maximize();
          }}
        />

        <Footer
          branding={data.footer.branding}
          logo={data.footer.logo}
          background={data.footer.background}
          contents={data.footer.content}
          socialMedias={data.footer.socialMedia} />

        <TawkChatWidget />
      </div>
    </>
  );
}
