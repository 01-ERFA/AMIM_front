import React, { useEffect, useState } from "react";
import "../../../styles/alerts.css"

import Counter from "../tiny/counter";

const Alert_disconnection_0 = (props)=>{

    const [opacity, set_opacity] = useState(0);

    if (props?.connection === false) {
        
        setTimeout(() => {
            set_opacity(0.6)
        }, 1200);  

        return(
            <div className="alert_disconnection_0" style={{opacity: String(opacity)}}>
                <div>
                    Disconnected, trying to reconnect in {' '}
                    {<Counter 
                        scaled={'decreases'} 
                        number={1} 
                        min_range={0}
                        max_range={props.reconnection_time/1000}
                     />} seconds
                </div>
            </div>
        )
    } 

    return (<></>)
}

export default Alert_disconnection_0