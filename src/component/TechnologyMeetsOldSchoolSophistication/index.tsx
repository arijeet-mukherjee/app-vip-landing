import dynamic from 'next/dynamic';
import styles from './technologyMeetsOldSchoolSophistication.module.css';
const LimpidBox = dynamic(()=> import('@component/common/LimpidBox'));

interface TechnologyMeetsOldSchoolSophisticationProps {
    heading: string;
    limpidBoxes: {
        image: string;
        text: string;
        textColor: string;
        dHeight: string;    //height according to desktop
        dWidth: string;    //width according to desktop
        mHeight: string;    //height according to mobile
        mWidth: string;    //width according to mobile
    }[];
}

const TechnologyMeetsOldSchoolSophistication: React.FC<TechnologyMeetsOldSchoolSophisticationProps> = ({ heading, limpidBoxes }) => {
    return (
        <div className={styles.technologyMeetsOldSchoolSophistication}>
            <h2 aria-label={heading} className={styles.heading}>{heading}</h2>
            <div className={styles.limpidBoxes}>
                {
                    limpidBoxes.map((element, index) => (
                        <LimpidBox key={index} image={element.image} text={element.text} textColor={element.textColor} dHeight={element.dHeight} mHeight={element.mHeight} dWidth={element.dWidth} mWidth={element.mWidth} />
                    ))
                }
            </div>
        </div>
    )
}

export default TechnologyMeetsOldSchoolSophistication;
