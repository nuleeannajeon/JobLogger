import React from 'react'
import './style.css'
import iconimage from './JobLoggerLogo.png'

const JobLoggerIcon = (props) => {
    return (
        <div>
            <img src={iconimage} style={{borderRadius: '10px', border: "2px solid cadetblue"}} id="jobLoggerIcon" alt="JobLogger" {...props} />
        </div>
    )
}

export default JobLoggerIcon;
