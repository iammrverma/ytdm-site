"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [userSlug, setUserSlug] = useState<string | null>(null);

  // Fetch user's slug to link to their profile
  useEffect(() => {
    if (user?.uid) {
      async function fetchUserSlug() {
        try {
          const creatorRef = doc(db, "creators", user?.uid ?? "");
          const docSnap = await getDoc(creatorRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserSlug(data.slug || null);
          }
        } catch (error) {
          console.error("Error fetching user slug:", error);
        }
      }
      fetchUserSlug();
    } else {
      setUserSlug(null);
    }
  }, [user]);

  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/",
      show: true,
    },
    {
      label: "Feed",
      icon: Search,
      path: "/feed",
      show: true,
    },
    {
      label: "Profile",
      icon: User,
      path: userSlug ? `/c/${userSlug}` : "#",
      show: !!user,
      disabled: !userSlug,
    },
    {
      label: "Logout",
      icon: LogOut,
      path: "/logout",
      show: !!user,
      action: logout,
    },
    {
      label: "Login",
      icon: User,
      path: "/login",
      show: !user,
      action: () => router.push("/login"),
    },
  ].filter((item) => item.show);

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.disabled) return;
    if (item.action) {
      item.action();
    } else if (item.path !== "#") {
      router.push(item.path);
    }
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => router.push("/")}
                className="text-2xl font-extrabold text-primary hover:opacity-80 transition-opacity"
              >
                YTDM
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    disabled={item.disabled}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                      ${
                        item.disabled
                          ? "opacity-50 cursor-not-allowed"
                          : active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                disabled={item.disabled}
                className={`
                  flex flex-col items-center justify-center gap-1 flex-1 h-full
                  transition-colors relative
                  ${
                    item.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : active
                      ? "text-primary"
                      : "text-muted-foreground active:text-primary"
                  }
                `}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
                {active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer for desktop nav - at top */}
      <div className="hidden md:block h-16" />
    </>
  );
}
