import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import "./Css/Timer.css"

import studyImg from "../img/study_icon.png"
import breakImg from "../img/break_icon.png"
import { useEffect, useState } from 'react';
import { FaLessThan } from 'react-icons/fa';
export interface ITimerPopUpProps {
    setTimerPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setStudyTimeInSec: React.Dispatch<React.SetStateAction<number>>
    setTriggerCountDown: React.Dispatch<React.SetStateAction<boolean>>;
    studyTimeInSec: number;
    setMultOptionErr: React.Dispatch<React.SetStateAction<boolean>>;
    setOriginalStudyTime: React.Dispatch<React.SetStateAction<number>>
}

export function TimerPopUp({
    setTimerPopUpOpen,
    setStudyTimeInSec,
    setTriggerCountDown,
    studyTimeInSec,
    setMultOptionErr,
    setOriginalStudyTime,
}: ITimerPopUpProps) {
    const [customTimerPopUpOpen, setCustomTimerPopUpOpen] = useState<boolean>(false)
    // let studyLength = 0;

    const setTimer = (studyLength: number, breakLength: number) => {
        if (studyTimeInSec === 0) {
            setStudyTimeInSec(studyLength);
            localStorage.setItem("studyTimeInSec", studyLength.toString())
            setTriggerCountDown(true)
            setOriginalStudyTime(studyLength);
        } else {
            console.log('rej');
            setMultOptionErr(true)
            setTimeout(() => {
                setMultOptionErr(false)
            }, 5000)
        }
        setTimerPopUpOpen(false)
    }

    




    return (
        <div className="timer_container">
            <div className="timer_title_container">
                <div className="timer_title">
                    Select an option!
                    <AiOutlineCloseCircle className="timer_close_btn" onClick={() => setTimerPopUpOpen(false)}></AiOutlineCloseCircle>

                </div>
                <div className="timer_subtitle_container">
                    <div className="option_1_title">Study</div>
                    <div className="option_2_title">Break</div>
                </div>
            </div>


            <div className="options_container">
                <div onClick={() => setTimer(10, 15)} className="option1_container">
                    <div className="option1_study">
                        <h1 className="option_desc">45 minutes</h1>
                        <img className="option_img" src={studyImg}></img>
                    </div>
                    <div className="option1_break">
                        <h1 className="option_desc">15 minutes</h1>
                        <img className="option_img" src={breakImg}></img>
                    </div>
                </div>
                <div onClick={() => setTimer(20, 10)} className="option2_container">
                    <div className="option2_study">
                        <h1 className="option_desc">20 minutes</h1>
                        <img className="option_img" src={studyImg}></img>
                    </div>
                    <div className="option2_break">
                        <h1 className="option_desc">10 minutes</h1>
                        <img className="option_img" src={breakImg}></img>
                    </div>
                </div>
                <div onClick={() => setCustomTimerPopUpOpen(true)} className="option3_container">
                    <div className="option3_study">
                        <h1 className="option_plus_btn">+</h1>
                        <img className="option_img" src={studyImg}></img>
                    </div>
                    <div className="option3_break">
                        <h1 className="option_plus_btn">+</h1>
                        <img className="option_img" src={breakImg}></img>
                    </div>
                </div>
            </div>


        </div>

    );
}
