import React, { useEffect, useState } from "react";
import { Navbar, Button, IconButton, Collapse } from "@material-tailwind/react";
import { navListItem } from "../utils/navListItem";
import { Link } from "react-router-dom";
import IconDarkMode from "../components/IconDarkMode";
import { websiteLogo } from "../utils/logo";

const Header = ({ setIsDarkModeActive }) => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  //   content list
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0  lg:flex-row lg:items-center lg:gap-2 xl:gap-4">
      {navListItem?.map((item, index) => (
        <Link key={index} to={item.goTo} className="flex items-center">
          <Button
            variant="text"
            className="font-normal dark-text text-base dark-style-hover text-mainColors-main50 hover:bg-darkMode-dark100 hover:text-darkMode-dark950 duration-200 p-2"
            onClick={() => setOpenNav(false)}
          >
            {item.name}
          </Button>
        </Link>
      ))}
    </ul>
  );

  return (
    <div className="bg-darkMode-dark900 sticky top-0 z-50">
      <Navbar className="dark:bg-darkMode-dark900 bg-mainColors-main500 border-mainColors-main500  h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 dark:border-darkMode-dark950 dark:outline-darkMode-dark950">
        <div className="flex items-center justify-between text-blue-gray-900">
          <a
            target="_blank"
            href="https://wardeh-tech.com/en/home"
            className="mr-4 cursor-pointer hover:scale-105 hover:shadow-sm p-2 hover:rounded-full hover:shadow-white duration-300 transition-all ease-in-out "
          >
            <img
              src={websiteLogo}
              className="rounded object-contain"
              alt="logo"
              width={105}
              height={105}
            />
          </a>
          <div className="flex items-center justify-between lg:gap-0 lg:w-full">
            <div className="flex items-center">
              <div className="mr-4 hidden lg:block">{navList}</div>
              {/* Component Icon Dark Mode */}
              <IconDarkMode
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                setIsDarkModeActive={setIsDarkModeActive}
              />
            </div>

            <IconButton
              variant="text"
              className="dark-text ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6 text-darkMode-dark50"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-darkMode-dark50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>

        {/* mobile */}
        <Collapse
          className={`${openNav === true && "mt-5"} duration-150`}
          open={openNav}
        >
          {navList}
        </Collapse>
        {/* end */}
      </Navbar>
    </div>
  );
};

export default Header;
