import React, { useState } from 'react';
import styles from './Chair.module.css';

function Chair({ setChairsChose, setTotalPrice, price, totalPrice, chairsChose, title, isBooked, choose }) {
    const [isChoose, setIsChoose] = useState(choose);
    return (
        <>
            {
                !isBooked ? <div onClick={() => {
                    setIsChoose(!isChoose)
                    if (!isChoose) {
                        setChairsChose([...chairsChose, title]);
                        setTotalPrice(totalPrice + price)
                    } else {
                        const newChairs = chairsChose.filter((chairChose) => {
                            return chairChose !== title
                        })
                        setChairsChose(newChairs);
                        setTotalPrice(totalPrice - price)
                    }
                }} className={`${styles['chair']} ${styles['not-booked']} ${isChoose ? styles['choose'] : ""}`}>
                    {title}
                </div> :
                    <div className={`${styles['chair']} ${styles['booked']}`}>
                        {/* {title} */}
                    </div>
            }
        </>
    );
}

export default Chair;