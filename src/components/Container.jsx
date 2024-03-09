import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className} container mx-auto px-4 xl:px-0 py-10`}>
      {children}
    </div>
  );
};

export default Container;
