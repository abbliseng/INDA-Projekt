import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/index.scss";

import Layout from './layout';

// Pages
import Events from './pages/Events/Events';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Layout>
      <Events />
    </Layout>
  </React.StrictMode>
);


