import { useSession } from "next-auth/react";
import { useStore } from "../store";
import { api } from "../utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setUser } = useStore();

  if (status === "authenticated") {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Fitness Tracker
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Track your fitness goals, stay motivated, and connect with others.
      </p>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </div>
  );
}