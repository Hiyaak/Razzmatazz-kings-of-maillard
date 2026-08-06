import { useEffect } from 'react'
import { requestFcmToken, onMessageListener } from './firebaseConfig'

export default function GetFcmToken () {
  useEffect(() => {
    const initFCM = async () => {
      if (!window.isSecureContext) return

      const token = await requestFcmToken()
      if (token) {
        localStorage.setItem('fcmToken', token)
      }
    }

    initFCM()

    onMessageListener().then(payload => {
      if (payload?.notification) {
        alert(`${payload.notification.title}\n${payload.notification.body}`)
      }
    })
  }, [])

  return null
}
