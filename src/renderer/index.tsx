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
import Guardian from './components/guardian'
import Titlebar from './components/titlebar'
import Editor from './components/editor'
// #endregion Imports


// #region Render
if (await window.api.isGuardian()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Guardian />
    </StrictMode>,
  )
}
else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Titlebar />
      <Editor />
    </StrictMode>,
  )
}
// #endregion Render