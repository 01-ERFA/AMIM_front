import React, { useContext, useState } from "react";

import { Context } from "../store/appContext";

import Hexagonal_loading from "../components/animations/hexagonal_loading";
import Modal_loading from "../components/animations/modal_loading";

const Start = () => {

    const { store, actions } = useContext(Context);

    return(
        <>

            {typeof store?.language !== 'string'
                ?
                    <Modal_loading 
                        num_splits={typeof store?.language === 'object'?store?.language.length-1:'0'} 
                        languages={store?.language}
                        nexts_actions={actions?.webApp?.loading?.starting}
                    />    
                :null}

            <Hexagonal_loading  />

        </>
    )
}

export default Start