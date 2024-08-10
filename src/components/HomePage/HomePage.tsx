"use client";

import { auth, provider } from "../../../utils/firebaseConfig";
import { signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleGoogleLogout = async () => {
    try {
      const result = await signOut(auth);
      router.push("/"); // Redirige a la página de inicio o donde desees
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <button type="button" onClick={handleGoogleLogout}>
      Salir
    </button>
  );
}
