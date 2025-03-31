import React from "react";
import buttonStyled from "./Button.module.scss";

const Button = ({ ...props }) => {
  const { children, icon, background, event } = props;
  return (
    <button
      className={`${buttonStyled["btn"]} ${buttonStyled[background]}`}
      onClick={event}
    >
      {children}
      {icon && (
        <span className={buttonStyled["icon"]}>
          <img src={icon} />
        </span>
      )}
    </button>
  );
};

export default Button;
