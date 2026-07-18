import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './assets/vendor/fonts/iconify-icons.css';
import './assets/vendor/css/core.css';
import './assets/css/demo.css';
import './assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'; 
import './assets/vendor/libs/apex-charts/apex-charts.css'; 


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
