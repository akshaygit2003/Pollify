import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SideMenu = ({ activeMenu }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        handleLogout();
      }
      return;
    }

    // Navigate to the selected route (if it's not logout)
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-slate-50/50 border border-slate-100/70 p-5 sticky top-[61px] z-20">
      {SIDE_MENU_DATA.map((item, index) => (
        <div
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] 
                        ${
                          activeMenu === item.label
                            ? "text-white bg-primary"
                            : ""
                        } 
                        py-4 px-6 rounded-full mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
