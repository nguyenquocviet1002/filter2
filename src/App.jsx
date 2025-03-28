import { useEffect, useState } from "react";
import { list } from "./data/getList";
import { removeDuplicate, removeAccented } from "./utils/setup";
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
    genre: "",
  };

  const [dataOriginal, setDataOriginal] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(initial);
  const [isSearch, setIsSearch] = useState(false);
  const [year, setYear] = useState([]);
  console.log("year: ", year);
  const [genres, setGenres] = useState([]);
  console.log("genres: ", genres);

  useEffect(() => {
    setDataOriginal(list);
    setData(list);

    const allYear = list.map((item) => {
      return item.year;
    });
    setYear(removeDuplicate(allYear));

    const allGenres = [];
    list.forEach((item) => {
      allGenres.push(...item.genre);
    });
    const newAllGenres = removeDuplicate(allGenres);
    setGenres(newAllGenres);
  }, []);

  useEffect(() => {
    if (dataOriginal.length > 0) {
      let dataNew = [];
      dataNew = dataOriginal.filter((item) => {
        return item.year.includes(filter.year);
      });

      dataNew = dataNew.filter((item) => {
        return item.genre.includes(filter.genre);
      });

      dataNew = dataNew.filter((item) => {
        return item.title.includes(filter.title);
      });
      
      setData(dataNew);
    }
  }, [filter.year, filter.genre, isSearch]);

 

  const handleSearch = () => {
    setIsSearch(!isSearch);
  };

  const handleSelect1 = (e) => {
    setFilter((prev) => ({ ...prev, nhom_loi: e.target.value }));
  };

  return (
    <div className="filter_ksnb_1_0_0">
      <div className="container">
        <div className="filter_ksnb_1_0_0__center">
          <div className="filter_ksnb_1_0_0__aside">
            <div className="filter_ksnb_1_0_0__label">
              <div className="filter_ksnb_1_0_0__head">
                <div className="filter_ksnb_1_0_0__icon">
                  <img src={IMAGES.iconFilter} alt="" />
                </div>
                <div className="filter_ksnb_1_0_0__text">Lọc nâng cao</div>
              </div>
              {(filter.nhom_loi || filter.muc_do || filter.key) && (
                <Button
                  background="second"
                  size="small"
                  event={() => {
                    setFilter(initial);
                    setData(dataOriginal);
                  }}
                >
                  Xóa lọc
                </Button>
              )}
            </div>
            <div className="filter_ksnb_1_0_0__filter">
              <div className="filter_ksnb_1_0_0__search">
                <Input
                  placeholder="Nhập từ khóa tìm kiếm"
                  value={filter.key}
                />
                <Button
                  icon={IMAGES.iconSearch}
                  background="primary"
                  event={handleSearch}
                />
              </div>
              {
                <Checkbox
                  placeholder="Lỗi"
                  label="Nhóm lỗi"
                  option={year}
                  event={handleSelect1}
                  value={filter.nhom_loi}
                />
              }
            </div>
          </div>
          <div className="filter_ksnb_1_0_0__main">
            {data && <List data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
