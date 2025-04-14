import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // <-- 🔥 Add this line

const firebaseConfig = {
  apiKey: "AIzaSyB-VoiWzcxsrVvwAZGwd52FzI1cxgh7Khs",
  authDomain: "job-portal-7436d.firebaseapp.com",
  projectId: "job-portal-7436d",
  storageBucket: "job-portal-7436d.firebasestorage.app",
  messagingSenderId: "653472724246",
  appId: "1:653472724246:web:56d42e30fbea6aa02f0c37",
  measurementId: "G-C653JBMJ54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // <-- 🔥 Add this

export { db };  // <-- 🔥 Export Firestore for use in other files
