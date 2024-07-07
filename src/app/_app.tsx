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
const CardBox = dynamic(() => import('@component/cardBox'), {
  loading: () => <></>
});
const MobileNavModal = dynamic(() => import('@component/MobileNavModal'));
const CardQuality = dynamic(() => import('@component/cardQuality'), { ssr: false });
const Carousel = dynamic(() => import('@component/Carousel'), { ssr: false });
const CTABox = dynamic(() => import('@component/CTASection'), { ssr: false });
const NewsLetter = dynamic(() => import('@component/NewsLetter'), { ssr: false });
const Footer = dynamic(() => import('@component/Footer'), { ssr: false });
const TawkChatWidget = dynamic(() => import('@component/common/TawkChat'), { ssr: false });
const QuizWindow = dynamic(() => import('@component/common/QuizWindow'), { ssr: false });
import { isMobile, goTo } from "@util/index";

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
        />

        <Shield top={shield.top} right={shield.right} />
        <div className={styles["cardBoxFirst"]} ref={refIntroduction}>
          <CardBox
            title={data.introduction.title}
            description={data.introduction.description}
            background={data.introduction.background}
            image={data.introduction.image}
            iconPosition={data.introduction.image_position}
            buttonText={data.introduction.button_name}
            buttonIcon={data.introduction.button_icon}
            paddingLeftContent={data.introduction.paddingLeftContent}
            paddingImageContent={data.introduction.paddingImageContent}
            goTo={data.introduction.goTo}
            redirectComponent={redirectComponent}
          />
        </div>
        <div className={styles["cardBoxRemain"]}>
          <CardBox
            title={data.yourShield.title}
            description={data.yourShield.description}
            background={data.yourShield.background}
            image={data.yourShield.image}
            iconPosition={data.yourShield.image_position}
            buttonText={data.yourShield.button_name}
            buttonIcon={data.yourShield.button_icon}
            paddingLeftContent={data.yourShield.paddingLeftContent}
            paddingImageContent={data.yourShield.paddingImageContent}
            goTo={data.yourShield.goTo}
            redirectComponent={redirectComponent}
          />
          <CardBox
            title={data.jointheMovement.title}
            description={data.jointheMovement.description}
            background={data.jointheMovement.background}
            image={data.jointheMovement.image}
            iconPosition={data.jointheMovement.image_position}
            buttonText={data.jointheMovement.button_name}
            buttonIcon={data.jointheMovement.button_icon}
            paddingLeftContent={data.jointheMovement.paddingLeftContent}
            paddingImageContent={data.jointheMovement.paddingImageContent}
            goTo={data.jointheMovement.goTo}
            redirectComponent={redirectComponent}
          />
        </div>
        <div ref={refCardQuality} className={styles["whiteBackground"]}>
          {
            isVisibleCardQuality && <CardQuality
              heading={data.qualityCard.heading}
              content={data.qualityCard.content}
              button={data.qualityCard.button}
              childCardProp={data.qualityCard.childCardProp}
              background={data.qualityCard.background}
              redirectComponent={redirectComponent}
            />
          }
        </div>
        <div className={styles["carousel-container-1"] + " " + styles["cardCarousalRemain"]} style={carouselStyle} ref={refCarouselCurrentSubscription}>
          {
            isVisibleCarouselCurrentSubscription && <Carousel {...data.carouselCurrentSubscription} redirectComponent={redirectComponent} />
          }
        </div>
        <div className={styles["carousel-container-2"] + " " + styles["cardCarousalRemain"]} ref={refCarouselUpcomingSubscription}>
          {
            isVisibleCarouselUpcomingSubscription && <Carousel {...data.carouselUpcomingSubscription} redirectComponent={redirectComponent} />
          }
        </div>

        <div ref={refQuizWindow} className={styles["quizCard"]} >
          <div className={styles["quizName"]}><span>{data.translatableText?.discountMsg ?? "Huge discounts are waiting for you on the other side!"}</span></div>{
            isVisibleQuizWindow && <QuizWindow quizDetail={data.quiz} quizContent={data.quizContent} />
          }
        </div>

        <div ref={refCTABox} className={styles["cardBoxRemain"]}>
          {isVisibleCTABox && <CTABox
            title={data.CallToAction.heading}
            iconPosition={data.newsLetter.image_position}
            paddingLeftContent={data.newsLetter.paddingLeftContent}
            bulletPointImg={data.newsLetter.bulletPointImg}
            bulletPoints={data.CallToAction.description}
            goTo={data.newsLetter.goTo}
            childProps={{
              cardTitle: data.CallToAction.cardTitle,
              plans: data.CallToAction.plans,
              bulletIcon: data.CallToAction.bulletIcon,
            }} />
          }
        </div>

        <div ref={refNewsLetter} className={styles["cardBoxRemain"]}>
          {
            isVisibleNewsLetter && <NewsLetter
              title={data.newsLetter.title}
              background={data.newsLetter.background}
              image={data.newsLetter.image}
              iconPosition={data.newsLetter.image_position}
              buttonText={data.newsLetter.button_name}
              buttonIcon={data.newsLetter.button_icon}
              paddingLeftContent={data.newsLetter.paddingLeftContent}
              inputBox={data.newsLetter.inputBox}
              bulletPointImg={data.newsLetter.bulletPointImg}
              bulletPoints={data.newsLetter.bulletPoints}
              goTo={data.newsLetter.goTo}
            />
          }
        </div>
        <div ref={refFooter}>
          {
            isVisiblefFooter &&
            <Footer
              branding={data.footer.branding}
              logo={data.footer.logo}
              background={data.footer.background}
              contents={data.footer.content}
              socialMedias={data.footer.socialMedia} />
          }
        </div>
        <TawkChatWidget />
      </div>
    </>
  );
}
