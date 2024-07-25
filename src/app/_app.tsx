'use client'
import React, { useState, useRef, useCallback } from "react";
import dynamic from 'next/dynamic';
import styles from './app.module.css';
import useOnScreen from "@util/useOnScreen";
import Hero from "@component/Hero";
import Shield from "@component/common/Shield";
import { setShieldState } from '@store/shieldSlice';
import { useAppDispatch } from '@store/store';
import { useAppSelector } from '@store/store';

const MobileNavModal = dynamic(() => import('@component/MobileNavModal'));
const CardQuality = dynamic(() => import('@component/cardQuality'), { ssr: false });
const Carousel = dynamic(() => import('@component/Carousel'), { ssr: false });
const CTABox = dynamic(() => import('@component/CTASection'), { ssr: false });
const NewsLetter = dynamic(() => import('@component/NewsLetter'), { ssr: false });
const Footer = dynamic(() => import('@component/Footer'), { ssr: false });
const TawkChatWidget = dynamic(() => import('@component/common/TawkChat'), { ssr: false });
const QuizWindow = dynamic(() => import('@component/common/QuizWindow'), { ssr: false });
import { isMobile, goTo } from "@util/index";
import VisualBreakup from "@component/common/VisualBreakup/VisualBreakup";
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

  const refIntroduction = useRef<HTMLDivElement>(null);

  const refCardQuality = useRef<HTMLDivElement>(null);
  const isVisibleCardQuality = useOnScreen(refCardQuality, '0px');

  const refCarouselCurrentSubscription = useRef<HTMLDivElement>(null);
  const isVisibleCarouselCurrentSubscription = useOnScreen(refCarouselCurrentSubscription, '50px');

  const refCarouselUpcomingSubscription = useRef<HTMLDivElement>(null);
  const isVisibleCarouselUpcomingSubscription = useOnScreen(refCarouselUpcomingSubscription, '70px');

  const refCTABox = useRef<HTMLDivElement>(null);
  const isVisibleCTABox = useOnScreen(refCTABox, '120px');

  const refQuizWindow = useRef<HTMLDivElement>(null);
  const isVisibleQuizWindow = useOnScreen(refQuizWindow, '100px');


  const refNewsLetter = useRef<HTMLDivElement>(null);
  const isVisibleNewsLetter = useOnScreen(refNewsLetter, '150px');

  const refFooter = useRef<HTMLDivElement>(null);
  const isVisiblefFooter = useOnScreen(refFooter, '200px');

  const [modalOpen, setModalOpen] = useState(false);

  let ListIndex = data.header.navigation_bar.navbarItems
  let refListValues = [refIntroduction, refCardQuality, refCTABox, refNewsLetter, refQuizWindow]
  const [refList, setRefList] = React.useState<{ [key: string]: any }>({
    [ListIndex[0].label]: refIntroduction,
    [ListIndex[1].label]: refCardQuality,
    [ListIndex[2].label]: refCTABox,
    [ListIndex[3].label]: refNewsLetter,
    [ListIndex[4].label]: refQuizWindow,
  } as { [key: string]: React.RefObject<HTMLDivElement> });
  React.useEffect(() => {
    let ListIndex = data.header.navigation_bar.navbarItems
    setRefList({
      [ListIndex[0].label]: refIntroduction,
      [ListIndex[1].label]: refCardQuality,
      [ListIndex[2].label]: refCTABox,
      [ListIndex[3].label]: refNewsLetter,
      [ListIndex[4].label]: refQuizWindow,
    })
  }, [globalLanguage.globalLanguage, modalOpen])

  const redirectComponent = useCallback((item: string) => {
    goTo(refList[item])
  }, []);

  const dispatch = useAppDispatch();
  const shield = useAppSelector(state => state.shield);

  const openModal = useCallback((gotocaller: boolean, refList: any, item: string) => {
    setModalOpen(prevModalOpen => !prevModalOpen);
    dispatch(setShieldState({ ...shield, top: 80, visible: true }));
    if (gotocaller) {
      setTimeout(() => {
        goTo(refList[item])
      }, 400);
    }
  }, []);

  const [carouselStyle, setCarouselStyle] = useState<any>({ backgroundImage: "url(/worldmap.svg)", backgroundSize: "contain", backgroundRepeat: "no-repeat" });

  React.useEffect(() => {
    if (isMobile()) {
      setCarouselStyle({ backgroundImage: "url(/worldmap.svg)", background: "linear-gradient(to bottom, #0A041F 30%, transparent 30%)" });
    }
  }, [])
  return (
    <>
      {isMobile() ? <MobileNavModal modalState={modalOpen} closeModal={openModal} list={data.header.navigation_bar.navbarItems} headerData={data.header} navbarData={data.header.navigation_bar} refList={refList} /> : <></>}
      <div className={styles["container"]} style={modalOpen ? { height: '100vh', overflow: 'hidden' } : {}}>

        <Hero
          introduction={data.header.introduction}
          content={data.header.content}
          openModal={openModal}
          modalState={modalOpen}
          headerData={data.header}
          refList={refList}
          front={data.header.front}
          back={data.header.back}
          outerLogo={data.header.outerLogo}
        />
        <DigitalBg
          badgeText={data.digitalBodyGaurdSection.badgeText}
          badgeColor={data.digitalBodyGaurdSection.badgeColor}
          Title={data.digitalBodyGaurdSection.Title}
          descriptionArray={data.digitalBodyGaurdSection.descriptionArray}
        />

        <div className={styles.wrapper}>
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

        <div className={styles.benefitAndFeature} style={{backgroundImage : 'url(/benifitAndFeature.png)'}}>
          <BenefitAndFeature
            bulletPointImg={data.benefitAndFeature.bulletPointImg}
            bulletPoints={data.benefitAndFeature.bulletPoints}
            heading={data.benefitAndFeature.heading}
            badgeText={data.benefitAndFeature.badgeText}
            badgeColor={data.benefitAndFeature.badgeColor}
          />
        </div>
        
        <div className={styles["carousel-wrapper"] + " " + styles["cardCarousalRemain"]}>
          <Carousel {...data.carouselCurrentSubscription} redirectComponent={redirectComponent} />
          <SpotLight color="rgb(255 162 96 / 60%)" top={250} right={-300} width={1000} height={1050} />
          <Carousel {...data.carouselUpcomingSubscription} redirectComponent={redirectComponent} />
        </div>

        <div className={styles.wrapper}>
          <SpotLight color="rgb(255 255 255 / 60%)" bottom={-100} left={-200} width={700} height={700} />
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
          hc={() => { }}
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


