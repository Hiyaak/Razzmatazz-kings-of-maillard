



//firebase code with  domain working code start //

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";




const firebaseConfig = {
  apiKey: "AIzaSyB-HLjIoO4bqia8ndfXvMXkDMsd53Gx9Uk",
  authDomain: "pushnotificationrazzmatazz.firebaseapp.com",
  projectId: "pushnotificationrazzmatazz",
  storageBucket: "pushnotificationrazzmatazz.firebasestorage.app",
  messagingSenderId: "622773877166",
  appId: "1:622773877166:web:d3ef5154b6e6ad6c9ef03f",
  measurementId: "G-GTZYKTMC29"
};



const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFcmToken = async () => {
  try {
    const token = await getToken(messaging, {
       vapidKey:
        "BBQQmlldlGlgReCfvtivjs0mbbw0cU9wsDu44CCMISj9ddCBibfd8byKS8GfJsdDO5oicRUG5z_lO-i5JZHBsPU",
    });


    return token;
  } catch (err) {
    console.error("FCM token error:", err);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📬 Foreground message:", payload);
      resolve(payload);
    });
  });

export { messaging };

//firebase code with domain working code end //



//firebase code without domain working code start//

// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyB-HLjIoO4bqia8ndfXvMXkDMsd53Gx9Uk",
//   authDomain: "pushnotificationrazzmatazz.firebaseapp.com",
//   projectId: "pushnotificationrazzmatazz",
//   storageBucket: "pushnotificationrazzmatazz.firebasestorage.app",
//   messagingSenderId: "622773877166",
//   appId: "1:622773877166:web:d3ef5154b6e6ad6c9ef03f",
//   measurementId: "G-GTZYKTMC29",
// };

// const app = initializeApp(firebaseConfig);

// // Temporarily disable FCM
// export const messaging = null;

// export const requestFcmToken = async () => {
//   console.log("FCM disabled");
//   return null;
// };

// export const onMessageListener = () => {
//   console.log("FCM disabled");
//   return Promise.resolve(null);
// };

// export default app;

//firebase code without domain working code end //

