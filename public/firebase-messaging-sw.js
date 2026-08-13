importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyB-HLjIoO4bqia8ndfXvMXkDMsd53Gx9Uk",
  authDomain: "pushnotificationrazzmatazz.firebaseapp.com",
  projectId: "pushnotificationrazzmatazz",
  storageBucket: "pushnotificationrazzmatazz.firebasestorage.app",
  messagingSenderId: "622773877166",
  appId: "1:622773877166:web:d3ef5154b6e6ad6c9ef03f",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 FCM Background Message:", payload);

  const title = payload.notification?.title || "FCM Notification";
  const body = payload.notification?.body || "You have a message";

  self.registration.showNotification(title, {
    body,
    icon: "/logo192.png",
  });
});

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();
  console.log("📨 PUSH EVENT:", data);

  const title =
    data.notification?.title ||
    data.title ||
    "New Notification";

  const body =
    data.notification?.body ||
    data.body ||
    "You have an update";

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/logo192.png",
      badge: "/logo192.png",
    })
  );
});
