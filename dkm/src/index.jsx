import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/index.scss";

import Layout from './layout';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

// Pages
import Main from './pages/Main/Main';
import Events from './pages/Events/Events';
import Slay from './pages/Slay/Slay';


const root = ReactDOM.createRoot(document.getElementById('root'));

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/events", element: <Events /> },
  { path: "/slay", element: <Slay /> },
  { path: "/stella", element: <Slay /> },
]);

root.render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={BrowserRouter}/>
    </Layout>
  </React.StrictMode>
);


