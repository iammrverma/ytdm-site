import { CreatorCardType } from "../_components/CreatorCard";


export const dummyCreators: CreatorCardType[] = Array.from({ length: 25 }).map(
  (_, i) => {
    const names = [
      "Raj Verma",
      "Anya Singh",
      "Kunal Joshi",
      "Sneha Roy",
      "Vikram Mehta",
      "Diya Kapoor",
      "Aman Gill",
      "Riya Sharma",
      "Tanmay Desai",
      "Isha Patel",
    ];
    const handles = [
      "iammrverma",
      "anyacodes",
      "kunal_js",
      "sneha.dev",
      "vik.dev",
      "diyak",
      "amang",
      "riyash",
      "tanmay.codes",
      "ishap",
    ];
    const pitches = [
      "Wanna collab on Gaming and Live Streaming",
      "Up for Collab ???",
      "Looking for creators to join my tech series",
      "Let’s create something cool together!",
      "Open for collab on fashion & lifestyle",
      "Building a new podcast – need guests!",
      "Wanna cross-promote channels?",
      "Collab idea: React tutorials + design tips?",
      "Travel vlog collab? Hit me up!",
      "Open to short-form collabs this month",
      "Let's make a creator spotlight video!",
      "Need a duo for a funny skit – up for it?",
      "Join me in a trending challenge?",
      "Open to editing swap or roast collab",
      "Let’s grow together 💥 Open for ideas!",
    ];

    const randomIndex = i % names.length;

    return {
      banner: `https://picsum.photos/seed/banner${i}/500/200`, // random banner
      profilePic: `https://i.pravatar.cc/150?img=${i + 1}`, // profile placeholder
      handle: handles[randomIndex],
      pitch: pitches[randomIndex],
      name: names[randomIndex],
      subs: Math.ceil(Math.random() * 900 + 100), // 1k–100k subs
      videos: Math.ceil(Math.random() * 90 + 10), // 10–100 videos
    };
  }
);
