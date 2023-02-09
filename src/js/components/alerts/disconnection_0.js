import React, { useState } from "react";
import "../../../styles/alerts.css"

const Alert_disconnection_0 = (props)=>{

    const [opacity, set_opacity] = useState(0);

    if (props?.connection === false) {
        setTimeout(() => {
            set_opacity(0.7)
        }, 1500);  

        return(
            <div className="alert_disconnection_0" style={{opacity: String(opacity)}}>
                <div>
                    Disconnected, trying to reconnect in {props.reconnection_time/1000} seconds
                </div>
            </div>
        )
    } 

    return (<></>)
}

export default Alert_disconnection_0