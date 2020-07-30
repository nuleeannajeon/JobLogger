import React from 'react'
import './style.css'
import iconimage from './jobloggericon.png'

const JobLoggerIcon = (props) => {
    return (
        <div>
            <img src={iconimage} id="jobLoggerIcon" alt="JobLogger" {...props} />
        </div>
    )
}

export default JobLoggerIcon;
