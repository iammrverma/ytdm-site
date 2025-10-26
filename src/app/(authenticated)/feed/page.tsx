"use client";
import { useState } from "react";
import { dummyCreators } from "@/app/lib/dummyCreators";
import CreatorCard from "@/app/_components/CreatorCard";

export default function CreatorFeed() {
  const [search, setSearch] = useState("");
  const tags = [
    "All",
    "Tech",
    "Gaming",
    "Music",
    "Comedy",
    "Education",
    "Sports",
    "News",
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      {/* Search */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Search creators"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Tags */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tags.map((tag) => (
          <button
            key={tag}
            className="whitespace-nowrap rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {dummyCreators
          .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
          .map((creator, indx) => (
            <CreatorCard key={creator.handle + indx} {...creator} />
          ))}
      </div>
    </div>
  );
}
