import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center gap-5 border-b border-white-100 bg-slate-50/50 backdrop-blur-[2px] p-4 sticky top-0 z-20">
      {/* Menu Toggle Button for Mobile */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* App Title */}
      <h2 className="text-lg font-medium text-black">Polling Website</h2>

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div className="fixed top-[61px] left-0 w-full h-screen bg-white shadow-lg z-50">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
