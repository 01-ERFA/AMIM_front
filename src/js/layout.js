import React, {useContext} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Context } from "./store/appContext";

import Start from "./views/start"

import Navbar from "./components/header";
import Footer from "./components/footer";
import Home from "./views/home";


import injectContext from "./store/appContext";

import "../styles/normalize.css"
import "../styles/main.css"


function Layout() {
  const { store, actions } = useContext(Context);

  return (
    <>
      {
        store?.start?.started === false
          ?
            <Start />
          :
            <BrowserRouter basename={store?.basename} >

              <Navbar />
                    
              <Routes>
              
                <Route element={<Home />} path="/" />
              
              </Routes>
      
              <Footer />

            </BrowserRouter>
      }

    </>
  );
}

export default injectContext(Layout);
