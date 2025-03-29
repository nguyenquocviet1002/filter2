import React, { useRef, useState, useEffect, useMemo } from "react";
import inputStyled from "./Input.module.scss";
import { removeAccented } from "../../utils/setup";

const Input = ({ ...props }) => {
  const { placeholder, value, event, list } = props;

  const [isDropdown, setIsDropdown] = useState(false);

  const refDoctor = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (refDoctor.current && !refDoctor.current.contains(event.target)) {
        setIsDropdown(false);
      } else {
        return;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refDoctor]);

  const setList = useMemo(() => {
    const newList = list.filter(item => removeAccented(item).includes(removeAccented(value)));
    return newList.slice(0, 5);
  }, [value, list])

  return (
    <div className={inputStyled["wrapper"]} ref={refDoctor}>
      <input
        type="text"
        className={inputStyled["input"]}
        placeholder={placeholder}
        onChange={(e) => event(e.target.value)}
        value={value}
        onFocus={() => setIsDropdown(true)}
      />
      {isDropdown && (
        <div className={inputStyled["dropdown"]}>
          {setList
            .map((item) => (
              <div
                className={inputStyled["item"]}
                key={item}
                onClick={() => {
                  event(item);
                  setIsDropdown(false);
                }}
              >
                {item}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Input;
