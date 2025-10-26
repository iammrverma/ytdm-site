"use client";
import {
  YoutubeIcon,
  MailIcon,
  InstagramIcon,
  MessageCircleIcon,
} from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function CreatorProfile() {
  const { user, logout } = useAuth();
  const params = useParams();
  const slug = params?.slug as string;

  const creator = {
    name: user?.displayName ?? "Unknown Creator",
    handle: slug ?? "@handle",
    niche: "Tech",
    subscribers: "1k–10k",
    location: "India",
    bio: "Building the future of tech — one collab at a time. Open to podcast talks, crossovers, and all things creative.",
    openForCollab: true,
    collabTypes: ["Podcast", "Crossover Video", "Giveaway"],
    socials: {
      email: "creator@email.com",
      instagram: "@creator.ig",
      discord: "creator#1234",
      channel: "https://youtube.com/@creator",
    },
  };

  const isOwnChannel =
    user &&
    slug &&
    user.displayName?.toLowerCase().includes(slug.toLowerCase());

  return (
    <div className="relative min-h-screen bg-gradient-hero">
      {/* Banner */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop"
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            src={user?.photoURL ?? "https://i.pravatar.cc/150?img=50"}
            alt="profile"
            className="w-36 h-36 rounded-full border-4 border-card shadow-elegant object-cover"
            referrerPolicy="no-referrer"
          />

          <div className="flex-1 flex flex-col gap-3 text-center sm:text-left pb-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-1">
                {creator.name}
              </h1>
              <p className="text-muted-foreground">
                {creator.handle}
                <span className="text-muted-foreground/80 text-sm ml-2">
                  · {creator.subscribers} subscribers
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {creator.niche} · {creator.location}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {isOwnChannel ? (
                <>
                  <Button variant="gradient" size="lg" className="gap-2">
                    <YoutubeIcon className="w-4 h-4" />
                    Sync with YouTube
                  </Button>
                  <Button variant="hero" size="lg">
                    Customize Channel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="gradient" size="lg" className="gap-2">
                    Pitch for Collab 🚀
                  </Button>
                  <Button variant="hero" size="lg" onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8"
      >
        <div className="space-y-6">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card shadow-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-xl font-semibold mb-3 text-foreground">
              About
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {creator.bio}
            </p>
          </motion.div>
          {/* Collaboration Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card shadow-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Collaboration
            </h2>
            <div className="space-y-3">
              <Badge
                variant={creator.openForCollab ? "default" : "secondary"}
                className="w-full justify-center py-2 text-sm"
              >
                {creator.openForCollab ? "✅ Open for Collab" : "❌ Not Open"}
              </Badge>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Collab Types
                </p>
                <div className="flex flex-wrap gap-2">
                  {creator.collabTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card shadow-card rounded-2xl p-6 border border-border"
          >
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Connect
            </h2>
            <div className="space-y-3">
              <a
                href={creator.socials.channel}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <YoutubeIcon className="w-5 h-5 text-destructive" />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                  YouTube Channel
                </span>
              </a>

              {creator.socials.email && (
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <MailIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground truncate">
                    {creator.socials.email}
                  </span>
                </div>
              )}

              {creator.socials.instagram && (
                <a
                  href={`https://instagram.com/${creator.socials.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <InstagramIcon className="w-5 h-5 text-accent" />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                    {creator.socials.instagram}
                  </span>
                </a>
              )}

              {creator.socials.discord && (
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <MessageCircleIcon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    {creator.socials.discord}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
