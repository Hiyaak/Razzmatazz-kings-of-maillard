import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import './i18n'
import { LanguageProvider } from './Context/LanguageContext.jsx'
import { requestFcmToken } from './firebase/firebaseConfig'

if (window.isSecureContext && 'serviceWorker' in navigator) {
  requestFcmToken()
    .then(token => {
      if (token) {
        localStorage.setItem('fcmToken', token)
        console.log('Service Worker / FCM ready')
      }
    })
    .catch(err => {
      console.log('FCM init skipped:', err)
    })
}

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </LanguageProvider>
)
