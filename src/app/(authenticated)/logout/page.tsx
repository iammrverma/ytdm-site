"use client";
import { useAuth } from "@/app/contexts/AuthContext";


export default function Logout() {
  const { logout } = useAuth();
  logout();
  return null;
}
