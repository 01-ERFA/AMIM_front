import React, { useState, useRef } from "react";

import "../../styles/components/navbar.css"

import logo from "../../img/icon.ico";

const Navbar = ()=>{

    const [hidden_mobile_menu, set_hidden_mobile_menu] = useState({
        ul: '',
        close_button: ''
    });
    const mobile_menu = useRef()

    const button_mobile_menu = ()=>{
        if (mobile_menu.current.style.transform === '') {
            set_hidden_mobile_menu({
                ul: 'flex',
                close_button: 'none'
            })
            mobile_menu.current.style.transform = 'unset'
        } else {
            set_hidden_mobile_menu({
                ul: '',
                close_button: ''
            })
            mobile_menu.current.style.transform = ''
        }
    }

    return (
        <nav className="navbar-primary">
            <img className="logo" src={logo}/>

            <ul ref={mobile_menu} data-visible='false' className={hidden_mobile_menu?.ul}>
                <div>
                    <h3>Menu</h3>
                    <button onClick={button_mobile_menu}>X</button>
                </div>

                <li>
                    header
                </li>
                <li>
                    header
                </li>
                <li>
                    header
                </li>
                <li>
                    header
                </li>
            </ul>

            <li className={hidden_mobile_menu.close_button} id="mobile-menu" onClick={button_mobile_menu}>
                    <button>
                        <hr />
                        <hr />
                        <hr />
                    </button>
            </li>

        </nav>
    )
}

export default Navbar