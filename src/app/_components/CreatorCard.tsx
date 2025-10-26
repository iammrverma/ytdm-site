export type CreatorCardType = {
  banner: string;
  profilePic: string;
  pitch: string;
  handle: string;
  subs: number;
  videos: number;
  name: string;
};

const CreatorCard = ({
  banner,
  profilePic,
  pitch,
  handle,
  subs,
  videos,
  name,
}: CreatorCardType) => {
  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden shadow-md @container/creator">
      {/* Banner */}
      <div className="w-full aspect-[16/9]">
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Info */}
      <div className="flex gap-3 pt-2 @sm/creator:items-center @sm/creator:gap-6">
        <img
          src={profilePic}
          alt={name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0 @sm/creator:w-16 @sm/creator:h-16"
        />
        <div className="flex flex-col justify-center">
          <p className="font-medium line-clamp-2 text-sm truncate text-nowrap @sm/creator:text-base @lg/creator:text-lg">
            {pitch}
          </p>
          <p className="text-gray-600 text-xs @sm/creator:text-sm">
            {name} · @{handle}
          </p>
          <p className="text-gray-500 text-xs @sm/creator:text-sm">
            {subs} subs · {videos} videos
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;