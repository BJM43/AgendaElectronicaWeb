"use client";

import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";
import { auth, provider } from "../../../utils/firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  pass: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const handleEmailAndPasswordLogin = async (data: FormValues) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.pass
      );
      setUser(result.user);
      router.push("/home-page"); // Redirige a la página de inicio o donde desees
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null); // Usa el tipo User importado

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push("/home-page"); // Redirige a la página de inicio o donde desees
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/home-page"); // Redirige si el usuario ya está autenticado
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-96">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 to-blue-200 rounded-lg transform rotate-[-10deg] z-0"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg relative z-10">
          <h2 className="text-2xl font-bold mb-6 font-sans text-black">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit(handleEmailAndPasswordLogin)}>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                {...register("email")}
                className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 sm:text-sm font-sans text-black"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                {...register("pass")}
                className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 sm:text-sm font-sans text-black"
                placeholder="Contraseña"
                required
              />
            </div>
            <button
              //onClick={handleEmailAndPasswordLogin}
              type="submit"
              className="bg-gradient-to-b from-blue-500 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 mb-4 font-sans"
            >
              Submit
            </button>
            <span className="inline-block w-4"></span>{" "}
            {/* Gap between buttons */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded flex items-center font-sans mt-4"
            >
              <img
                className="w-6 h-6 mr-2"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="Google logo"
              />
              Continuar con Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
