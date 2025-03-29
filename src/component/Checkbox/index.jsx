import React from "react";
import checkboxStyled from "./Checkbox.module.scss";

const Checkbox = ({ ...props }) => {
  const { value, placeholder, option, event } = props;

  return (
    <div className={checkboxStyled["selected"]}>
      <select
        className={checkboxStyled["select"]}
        value={value}
        onChange={event}
      >
        <option value="" disabled>{placeholder}</option>
        {option.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Checkbox;
