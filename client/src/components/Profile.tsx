import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { AiOutlineCloseCircle, AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
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
    const { studyTimeInSec, timeString, triggerCountDown, setStudyTimeInSec,
        setTimeString, setTriggerCountDown, paused, reset, setPaused, setReset, setTimerStatus } = useContext(TimerContext)
    let history = useHistory()

    useEffect(() => {
        localStorage.setItem("paused", paused)
    }, [paused])

    useEffect(() => {
        localStorage.setItem("reset", reset)
    }, [reset])
    return (
        <div className="profile_container">

            <div className="profile_pic_and_info">
                <div className="profile_pic"></div>
                <div className="profile_info">
                    <h3 className="profile_name">{name}</h3>
                    <div className="num_folders_and_num_sets">
                        <div className="count">Folder count: {numFolders} | Set count: {numSets}</div>
                        <div className="profile_timer_container">
                            <div className="count">Time remaining: {timeString}</div>
                            {!paused ? (
                                <AiOutlinePauseCircle onClick={() => setPaused(true)} className="pauseplay_refresh_btn"></AiOutlinePauseCircle>
                            ) : (
                                    <AiOutlinePlayCircle onClick={() => setPaused(false)} className="pauseplay_refresh_btn"></AiOutlinePlayCircle>
                                )}
                            <IoRefreshOutline onClick={() => setReset(true)} className="pauseplay_refresh_btn"></IoRefreshOutline>
                            <AiOutlineCloseCircle className="custom_timer_close_btn" onClick={() => { setTimerStatus("killed") }}></AiOutlineCloseCircle>

                        </div>

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
