import React, {useContext} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Context } from "./store/appContext";
import injectContext from "./store/appContext";

import Alert_disconnection_0 from "./components/alerts/disconnection_0";
import Start from "./views/start"

import Navbar from "./components/header";
import Footer from "./components/footer";
import Home from "./views/home";


function Layout() {
  const { store, actions } = useContext(Context);

  return (
    <>

      <Alert_disconnection_0 connection={store?.connected_server_0} reconnection_time={store?.reconnection_time} />

      {
        store?.started_animation === false
          ?
            <BrowserRouter basename={store?.basename} >
              <Routes>
                <Route element={<Start />} path='*' />
              </Routes>
            </BrowserRouter>
          :
            <BrowserRouter basename={store?.basename} >
              <Navbar />
              <Routes>
              
                <Route element={<Home />} path="/" />

                {/* <Route element={<NAME ############################### />} path='*' */}


              </Routes>
              <Footer />
            </BrowserRouter>
      }

    </>
  );
}

export default injectContext(Layout);
