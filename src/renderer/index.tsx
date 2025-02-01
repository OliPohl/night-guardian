// #region Imports
// Importing necessary react libraries
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importing styles
import './styles/general.css'
import './styles/scrollbar.css'
import './styles/divider.css'
import './styles/toggle.css'
import './styles/dropdown.css'

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