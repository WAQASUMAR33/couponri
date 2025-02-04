'use client'
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Home from './pages/home/page'; // Import Home component
import Blog from './blog/page'; // Import Blog component
import CustomerRootLayout from './user/layout'
const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerRootLayout />,
    children: [
      {
        path: "/", // Use "/" explicitly for the home route
        element: <Home />
      },
      {
        path: "blog", // No need for "/" before the blog path as it's relative to the parent path
        element: <Blog />
      },
    ]
  },
]);

  function App() {
    return (         
            <RouterProvider router={router} />
    )
  }

export default App
