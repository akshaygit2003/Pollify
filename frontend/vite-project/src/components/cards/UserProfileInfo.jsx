import React from "react";
import moment from "moment"; // Added the missing import for moment
import CharAvatar from "./CharAvatar";

const UserProfileInfo = ({ imgUrl, fullname, username, createdAt }) => {
  return (
    <div className="flex items-center gap-4">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={fullname}
          className="w-10 h-10 rounded-full border-none"
        />
      ) : (
        <CharAvatar fullName={fullname} style="text-[13px]" />
      )}
      <div>
        <p className="text-sm text-black font-medium leading-4">
          {fullname} <span className="mx-1 text-gray-500 text-sm">•</span>
          <span className="text-gray-500  mx-1 text-[10px]">
            {" "}
            {createdAt && moment(createdAt).fromNow()}
          </span>
        </p>
        <span className="text-slate-500 text-sm  leading-4">@{username}</span>
      </div>
    </div>
  );
};

export default UserProfileInfo;
