

//firebase code with  domain working code start //


import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebaseConfig";

export default function GetFcmToken() {
  useEffect(() => {
    const initFCM = async () => {
      try {
        console.log("🔄 Registering Service Worker...");

        // 1️⃣ Register service worker
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("✅ Service Worker Registered:", registration);

        // 2️⃣ Ask notification permission
        const permission = await Notification.requestPermission();
        console.log("📌 Permission:", permission);

        if (permission !== "granted") {
          console.warn("❌ Notification permission denied by user");
          return;
        }

        // 3️⃣ Get FCM Token
        console.log("🔄 Getting FCM Token...");
        const token = await getToken(messaging, {
          vapidKey:
            "BBQQmlldlGlgReCfvtivjs0mbbw0cU9wsDu44CCMISj9ddCBibfd8byKS8GfJsdDO5oicRUG5z_lO-i5JZHBsPU",

          serviceWorkerRegistration: registration, // ✔ REQUIRED
        });

        if (token) {
          console.log("🔥 FCM Token Generated:", token);
          localStorage.setItem("fcmToken", token);
        } else {
          console.log("⚠️ No FCM token received");
        }
      } catch (error) {
        console.error("❌ Error initializing FCM:", error);
      }
    };

    initFCM();

    // 4️⃣ Receive foreground messages
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground Notification:", payload);

      if (payload?.notification) {
        alert(`${payload.notification.title}\n${payload.notification.body}`);
      }
    });
  }, []);

  return null;
}

//firebase code with  domain working code end //


//firebase code without domain working code start//

// import { useEffect } from "react";
// import { getToken, onMessage } from "firebase/messaging";
// import { messaging } from "./firebaseConfig";

// export default function GetFcmToken() {
//   useEffect(() => {
//     const initFCM = async () => {
//       try {
//         // Skip FCM on HTTP
//         if (!window.isSecureContext) {
//           console.log("❌ FCM disabled - HTTPS required");
//           return;
//         }

//         // Skip if messaging is not available
//         if (!messaging) {
//           console.log("❌ Firebase Messaging not available");
//           return;
//         }

//         console.log("🔄 Registering Service Worker...");

//         const registration = await navigator.serviceWorker.register(
//           "/firebase-messaging-sw.js"
//         );

//         console.log("✅ Service Worker Registered:", registration);

//         const permission = await Notification.requestPermission();
//         console.log("📌 Permission:", permission);

//         if (permission !== "granted") {
//           console.warn("❌ Notification permission denied by user");
//           return;
//         }

//         console.log("🔄 Getting FCM Token...");

//         const token = await getToken(messaging, {
//           vapidKey:
//             "BBQQmlldlGlgReCfvtivjs0mbbw0cU9wsDu44CCMISj9ddCBibfd8byKS8GfJsdDO5oicRUG5z_lO-i5JZHBsPU",
//           serviceWorkerRegistration: registration,
//         });

//         if (token) {
//           console.log("🔥 FCM Token Generated:", token);
//           localStorage.setItem("fcmToken", token);
//         } else {
//           console.log("⚠️ No FCM token received");
//         }
//       } catch (error) {
//         console.error("❌ Error initializing FCM:", error);
//       }
//     };

//     initFCM();

//     if (messaging) {
//       onMessage(messaging, (payload) => {
//         console.log("📩 Foreground Notification:", payload);

//         if (payload?.notification) {
//           alert(
//             `${payload.notification.title}\n${payload.notification.body}`
//           );
//         }
//       });
//     }
//   }, []);

//   return null;
// }


//firebase code without domain working code end //