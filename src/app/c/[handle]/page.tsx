"use client";
import {
  YoutubeIcon,
  MailIcon,
  InstagramIcon,
  MessageCircleIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
} from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCreatorBySlug, updateCreator } from "@/lib/firebaseConfig";

export default function CreatorProfile() {
  const { user, logout } = useAuth();
  const params = useParams();
  const slug = params?.handle as string;
  if (!slug) console.log("no slug found");
  const [creator, setCreator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingAbout, setEditingAbout] = useState(false);
  const [editingCollaboration, setEditingCollaboration] = useState(false);
  const [editingSocials, setEditingSocials] = useState(false);

  // Edit state values
  const [editBio, setEditBio] = useState("");
  const [editOpenForCollab, setEditOpenForCollab] = useState(false);
  const [editCollabTypes, setEditCollabTypes] = useState<string[]>([]);
  const [editCollabTypeInput, setEditCollabTypeInput] = useState("");
  const [editSocials, setEditSocials] = useState({
    email: "",
    instagram: "",
    discord: "",
    channel: "",
  });

  // const creator = {
  //   name: user?.displayName ?? "Unknown Creator",
  //   handle: slug ?? "@handle",
  //   niche: "Tech",
  //   subscribers: "1k–10k",
  //   location: "India",
  //   bio: "Building the future of tech — one collab at a time. Open to podcast talks, crossovers, and all things creative.",
  //   openForCollab: true,
  //   collabTypes: ["Podcast", "Crossover Video", "Giveaway"],
  //   socials: {
  //     email: "creator@email.com",
  //     instagram: "@creator.ig",
  //     discord: "creator#1234",
  //     channel: "https://youtube.com/@creator",
  //   },
  // };

  const isOwnChannel = creator && user?.uid === creator.id;

  // Fetch creator data from Firebase
  useEffect(() => {
    if (!slug) return;

    async function fetchCreator() {
      setLoading(true);
      const data = await getCreatorBySlug(slug);
      console.log(data);
      setCreator(data);
      setLoading(false);
    }

    fetchCreator();
  }, [slug]);

  useEffect(() => console.log(loading), [loading]);
  useEffect(() => console.log(creator), [creator]);

  // Initialize edit values when creator data loads
  useEffect(() => {
    if (creator) {
      setEditBio(creator.bio || "");
      setEditOpenForCollab(creator.openForCollab || false);
      setEditCollabTypes(creator.collabTypes || []);
      setEditSocials({
        email: creator.socials?.email || "",
        instagram: creator.socials?.instagram || "",
        discord: creator.socials?.discord || "",
        channel: creator.socials?.channel || "",
      });
    }
  }, [creator]);

  const handleSaveAbout = async () => {
    if (!creator) return;
    await updateCreator(creator.id, { bio: editBio });
    setCreator({ ...creator, bio: editBio });
    setEditingAbout(false);
  };

  const handleSaveCollaboration = async () => {
    if (!creator) return;
    await updateCreator(creator.id, {
      openForCollab: editOpenForCollab,
      collabTypes: editCollabTypes,
    });
    setCreator({
      ...creator,
      openForCollab: editOpenForCollab,
      collabTypes: editCollabTypes,
    });
    setEditingCollaboration(false);
  };

  const handleSaveSocials = async () => {
    if (!creator) return;
    await updateCreator(creator.id, { socials: editSocials });
    setCreator({ ...creator, socials: editSocials });
    setEditingSocials(false);
  };

  const addCollabType = () => {
    if (
      editCollabTypeInput.trim() &&
      !editCollabTypes.includes(editCollabTypeInput.trim())
    ) {
      setEditCollabTypes([...editCollabTypes, editCollabTypeInput.trim()]);
      setEditCollabTypeInput("");
    }
  };

  const removeCollabType = (type: string) => {
    setEditCollabTypes(editCollabTypes.filter((t) => t !== type));
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  if (!creator)
    return <p className="text-center mt-10 text-red-500">Creator not found.</p>;

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
                  {creator.subscribers} subscribers
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
                  <Button variant="hero" size="lg" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  {creator.openForCollab && (
                    <Button variant="gradient" size="lg" className="gap-2">
                      Pitch for Collab 🚀
                    </Button>
                  )}
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
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold text-foreground">About</h2>
              {isOwnChannel && (
                <button
                  onClick={() => {
                    if (editingAbout) {
                      setEditBio(creator.bio || "");
                      setEditingAbout(false);
                    } else {
                      setEditingAbout(true);
                    }
                  }}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                >
                  <PencilIcon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            {editingAbout ? (
              <div className="space-y-3">
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveAbout} size="sm" className="gap-2">
                    <CheckIcon className="w-4 h-4" />
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEditBio(creator.bio || "");
                      setEditingAbout(false);
                    }}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <XIcon className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                {creator.bio || "No bio yet."}
              </p>
            )}
          </motion.div>
          {/* Collaboration Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card shadow-card rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Collaboration
              </h2>
              {isOwnChannel && (
                <button
                  onClick={() => {
                    if (editingCollaboration) {
                      setEditOpenForCollab(creator.openForCollab || false);
                      setEditCollabTypes(creator.collabTypes || []);
                      setEditingCollaboration(false);
                    } else {
                      setEditingCollaboration(true);
                    }
                  }}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                >
                  <PencilIcon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            {editingCollaboration ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Open for Collaboration
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={editOpenForCollab}
                      onChange={(e) => setEditOpenForCollab(e.target.checked)}
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm text-muted-foreground">
                      {editOpenForCollab
                        ? "Open for collabs"
                        : "Not open for collabs"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Collab Types
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editCollabTypes.map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="text-xs flex items-center gap-1"
                      >
                        {type}
                        <button
                          onClick={() => removeCollabType(type)}
                          className="ml-1 hover:text-destructive"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editCollabTypeInput}
                      onChange={(e) => setEditCollabTypeInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCollabType();
                        }
                      }}
                      placeholder="Add collab type..."
                      className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <Button
                      onClick={addCollabType}
                      size="sm"
                      variant="secondary"
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSaveCollaboration}
                    size="sm"
                    className="gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEditOpenForCollab(creator.openForCollab || false);
                      setEditCollabTypes(creator.collabTypes || []);
                      setEditingCollaboration(false);
                    }}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <XIcon className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
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
                    {creator.collabTypes && creator.collabTypes.length > 0 ? (
                      creator.collabTypes.map((type: any) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="text-xs"
                        >
                          {type}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No collab types added yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card shadow-card rounded-2xl p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Connect</h2>
              {isOwnChannel && (
                <button
                  onClick={() => {
                    if (editingSocials) {
                      setEditSocials({
                        email: creator.socials?.email || "",
                        instagram: creator.socials?.instagram || "",
                        discord: creator.socials?.discord || "",
                        channel: creator.socials?.channel || "",
                      });
                      setEditingSocials(false);
                    } else {
                      setEditingSocials(true);
                    }
                  }}
                  className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                >
                  <PencilIcon className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            {editingSocials ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <YoutubeIcon className="w-4 h-4 text-destructive" />
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={editSocials.channel}
                    onChange={(e) =>
                      setEditSocials({
                        ...editSocials,
                        channel: e.target.value,
                      })
                    }
                    placeholder="https://youtube.com/@channel"
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MailIcon className="w-4 h-4 text-muted-foreground" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={editSocials.email}
                    onChange={(e) =>
                      setEditSocials({ ...editSocials, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4 text-accent" />
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={editSocials.instagram}
                    onChange={(e) =>
                      setEditSocials({
                        ...editSocials,
                        instagram: e.target.value,
                      })
                    }
                    placeholder="@username"
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageCircleIcon className="w-4 h-4 text-primary" />
                    Discord
                  </label>
                  <input
                    type="text"
                    value={editSocials.discord}
                    onChange={(e) =>
                      setEditSocials({
                        ...editSocials,
                        discord: e.target.value,
                      })
                    }
                    placeholder="username#1234"
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSaveSocials}
                    size="sm"
                    className="gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setEditSocials({
                        email: creator.socials?.email || "",
                        instagram: creator.socials?.instagram || "",
                        discord: creator.socials?.discord || "",
                        channel: creator.socials?.channel || "",
                      });
                      setEditingSocials(false);
                    }}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <XIcon className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {creator.socials?.channel && (
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
                )}

                {creator.socials?.email && (
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                    <MailIcon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-foreground truncate">
                      {creator.socials.email}
                    </span>
                  </div>
                )}

                {creator.socials?.instagram && (
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

                {creator.socials?.discord && (
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                    <MessageCircleIcon className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">
                      {creator.socials.discord}
                    </span>
                  </div>
                )}

                {!creator.socials?.channel &&
                  !creator.socials?.email &&
                  !creator.socials?.instagram &&
                  !creator.socials?.discord && (
                    <p className="text-sm text-muted-foreground">
                      No social links added yet.
                    </p>
                  )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
