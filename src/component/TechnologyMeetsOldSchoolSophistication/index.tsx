import LimpidBox from '@component/common/LimpidBox';
import styles from './technologyMeetsOldSchoolSophistication.module.css';

interface TechnologyMeetsOldSchoolSophisticationProps {
    heading: string;
    limpidBoxes: {
        image: string;
        text: string;
        textColor: string;
        dHeight: string;
        dWidth: string;
        mHeight: string;
        mWidth: string;
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