"use client";

import { auth, provider } from "@/lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const REDIRECT_ON_LOGIN_URL = "/";
export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace(REDIRECT_ON_LOGIN_URL);
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading || user) return null; // Prevent flash of login page

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 p-10 shadow-lg">
        {/* Logo + Tagline */}
        <h1 className="text-4xl font-extrabold text-red-600">YTDM</h1>
        <p className="mt-2 text-gray-600">Collaboration made easy...</p>

        {/* Divider */}
        <div className="my-6 h-[1px] w-full bg-gray-200" />

        {/* Google Sign-in Button */}
        <button
          onClick={handleLogin}
          className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow hover:bg-gray-100"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
