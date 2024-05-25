import { useState } from "react";
import journal_cover from "../assets/journal_cover.png";

useState;
export default function JournalCard({
  author,
  title,
  abstract,
  study_program,
  timestamp,
}) {
  const [isTruncate, setIsTruncate] = useState(true);

  const onClick = () => {
    setIsTruncate(!isTruncate);
  };

  const abstractClass = () => {
    return isTruncate == true
      ? "font-light line-clamp-6 text-justify"
      : "font-light line-clamp-none text-justify";
  };

  return (
    <>
      <div className="pb-8 pt-4">
        <div className="flex items-end gap-x-2">
          <p className="font-light text-base">{author}</p>
          <p className="text-gray-400 text-sm">{timestamp}</p>
        </div>
        <div className="flex items-stretch">
          {/* journal description */}
          <div className="flex flex-col mx-auto gap-y-1 basis-4/5">
            <p className="font-black text-xl text-justify">{title}</p>
            <p className={abstractClass()}>{abstract}</p>
            <div className="flex">
              <button onClick={onClick} className="text-sm text-gray-400">
                {isTruncate == true ? "Read More" : "Hide"}
              </button>
            </div>
          </div>
          {/* image */}
          <div className="flex flex-col items-center basis-1/5">
            <div className=" w-40 h-64">
              <img
                // src="https://source.unsplash.com/random/350x500"
                src={journal_cover}
                className="object-cover w-full h-full rounded-md border"
                alt="Journal Image"
              />
            </div>
          </div>
        </div>
        {/* study program tag and action */}
        <div className="mt-5">
          <span className="p-2 rounded-md text-sm font-semibold bg-gray-200">
            {study_program}
          </span>
        </div>
      </div>
    </>
  );
}
