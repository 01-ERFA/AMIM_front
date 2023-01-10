import React, { useContext } from "react";

import { Context } from "../store/appContext";

import Hexagonal_loading from "../components/animations/hexagonal_loading";

const Start = () => {

    const { store, actions } = useContext(Context);


    return(
        <>
            {/* <h1 onClick={actions?.started}>Click me</h1> */}

            <Hexagonal_loading />

        </>
    )
}

export default Start