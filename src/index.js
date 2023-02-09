import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './js/layout';

import "./styles/normalize.css"
import "./styles/main.css"



const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
);
