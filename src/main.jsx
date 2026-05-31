import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmProvider } from './shared/contextapi/Confirmcontext .jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* kasih akses routing ke semua komponen di bawahnya */}
    <BrowserRouter>
    {/* kasih akses useConfirm() ke semua komponen di bawahnya */}
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </BrowserRouter>
  </StrictMode>,
)
