import React, { useState, useEffect } from "react";
import "../../../styles/animations/modal_loading.css"



const Modal_loading = (props)=>{

    const [display, set_display] = useState('unset');
    const [opacity, set_opacity] = useState('1');

    function select_button(id_button) {

        props?.nexts_actions(id_button)

        set_opacity('0')
    }

    function screen_split(num_splits) {    
        function generate_split(key) {
            return(
                <hr key={key} className="ml_hr"/>
            )
        }
        const splits = []

        if (typeof props?.languages === 'object') {
            let index = 0
            let index_lenguages = 0
            while (index < props?.languages.length+num_splits) {
                let id = props?.languages[index_lenguages]?.id
                if (index%2 === 0) {
                    splits.push(
                        <button onClick={()=>select_button(id)} className="ml_button" key={'ml_b'+index}>
                            {props?.languages[index_lenguages]?.language}
                        </button>
                        )
                    index_lenguages+=1
                } else {
                    splits.push(generate_split('ml_hr'+index))
                }
                index+=1
            }
        }
        return (
            <div className="ml_cont">
                {splits.map((item)=>item)}
            </div>
        )
    }

    useEffect(()=>{
        setTimeout(() => {
            set_display(opacity === '0'?'none':'unset')
        }, 800);
    }, [opacity])


    return (
        <div className="ml_main_cont" style={{opacity: opacity, display: display}}>
            {screen_split(Number(props?.num_splits))}
        </div>
    )
}

export default Modal_loading