import * as React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { TimerContext } from '../helpers/Contexts';
import "./Css/Profile.css"

export interface IProfileProps {
    name: string | null;
    numFolders: number;
    numSets: number;
}

export function Profile({ name, numFolders, numSets }: IProfileProps) {
    const { timeInSeconds, timeString, triggerCountDown, setTimeInSeconds,
        setTimeString, setTriggerCountDown } = useContext(TimerContext)
    let history = useHistory()
    return (
        <div className="profile_container">

            <div className="profile_pic_and_info">
                <div className="profile_pic"></div>
                <div className="profile_info">
                    <h1 className="profile_name">{name}</h1>
                    <div className="num_folders_and_num_sets">
                        <h3 className="count">Folder count: {numFolders} | Set count: {numSets}</h3>
                        <h3 className="count">Time remaining: {timeString}</h3>
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
