// src/app/login/page.tsx
"use client";

import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

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
          onClick={() => signIn("google")}
          className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow hover:bg-gray-100"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
