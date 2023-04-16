import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Create from './components/Create';
import Topup from './components/Topup';
import Claim from './components/Claim';
const router = createBrowserRouter([
  {
  
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Claim />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/topup",
        element: <Topup />,
      },
      {
        path: "/claim",
        element: <Claim />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
