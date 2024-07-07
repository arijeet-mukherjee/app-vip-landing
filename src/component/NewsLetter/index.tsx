import React from 'react'
import CardBox from '@component/cardBox'
import {useEffect} from 'react'

interface newsLetter {
    background:{
        mHeight: string;
        mWidth: string;
        dHeight: string;
        dWidth: string;
    }
    image:{
        path: string;
        title: string;
        mHeight: string;
        mWidth: string;
        dHeight: string;
        dWidth: string;
    }
    title: string,
    iconPosition: string,
    buttonText: string,
    buttonIcon: string,
    paddingLeftContent: string,
    inputBox:string,
    bulletPointImg: string,
    bulletPoints: Array<string>,
    goTo: string,
    fullGradient?: boolean
}
const NewsLetter: React.FC<newsLetter> = ({background, image, title, iconPosition, buttonIcon, buttonText, goTo, paddingLeftContent, inputBox, bulletPointImg, bulletPoints, fullGradient }) => {
    return(
            <CardBox 
            background={background}
            image={image} 
            inputBox={inputBox} 
            bulletPointImg={bulletPointImg}
            bulletPoints={bulletPoints} 
            title={title}
            iconPosition={iconPosition}
            buttonIcon={buttonIcon}
            buttonText={buttonText}
            paddingLeftContent={paddingLeftContent}
            gridArea={{cardContent:'1/1', cardImage:'2/1'}}
            goTo={goTo}
            fullGradient={true}
            />
    )
}

export default NewsLetter;
