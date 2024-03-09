import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineLaptop,
} from "react-icons/md";

const IconDarkMode = ({ openMenu, setOpenMenu, setIsDarkModeActive }) => {
  // list for menu items
  const menuItems = [
    {
      title: "Light",
      icon: <MdOutlineLightMode />,
    },
    {
      title: "Dark",
      icon: <MdOutlineDarkMode />,
    },
    {
      title: "System",
      icon: <MdOutlineLaptop />,
    },
  ];

  // handle localStorage
  const handleDarkMode = (title) => {
    if (title === "Light") {
      localStorage.theme = "light";
      setIsDarkModeActive(false);
    } else if (title === "Dark") {
      localStorage.theme = "dark";
      setIsDarkModeActive(true);
    } else {
      localStorage.removeItem("theme");
      setIsDarkModeActive(false);
    }
  };

  // Supporting system preference and manual selection
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    setIsDarkModeActive(true);
  } else {
    document.documentElement.classList.remove("dark");
    setIsDarkModeActive(false);
  }

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      {/* Return the item to be seen on the page in Navbar */}
      {localStorage.theme === "light" ? (
        <MenuHandler>
          <Button
            variant="text"
            className="text-mainColors-main700 flex items-center text-base font-normal duration-200 transition-all gap-2"
          >
            <span className="text-2xl text-darkMode-dark50">
              <MdOutlineLightMode />
            </span>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform hidden lg:block text-darkMode-dark50 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      ) : localStorage.theme === "dark" ? (
        <MenuHandler>
          <Button
            variant="text"
            className="dark-text flex items-center text-base font-normal duration-200 transition-all gap-2"
          >
            <span className="text-2xl text-darkMode-dark50">
              <MdOutlineDarkMode />
            </span>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform hidden lg:block text-darkMode-dark50 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      ) : (
        <MenuHandler>
          <Button
            variant="text"
            className="dark-text text-mainColors-main700 flex items-center text-base font-normal duration-200 transition-all gap-2"
          >
            <span className="text-2xl text-darkMode-dark50">
              <MdOutlineLaptop />
            </span>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform hidden lg:block text-darkMode-dark50 ${
                openMenu ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
      )}
      {/* Drop-down menu at hover on MenuHandler */}
      <MenuList className="w-fit grid grid-cols-1 gap-3 overflow-visible dark:bg-darkMode-dark300 dark:text-darkMode-dark700 bg-mainColors-main500 text-darkMode-dark50 outline-none border-none z-50">
        <ul className="col-span-4 flex w-full flex-col gap-1 outline-none border-none">
          {menuItems.map(({ title, icon }) => (
            <MenuItem
              key={title}
              className="flex group items-center gap-x-2 border-b-[1px] border-b-darkbg-whiteColor"
              onClick={() => handleDarkMode(title)}
            >
              <Typography
                variant="h6"
                className="mb-1 text-2xl duration-75 transition-colors"
              >
                {icon}
              </Typography>
              <Typography
                variant="h6"
                className="mb-1 duration-75 transition-colors"
              >
                {title}
              </Typography>
            </MenuItem>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
};

export default IconDarkMode;
