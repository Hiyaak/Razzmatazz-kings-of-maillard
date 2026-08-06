import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyB-HLjIoO4bqia8ndfXvMXkDMsd53Gx9Uk',
  authDomain: 'pushnotificationrazzmatazz.firebaseapp.com',
  projectId: 'pushnotificationrazzmatazz',
  storageBucket: 'pushnotificationrazzmatazz.firebasestorage.app',
  messagingSenderId: '622773877166',
  appId: '1:622773877166:web:d3ef5154b6e6ad6c9ef03f',
  measurementId: 'G-GTZYKTMC29'
}

const VAPID_KEY =
  'BBQQmlldlGlgReCfvtivjs0mbbw0cU9wsDu44CCMISj9ddCBibfd8byKS8GfJsdDO5oicRUG5z_lO-i5JZHBsPU'

const app = initializeApp(firebaseConfig)

let messagingInstance = null

const getMessagingInstance = async () => {
  if (messagingInstance) return messagingInstance

  try {
    const supported = await isSupported()
    if (!supported) return null
    messagingInstance = getMessaging(app)
    return messagingInstance
  } catch (err) {
    console.error('Firebase messaging not available:', err)
    return null
  }
}

export const requestFcmToken = async () => {
  try {
    const messaging = await getMessagingInstance()
    if (!messaging || !('serviceWorker' in navigator)) return null

    const swPath = `${import.meta.env.BASE_URL}firebase-messaging-sw.js`
    const registration = await navigator.serviceWorker.register(swPath)

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    })

    return token || null
  } catch (err) {
    console.error('FCM token error:', err)
    return null
  }
}

export const onMessageListener = () =>
  new Promise(async resolve => {
    const messaging = await getMessagingInstance()
    if (!messaging) {
      resolve(null)
      return
    }

    onMessage(messaging, payload => {
      console.log('Foreground message:', payload)
      resolve(payload)
    })
  })

export { app }
