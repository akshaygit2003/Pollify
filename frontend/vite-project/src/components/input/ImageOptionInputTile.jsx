import React from "react";

const ImageOptionInputTile = ({ isSelected, imgUrl, onSelect }) => {
  const getColors = () => {
    return isSelected ? "border-2 border-primary" : "border-transparent";
  };

  return (
    <button
      className={`w-full flex items-center justify-center bg-slate-200/40 mb-4 border rounded-md overflow-hidden ${getColors()}`}
      onClick={onSelect}
    >
      <img src={imgUrl} alt="Option" className="w-full h-36 object-contain" />
    </button>
  );
};

export default ImageOptionInputTile;
