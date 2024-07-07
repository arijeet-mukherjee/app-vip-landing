import React from 'react'
import CardBox from '@component/cardBox'
import PlansCard from './PlansCard/index';


interface Plans {
    title: string;
    price: number;
    discountPercentage: number;
    buttonText: string;
    currency: string;
    currencySymbol: string;
    bulletPoint: string;
    ribbonText: string;
    period: string;
    hookStringOne: string;
    hookStringTwo: String;

}
interface PlanCardProps {
    cardTitle: string;
    plans:Plans[];
    bulletIcon: string;
}
interface CTABox {
    title: string,
    iconPosition: string,
    paddingLeftContent: string,
    bulletPointImg: string,
    bulletPoints: Array<string>,
    goTo: string,
    childProps: PlanCardProps;
}
const CTABox: React.FC<CTABox> = ({ 
    title,
    iconPosition,
    paddingLeftContent,
    bulletPointImg,
    bulletPoints,
    childProps,
goTo}) => {

    return (
        <CardBox
    
            bulletPointImg={bulletPointImg}
            bulletPoints={bulletPoints}
            title={title}
            iconPosition={iconPosition}
            paddingLeftContent={paddingLeftContent}
            gridArea={{ cardContent: '1/1', cardImage: '2/1' }}
            paddingImageContent={'0px'}
            fullGradient={true}
            child={<PlansCard
                cardTitle={childProps.cardTitle}
                plans={childProps.plans}
                bulletIcon={childProps.bulletIcon}
            />}
        />
    )
}

export default CTABox;