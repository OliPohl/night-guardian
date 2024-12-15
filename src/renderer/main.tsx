import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Titlebar from './components/titlebar'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Titlebar />
  </React.StrictMode>,
)
