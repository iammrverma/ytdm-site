"use client";

import { useState } from "react";
import CreatorCard from "@/app/_components/CreatorCard";
import { dummyCreators } from "@/app/lib/dummyCreators";
import { useParams } from "next/navigation";

// Fake logged-in user (later replace with NextAuth or your auth provider)
const currentUser = {
  handle: "techguru", // e.g. from session.user.handle
};

export default function CreatorProfile() {
  const params = useParams();
  const slug = params?.slug as string; // URL: /channel/[slug]
  
  // ✅ dynamic check: if visiting own channel
  const isOwnChannel = currentUser?.handle === slug;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Banner */}
      <img
        src="https://picsum.photos/seed/bannerProfile/1200/300"
        alt="banner"
        className="w-full h-64 object-cover rounded-xl"
      />

      {/* Avatar + Info */}
      <div className="flex flex-wrap items-center pr-4 gap-6 w-full">
        <img
          src="https://i.pravatar.cc/150?img=50"
          alt="profile"
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Tech Guru</h1>
          <p>
            {slug ?? "@handle"}
            <span className="text-gray-500 text-sm">
              · 120K subs · 240 videos
            </span>
          </p>
          {/* Action Buttons */}
          <div className="flex gap-2">
            {isOwnChannel ? (
              <>
                <button className="px-4 py-2 rounded-full bg-red-200/10 cursor-pointer hover:bg-red-100/10">
                  Sync With Youtube
                </button>
                <button className="px-4 py-2 rounded-full bg-red-200/10 cursor-pointer hover:bg-red-100/10">
                  Customize Channel
                </button>
              </>
            ) : (
              <>
                <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-red-600">
                  Pitch For Collab
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Bio / Pitch */}
        <p className="text-sm text-gray-700">
          Building the future of tech. Join me in tech collabs, tutorials, and
          projects. Open for collaborations and exciting partnerships!
        </p>

        {/* Featured Videos */}
        <h2 className="text-lg font-semibold">Featured Videos</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyCreators.slice(0, 6).map((creator) => (
            <CreatorCard key={creator.handle} {...creator} />
          ))}
        </div>
      </div>
    </div>
  );
}
