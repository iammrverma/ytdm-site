"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import { useParams } from "next/navigation";
import { dummyCreators } from "@/app/lib/dummyCreators";
import CreatorCard from "@/app/_components/CreatorCard";
import { motion } from "framer-motion";

export default function CreatorProfile() {
  const { user, logout } = useAuth();
  const params = useParams();
  const slug = params?.slug as string;

  // Mock creator data (replace later with Firestore)
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
    user && slug && user.displayName?.toLowerCase().includes(slug.toLowerCase());

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Banner */}
      <div className="relative w-full h-72 overflow-hidden rounded-b-2xl">
        <img
          src="https://picsum.photos/seed/bannerProfile/1200/400"
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto -mt-20 relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 p-6"
      >
        <img
          src={user?.photoURL ?? "https://i.pravatar.cc/150?img=50"}
          alt="profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          referrerPolicy="no-referrer"
        />

        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{creator.name}</h1>
          <p className="text-gray-900">
            {creator.handle}
            <span className="text-gray-900 text-sm">
              {" "}
              · {creator.subscribers} subs
            </span>
          </p>
          <p className="text-sm text-gray-600 italic">
            {creator.niche} · {creator.location}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-2">
            {isOwnChannel ? (
              <>
                <button className="px-4 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 text-sm shadow-md">
                  Sync with YouTube
                </button>
                <button className="px-4 py-2 rounded-full border border-gray-400 hover:bg-gray-100 text-sm">
                  Customize Channel
                </button>
              </>
            ) : (
              <>
                <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:scale-105 transition">
                  Pitch for Collab 🚀
                </button>
                <button
                  onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 mt-8 space-y-10"
      >
        {/* About Section */}
        <section className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">About</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{creator.bio}</p>
        </section>

        {/* Collaboration Info */}
        <section className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Collaboration Info</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <span
              className={`px-3 py-1 rounded-full ${
                creator.openForCollab
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {creator.openForCollab ? "✅ Open for Collab" : "❌ Not Open"}
            </span>

            {creator.collabTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700"
              >
                {type}
              </span>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Connect</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              📺{" "}
              <a
                href={creator.socials.channel}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                YouTube Channel
              </a>
            </li>
            {creator.socials.email && <li>📧 {creator.socials.email}</li>}
            {creator.socials.instagram && (
              <li>
                📸{" "}
                <a
                  href={`https://instagram.com/${creator.socials.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  className="text-pink-600 hover:underline"
                >
                  {creator.socials.instagram}
                </a>
              </li>
            )}
            {creator.socials.discord && (
              <li>💬 Discord: {creator.socials.discord}</li>
            )}
          </ul>
        </section>

        {/* Featured Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Featured Videos</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dummyCreators.slice(0, 6).map((creator) => (
              <motion.div
                key={creator.handle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <CreatorCard {...creator} />
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* Background Accent */}
      <div className="absolute top-40 left-0 w-full h-96 bg-gradient-to-t from-red-50 via-transparent to-transparent -z-10"></div>
    </div>
  );
}
