import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SharedThemeProvider } from '@catena-x/portal-shared-components'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SharedThemeProvider>
      <App />
    </SharedThemeProvider>
  </StrictMode>,
)
