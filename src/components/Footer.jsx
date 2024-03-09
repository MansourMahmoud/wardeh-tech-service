import React from "react";
import visa from "../assets/visas/visa-svgrepo-com.svg";
import mastercard from "../assets/visas/mastercard-svgrepo-com.svg";
import discover from "../assets/visas/discover-3-svgrepo-com.svg";
import americanExpress from "../assets/visas/american-express-svgrepo-com.svg";

const Footer = () => {
  const images = [americanExpress, discover, mastercard, visa];
  return (
    <div className="px-2 dark-bg-900 dark-text flex flex-col gap-2 items-center justify-center flex-wrap text-center min-h-[25vh] bg-mainColors-main500 shadow-2xl shadow-gary-900">
      <p className="text-mainColors-main950">
        © 2023 Copyrights Wardeh Tech. All Rights Reserved
      </p>
      <div className="mb-5 sm:mb-0 flex gap-2 items-center flex-wrap justify-center">
        {images?.map((item, index) => (
          <div key={index}>
            <img src={item} width={30} height={30} alt="visa" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
