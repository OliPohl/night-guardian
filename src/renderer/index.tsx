import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './global.css'

import Titlebar from './components/titlebar'
import App from './components/app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Titlebar />
    <App />
  </StrictMode>,
)
