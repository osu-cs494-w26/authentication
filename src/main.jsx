import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import Root from './pages/Root'
import Home from './pages/Home'
import Login from './pages/Login'
import GitHubHome from './pages/GitHubHome'
import GitHubLogin from './pages/GitHubLogin'

import './index.css'

const router = createBrowserRouter([
  { path: "/", Component: Root, children: [
    { index: true, Component: Home },
    { path: "/login", Component: Login },
    { path: "/github", Component: GitHubHome },
    { path: "/github/login", Component: GitHubLogin }
  ]}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
