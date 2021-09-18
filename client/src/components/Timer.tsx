import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import "./Css/Timer.css"

import studyImg from "../img/study_icon.png"
import breakImg from "../img/break_icon.png"
import { useEffect, useState } from 'react';
import { FaLessThan } from 'react-icons/fa';
import { CustomTimerPopUp } from './CRUD/CustomTimerPopUp';
import { TimerContext } from '../helpers/Contexts';
export interface ITimerPopUpProps {
    setTimerPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setStudyTimeInSec: React.Dispatch<React.SetStateAction<number>>
    studyTimeInSec: number;
    setMultOptionErr: React.Dispatch<React.SetStateAction<boolean>>;
    setOriginalStudyTime: React.Dispatch<React.SetStateAction<number>>
    setTimer: (studyLength: number, breakLength: number) => void
}

export function TimerPopUp({
    setTimerPopUpOpen,
    setStudyTimeInSec,
    studyTimeInSec,
    setMultOptionErr,
    setOriginalStudyTime,
    setTimer,
}: ITimerPopUpProps) {
    // let studyLength = 0;




    const {timerStatus, beginCountDown, reset, paused} = React.useContext(TimerContext)
    const [customTimerPopUpOpen, setCustomTimerPopUpOpen] = useState<boolean>(false)
//     useEffect(() => {
//     localStorage.setItem("paused", paused)
//   }, [paused])

//   useEffect(() => {
//     localStorage.setItem("reset", reset)
//   }, [reset])

//   useEffect(() => {
//       console.log('hereeeee');
//     localStorage.setItem("timerStatus", timerStatus)
//     if (timerStatus === 'break') {
//       beginCountDown(false)
//     }
//   }, [timerStatus])

//   useEffect(() => {
//     if (studyTimeInSec != 0) {
//       beginCountDown(true)
//     }
//   }, [studyTimeInSec])
    
    return (
        <div className="timer_container">
            {customTimerPopUpOpen ? (
                <div className="custom_timer_pop_up">
                    <CustomTimerPopUp
                        setCustomTimerPopUpOpen={setCustomTimerPopUpOpen}
                    ></CustomTimerPopUp>
                </div>
            ) : null}

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
                <div onClick={() => setTimer(45, 15)} className="option1_container">
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
                <div onClick={() => {
                    setCustomTimerPopUpOpen(true)
                    // setTimerPopUpOpen(false)
                }} className="option3_container">
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
