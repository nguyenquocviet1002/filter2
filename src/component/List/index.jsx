import { useState } from "react";
import Item from "../Item";
import listStyled from "./List.module.scss";

const List = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  const itemsPerPage = 10;
  const pageNumberLimit = 5;
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const displayData = (data) => {
    return data.length > 0 ? (
      data.map((item) => {
        return <Item data={item} key={item.id} />;
      })
    ) : (
      <div>Không có kết quả</div>
    );
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const renderPageNumbers = pages.map((number) => {
    if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={`${listStyled["control"]} ${
            currentPage === number ? listStyled["active"] : ""
          }`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <>
      {displayData(pageItems)}
      {data.length > itemsPerPage && (
        <ul className={listStyled["pagination"]}>
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === 1 ? true : false}
              className={`${listStyled["control"]} ${listStyled["back"]}`}
            >
              Prev
            </button>
          </li>

          {renderPageNumbers}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages.length ? true : false}
              className={`${listStyled["control"]} ${listStyled["next"]}`}
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default List;
