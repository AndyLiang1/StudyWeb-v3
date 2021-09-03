import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import "./Css/Timer.css"

import studyImg from "../img/study_icon.png"
import breakImg from "../img/break_icon.png"
import { useEffect, useState } from 'react';
import { FaLessThan } from 'react-icons/fa';
export interface ITimerPopUpProps {
    setTimerPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTimeInSeconds: React.Dispatch<React.SetStateAction<number>>
    setTimerOn: React.Dispatch<React.SetStateAction<boolean>>;
    timerOn: boolean;
    timeInSeconds: number;
    setTimeString: React.Dispatch<React.SetStateAction<string>>

}

export function TimerPopUp({ setTimerPopUpOpen, setTimeInSeconds, setTimerOn, timerOn, timeInSeconds, setTimeString }: ITimerPopUpProps) {
    const [customTimerPopUpOpen, setCustomTimerPopUpOpen] = useState<boolean>(false)
    // let studyLength = 0;

    const setTimer = (studyLength: number, breakLength: number) => {
        // setTimeInSeconds(studyLength);
        // console.log(studyLength);
        // console.log('in setTimer of timer.tsx')
    }




    useEffect(() => {
        if(timerOn) {
            if (timeInSeconds != 0) {
                console.log(`timeInSeconds alreay set`)
                return;
            } else {
                console.log(timeInSeconds);
                console.log('setting timerOn to be true');
                setTimerOn(true)
            }
        }
    }, [timeInSeconds])

    useEffect(() => {
        // beginCountDown(timeInSeconds)
        console.log(`timer on being set `);
    }, [timerOn])

    const beginCountDown = (timeInSec: number) => {
        let durationInSec = timeInSec
        const setIntervalId = setInterval(async () => {
            if (durationInSec != 0) {
                console.log('executing');
                await setTimeString(convertTimeToString(durationInSec))
                durationInSec = durationInSec - 1
                await setTimeInSeconds(durationInSec)
            } else {
                console.log('done');
                clearInterval(setIntervalId)
                setTimerOn(false)
            }
        }, 1000)
    }

    const convertTimeToString = (timeInSec: number): string => {
        // Hours, minutes and seconds
        let hrs = Math.floor(timeInSec / 3600);
        let mins = Math.floor((timeInSec % 3600) / 60);
        let secs = Math.floor(timeInSec % 60);
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";
    
        if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
    
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
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
