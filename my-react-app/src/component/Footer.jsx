import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="w-full py-4 bg-white text-center text-sm text-gray-600 mt-auto shadow-inner">
        &copy; {new Date().getFullYear()} CloudBalance. All rights reserved.
      </footer>
    </>
  );
};

export default Footer;
