// #region Imports
// Importing necessary react libraries
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importing styles
import './shared/styles/general.css'
import './shared/styles/scrollbar.css'
import './shared/styles/divider.css'
import './shared/styles/button.css'
import './shared/styles/toggle.css'
import './shared/styles/dropdown.css'

// Importing components
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