'use client'
import Animation from '../Animation';
import styles from './getCoupon.module.css';
import { useRef, useState } from 'react';
import { emailVerified } from '@util/index';
import Image from 'next/image';

interface GetCouponProps {
    GetCouponInMyInboxButton: string;
}


const GetCoupon : React.FC<GetCouponProps> = ({ GetCouponInMyInboxButton }) => {
    const [inputs, setInputs] = useState({ name: '', email: '' });
    const closeName = useRef<HTMLImageElement>(null!);
    const closeEmail = useRef<HTMLImageElement>(null!);
    const emailBox = useRef<HTMLDivElement>(null!);
    const [showAnimation, setShowAnimation] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setInputs({ ...inputs, [e.target.name]: e.target.value });

            if (e.target.value !== '') {
                closeName.current.style.visibility = 'visible';
            }
            else {
                closeName.current.style.visibility = 'hidden';
            }
        }
        else {
            setInputs({ ...inputs, [e.target.name]: e.target.value });
            if (emailVerified(e.target.value)) {
                emailBox.current.style.border = '1px solid #402ea1'
            }
            else {
                emailBox.current.style.border = '1px solid #dc3545'
            }
            if (e.target.value !== '') {
                closeEmail.current.style.visibility = 'visible';
            }
            else {
                closeEmail.current.style.visibility = 'hidden';
            }
        }
    };

    const renderComponent = () => {
        return <Animation />
    };

    const handelClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (inputs.name !== '' && inputs.email !== '' && emailVerified(inputs.email)) {
            setShowAnimation(true);
        }else{
            alert("Please enter your details, correctly");
        }
    };

    return (
        <>
            {!showAnimation ? <div className={styles.getCoupon}>
                <div className={styles.inputContainer}>
                    <div className={styles.inputBox}>
                        <div className={styles.subInputBox}>
                            <label htmlFor='name' className={styles.label}>Name</label>
                            <input aria-describedby="name" id='name' name='name' type='text' className={styles.input} value={inputs.name} onChange={handleChange} autoFocus />
                        </div>
                        <Image src='/closebutton.svg' alt='cross button' width={20} height={20} className={styles.close} ref={closeName} onClick={() => { setInputs({ ...inputs, name: '' }); closeName.current.style.visibility = 'hidden' }} />
                    </div>
                    <div className={styles.inputBox} ref={emailBox}>
                        <div className={styles.subInputBox}>
                            <label htmlFor='email' className={styles.label}>Email</label>
                            <input aria-describedby="email" id='email' name='email' type='email' className={styles.input} value={inputs.email} onChange={handleChange} />
                        </div>
                        <Image src='/closebutton.svg' alt='cross button' width={20} height={20} className={styles.close} ref={closeEmail} onClick={() => { setInputs({ ...inputs, email: '' }); closeEmail.current.style.visibility = 'hidden' }} />
                    </div>
                </div>
                <div className={styles["coupon-button"]} role='button' onClick={handelClick}>
                    <a className={styles["button"]}>
                        <span className={styles["button-text"]} aria-label="Get coupon in my inbox">{GetCouponInMyInboxButton}</span>
                    </a>
                </div>
            </div>
                : renderComponent()}
        </>
    )
};

export default GetCoupon;