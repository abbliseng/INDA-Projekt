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
import Worm from './pages/Worm/Worm';


const root = ReactDOM.createRoot(document.getElementById('root'));

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/events", element: <Events /> },
  { path: "/slay", element: <Slay /> },
  { path: "/stella", element: <Slay /> },
  { path: "/worm", element: <Worm /> },
]);

root.render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={BrowserRouter}/>
    </Layout>
  </React.StrictMode>
);


