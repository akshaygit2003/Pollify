import React from "react";
// import UI_ELEMENT from "../../assets/images/ui-element.png";
import CARD1 from "../../assets/images/auth-card-1.png";
import CARD2 from "../../assets/images/auth-card-2.png";
import CARD3 from "../../assets/images/auth-card-3.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Polling Website</h2>
        {children}
      </div>
      <div className="hidden md:block w-1/2 h-screen bg-primary bg-cover bg-no-repeat bg-center overflow-hidden relative">
        <img
          src={CARD1}
          alt="Background Image"
          className="w-64 lg:w-72 absolute top-[8%] left-[10%] shadow-lg shadow-blue-400/15"
        />
        <img
          src={CARD2}
          alt="Background Image"
          className="w-64 lg:w-72 absolute top-[30%] left-[54%] shadow-lg shadow-blue-400/15"
        />

        <img
          src={CARD3}
          alt="Background Image"
          className="w-64 lg:w-72 absolute top-[61%] left-[10%] shadow-lg shadow-blue-400/15"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
