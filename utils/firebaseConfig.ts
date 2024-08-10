import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Importa getAnalytics solo si estás utilizando Firebase Analytics
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHh2p3a64gi9uXA1CqOaIOlRDnkh61R_o",
  authDomain: "electronic-agenda-8770a.firebaseapp.com",
  projectId: "electronic-agenda-8770a",
  storageBucket: "electronic-agenda-8770a.appspot.com",
  messagingSenderId: "992736434450",
  appId: "1:992736434450:web:4c10d92717f757132dfbcb",
  measurementId: "G-XRCRQVTY8D",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Firebase Analytics si lo necesitas
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
