import React, { useState } from "react";
import { IoFilterOutline, IoCloseOutline } from "react-icons/io5";
import { POLL_TYPE } from "../../utils/data";

const HeaderWithFilter = ({ title, filterType, setFilterType }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="sm:text-xl font-medium text-black">{title}</h2>
        <button
          onClick={() => {
            if (filterType !== "") setFilterType("");
            setOpen(!open);
          }}
          className={`flex items-center gap-3 text-sm text-white bg-primary px-4 py-3
        ${open ? "rounded-t-lg" : "rounded-lg"}`}
        >
          {filterType !== "" ? (
            <>
              <IoCloseOutline className="text-lg" />
              <span>Clear</span>
            </>
          ) : (
            <>
              <IoFilterOutline className="text-lg" />
              <span>Filter</span>
            </>
          )}
        </button>
      </div>
      {open && (
        <div className="flex gap-4 flex-wrap p-4 bg-primary rounded-l-lg rounded-b-lg">
          {[{ label: "All", value: "" }, ...POLL_TYPE].map((type) => (
            <button
              key={type.value}
              className={`text-[12px] px-4 py-1 rounded-lg text-nowrap ${
                filterType === type.value
                  ? "text-white bg-sky-900"
                  : "text-[13px] bg-sky-100"
              }`}
              onClick={() => setFilterType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderWithFilter;
