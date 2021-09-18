import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { AiOutlineCloseCircle, AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoRefreshOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { TimerContext } from '../helpers/Contexts';
import "./Css/Profile.css"

export interface IProfileProps {
    name: string | null;
    numFolders: number;
    numSets: number;
}

export function Profile({ name, numFolders, numSets }: IProfileProps) {
    const { timerStatus, setTimerStatus, timeString } = useContext(TimerContext)
    let history = useHistory()

    return (
        <div className="profile_container">

            <div className="profile_pic_and_info">
                <div className="profile_pic">
                    <BsFillPersonFill className="profile_icon"></BsFillPersonFill>
                </div>
                <div className="profile_info">
                    <h3 className="profile_name">{name}</h3>
                    <div className="num_folders_and_num_sets">
                        <div className="count">Folder count: {numFolders} | Set count: {numSets}</div>
                        {timerStatus === 'study' || timerStatus === 'break' ? (
                            <div className="profile_timer_container">
                                {timerStatus === 'study' ? (
                                    <div className="count">Study time remaining: {timeString}</div>
                                ) : null}
                                {timerStatus === 'break' ? (
                                    <div className="count">Break time remaining: {timeString}</div>
                                ) : null}
                                <AiOutlinePauseCircle onClick={() => setTimerStatus('reset')} className="pauseplay_refresh_btn"></AiOutlinePauseCircle>

                                {/* {timerStatus === 'paused' ? (
                                    <AiOutlinePauseCircle onClick={() => setPaused(true)} className="pauseplay_refresh_btn"></AiOutlinePauseCircle>
                                ) : (
                                        <AiOutlinePlayCircle onClick={() => setPaused(false)} className="pauseplay_refresh_btn"></AiOutlinePlayCircle>
                                    )} */}
                                <IoRefreshOutline onClick={() => setTimerStatus('paused')} className="pauseplay_refresh_btn"></IoRefreshOutline>
                                <AiOutlineCloseCircle className="pauseplay_refresh_btn" onClick={() => { setTimerStatus("killed") }}></AiOutlineCloseCircle>

                            </div>
                        ) : (
                                <div className="count">Time Remaining: No Timer Set</div>
                            )}
                    </div>
                </div>
            </div>

            <div className="folder_sets_options_container">
                <a onClick={() => history.push("./listFolders")} className="folders_link">Folders</a>
                <a onClick={() => history.push("./listSets")} className="sets_link">Sets</a>
            </div>
        </div>
    );
}
