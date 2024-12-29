import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminLandingPage from './Page'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AdminLandingPage />
    </StrictMode>,
)