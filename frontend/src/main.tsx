import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';

import Welcome from './pages/Welcome.tsx';
// import Create from './pages/Create.tsx';
import Register from './pages/Register.tsx';
// import Login from './pages/Login.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Welcome />} />
      {/* <Route path="/create" element={<Create />} /> */}
      <Route path="/register" element={<Register />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
