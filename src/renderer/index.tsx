// #region Imports
// Importing necessary react libraries
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importing styles and components
import './global.css'
import Titlebar from './components/titlebar'
import App from './components/app'
// #endregion Imports


// #region Render
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Titlebar />
    <App />
  </StrictMode>,
)
// #endregion Render