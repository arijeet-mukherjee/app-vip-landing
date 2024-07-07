'use client'
import React from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@store/store';
import { setQuizRefreshState } from '@store/quizRefreshSlice';
import dynamic from 'next/dynamic';

const ProgressBar = dynamic(() => import('@component/common/ProgressBar'));
const VulnerabilityThreat = dynamic(() => import('@component/common/VulnerabilityThreat'));

type CategoryStats = {
    correctCount: number;
    totalCount: number;
};

interface ThreatScorecardProps {
    categoryScores: { [key: string]: CategoryStats };
    totalCorrectScore: number,
    resetQuizState: any
    setGetCoupon : Function;
    quizContent: {
        VulnerabilityTitle: string;
        Threat: string;
        Security: string;
        ThreatCalculator : string;
        YourDeviceIsAtRisk: string;
        Score: string;
        TotalThreat: string;
        DiscountPercent : string;
        DiscountText: string;
        Message: string;
        couponText: string;
        getCouponCodebutton: string;
        GetCouponInMyInboxButton : string;
        Skip : string;
        Next : string;
        CheckYourScore: string;
    };
};

const getCoupon = (setGetCoupon: Function) => {
    setGetCoupon(true);
}

const calculatePercentage = (stats: CategoryStats) => {
    return ((stats.correctCount / stats.totalCount) * 100).toFixed(0);
};

const ThreatScorecard: React.FC<ThreatScorecardProps> = (props: ThreatScorecardProps) => {

    const isQuizRefreshed  = useAppSelector(state => state.refreshQuiz)
    const dispatch = useAppDispatch();

    let { categoryScores, totalCorrectScore, resetQuizState, setGetCoupon, quizContent } = props;
    let fixedtotalCorrectScore = Number(totalCorrectScore.toFixed(0));
    const remainingThreat = 100 - fixedtotalCorrectScore;
    const restartQuiz = () => {
        const newQuizState = {...isQuizRefreshed, quizRefresh : !isQuizRefreshed.quizRefresh}
        dispatch(setQuizRefreshState(newQuizState));
        resetQuizState()
    }
    
    return (
        <div className={styles["scorecard-section"]}  >
            <div className={styles["vunerability-section"]} >
                <div className={styles["vunerability-percentage"]}>
                    <div className={styles["vunerability-header"]}>
                        <div className={styles["vunerability-title"]}>{quizContent.VulnerabilityTitle}</div>
                        <div className={styles["vunerability-heading"]}>
                            <div>#</div>
                            <div>{quizContent.Threat}</div>
                            <div>{quizContent.Security}</div>
                            <div>%</div>
                        </div>
                    </div>
                    <div className={styles["vunerability-report"]}>
                        {Object.keys(categoryScores).map((category, index) => {
                            let formattedIndex = (index + 1).toString().padStart(2, '0')
                            return (
                                <div key={category}>
                                    <VulnerabilityThreat index={formattedIndex} name={category} percent={Number(calculatePercentage(categoryScores[category]))} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={styles["discount-coupon-section"]}>
                    <div className={styles["discount-section"]}>
                        <div className={styles["discount-percent"]}>{quizContent.DiscountPercent}</div>
                        <div className={styles["discount-text"]}>{quizContent.DiscountText}</div>
                    </div>
                    <div className={styles["couponcode-message-section"]}>
                        <div className={styles["message-section"]}>
                            <div className={styles["message-profilephoto"]} style={{ borderRadius: "50%" }}>
                                <Image src="/profilepicture.jpeg" className={styles.makeImageCircular} alt="arrow right" width={34.43} height={34.43} />
                            </div>
                            <div className={styles["message-name"]}>
                                <div className={styles["message-username"]}>Youri Van Der Zwart</div>
                                <div className={styles["message-forcustomer"]}>{quizContent.Message}</div>

                            </div>
                        </div>
                        <div className={styles["couponcode-section"]}>
                            <div className={styles["couponcode"]}>{quizContent.couponText}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["threat-section"]}>
                <div className={styles["threatcalculator-section"]}>
                    <div className={styles["threatcalculator-text"]}>
                        <div className={styles["threatcalculator-title"]}>{quizContent.ThreatCalculator}</div>
                        <div className={styles["riskstatus"]}>{quizContent.YourDeviceIsAtRisk}</div>
                        <div className={styles["threatscore"]}>{quizContent.Score}: {fixedtotalCorrectScore}%</div>
                        <div className={styles["totalthreat"]}>{quizContent.TotalThreat}: {remainingThreat}%</div>
                    </div>
                    <div className={styles["progressbar"]}>
                        <ProgressBar value={fixedtotalCorrectScore} />
                    </div>
                </div>
                <div className={styles["getcouponrefresh-section"]}>
                    <div className={styles["getcoupon-button"]} onClick={()=>getCoupon(setGetCoupon)}>
                        <a>
                            <span className={styles["button-text"]}>{quizContent.getCouponCodebutton}</span>
                            <span className={styles["button-icon"]}>
                                <Image src="/arrowrightwhite.svg" alt="arrow right" className={styles.arrowImg} width={39.83} height={23.31} />
                            </span>
                        </a>
                    </div>
                    <div className={styles["refresh-button"]} onClick={restartQuiz}>
                        <a>
                            <span className={styles["button-icon"]}>
                                <Image src="/refreshicon.svg" alt="arrow right" className={styles.refreshImg} width={39.83} height={23.31} />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ThreatScorecard;
