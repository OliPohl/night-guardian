import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TestApp from './components/test-app/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestApp />
  </StrictMode>,
)