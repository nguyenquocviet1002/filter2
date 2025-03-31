import { useState, useEffect } from "react";
import { list } from "./data/getList";
import { removeAccented, removeDuplicate } from "./utils/setup";
import List from "./component/List";
import Input from "./component/Input";
import Button from "./component/Button";
import Checkbox from "./component/Checkbox";
import IMAGES from "./Images/Images";
import "./App.css";

function App() {
  const initial = {
    title: "",
    year: "",
  };

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(initial);
  console.log("filter: ", filter);
  const [title, setTitle] = useState([]);
  const [year, setYear] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const DATA_ORIGINAL = list; // Assigning the original list to a constant

  useEffect(() => {
    setData(DATA_ORIGINAL);

    setTitle(DATA_ORIGINAL.map((item) => item.title));

    const years = DATA_ORIGINAL.map((item) => item.year);
    setYear(removeDuplicate(years));
  }, [DATA_ORIGINAL]);

  useEffect(() => {
    let dataNew = DATA_ORIGINAL.filter((item) =>
      removeAccented(item.title).includes(removeAccented(filter.title))
    );
    dataNew = dataNew.filter((item) =>
      removeAccented(item.year).includes(removeAccented(filter.year))
    );
    setData(dataNew);
  }, [filter.year, isSearch, DATA_ORIGINAL]);

  const handleChangeSearch = (value) => {
    setFilter((prev) => ({ ...prev, title: value }));
  };

  const handleChangeYear = (e) => {
    setFilter((prev) => ({ ...prev, year: e.target.value }));
  };

  const handleClickSearch = () => {
    setIsSearch(!isSearch);
  };

  const removeFilter = () => {
    setFilter(initial);
    setData(DATA_ORIGINAL);
  }

  return (
    <div className="filter_ksnb_1_0_0">
      <div className="container">
        <div className="filter_ksnb_1_0_0__center">
          <div className="filter_ksnb_1_0_0__aside">
            <div className="filter_ksnb_1_0_0__filter">
              <div className="filter_ksnb_1_0_0__search">
                <Input
                  placeholder="Nhập tiêu đề"
                  value={filter.title}
                  event={handleChangeSearch}
                  list={title}
                />
                <Button
                  icon={IMAGES.iconSearch}
                  background="search"
                  event={handleClickSearch}
                />
              </div>
              {
                <Checkbox
                  option={year}
                  placeholder="Năm phát hành"
                  value={filter.year}
                  event={handleChangeYear}
                />
              }
              {(filter.title || filter.year) && (
                <Button background="remove" event={removeFilter}>Xoá bộ lọc</Button>
              )}
            </div>
          </div>
          <div className="filter_ksnb_1_0_0__main">
            {data.length > 0 && <List data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
