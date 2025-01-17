import React from "react";

const Button = ({ styles, onClick, children, type = "button" }) => (
  <button
    type={type}
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
