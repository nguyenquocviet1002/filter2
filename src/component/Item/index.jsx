import { useState } from "react";
import Label from "../Label";
import itemStyled from "./Item.module.scss";

const Item = ({ data }) => {
  const [isDropdown, setIsDropdown] = useState(false);

  const { title, year, revenue, genre } = data;

  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <div className={itemStyled["item"]}>
      <div>
        <Label label="Tiêu đề: " value={title} />
        {isDropdown && (
          <>
            <Label label="Năm phát hành: " value={year} />
            <Label label="Tổng doanh thu: " value={revenue} />
            <Label label="Thể loại: " value={genre} />
          </>
        )}
      </div>
      <div className={itemStyled["btn"]} onClick={handleDropdown}>
        {isDropdown ? "Thu gọn" : "Chi tiết"}
      </div>
    </div>
  );
};

export default Item;
