import "./_Result.scss"
import logo from "../img/logo.png";
import vase from "../img/vase.svg";
import wtopic from "../img/wtopic.svg";
import wprofile from "../img/wprofile.svg";
import wgeneral from "../img/wgeneral.svg";
import wadd_cardadd_card from "../img/wadd-cardadd-card.svg";

import axios from "axios";
import rawdata from "../data/dataMap-v2.js";
import Gallery from "../components/Gallery.jsx";
import SearchForm from "../components/SearchForm";
import dataContext from "../context/data.context.js";

import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const routerSearchQuery = useLocation().state?.searchQuery;
  const [searchQuery, setSearchQuery] = useState(routerSearchQuery ?? "");
  const navigate = useNavigate();

  const { data, updateData } = useContext(dataContext);
  const [filtereData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  global.goToPage = (itemId) => { // Handle item links click
    handleItemSelect(itemId)
  }

  const fetchWords = async () => {
    try {
      setIsLoading(true);
      let words = await axios.get("http://185.237.15.89:5000/api/words");
      updateData(words?.data);
      setIsLoading(false);
    } catch (error) {
      updateData(rawdata);
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const result = data?.filter(
      (item) => item.faName.indexOf(searchQuery) !== -1 || item.ruName.indexOf(searchQuery) !== -1
    ) || [];
    setFilteredData(result);
  }

  const handleItemSelect = (itemId) => {
    const result = data?.filter((item) => item.id === itemId);
    setFilteredData(result);
    setSearchQuery("");
  };

  useEffect(() => {
    if (data?.length > 0) {
      const result = data?.filter(
        (item) => item.faName.indexOf(searchQuery) !== -1 || item.ruName.indexOf(searchQuery) !== -1
      ) || [];
      setFilteredData(result);
    } else {
      fetchWords();
    }
  }, [data]);

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <div className="title_logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
              <div className="loadingCircle">
                <div className="loader"></div>
              </div>
            </div>
            <div className="buttons">
              <button><span>Profile</span></button>
              <button>Contacts</button>
            </div>
          </nav>
          <div className="search-bar">
            <div className="decor">
              <img src={vase} alt="book" />
            </div>
            <div className="search-form-wrapper">
              <SearchForm onChange={(e) => setSearchQuery(e.target.value)} onSubmit={handleSearchSubmit} initValue={searchQuery} />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="mainContent">
            <div className="sidebar">
              <ul>
                <button>
                  <div className="buttonDesign">
                    <img src={wtopic} alt="topic Dictionary" />
                  </div>
                  <span> Тематические словари</span>
                </button>
                <button>
                  <div className="buttonDesign">
                    <img src={wtopic} alt="general Dictionary" />
                  </div>
                  <span>Общие словари</span>
                </button>
                <button>
                  <div className="buttonDesign">
                    <img src={wgeneral} alt="articles" />
                  </div>
                  <span>Статьи</span>
                </button>
                <button>
                  <div className="buttonDesign">
                    <img src={wadd_cardadd_card} alt="add cards" />
                  </div>
                  <span>Добавить карточки</span>
                </button>
                <button>
                  <div className="buttonDesign">
                    <img src={wtopic} alt="about" />
                  </div>
                  <span> О проекте</span>
                </button>
                <button>
                  <div className="buttonDesign">
                    <img src={wprofile} alt="profile" />
                  </div>
                  <span>Профиль</span>
                </button>
              </ul>
            </div>
            <div className="wordList">
              {filtereData.length === 1 ? <>
                <div className="wordList_title">
                  <h1 className="russian">{filtereData[0].ruName}</h1>
                  <h1 className="persian">{filtereData[0].faName}</h1>
                </div>
                <p dangerouslySetInnerHTML={{ __html: filtereData[0].description }}></p>
                <Gallery item={filtereData[0]} />
              </> :
                <ul className="nameList">
                  {filtereData && filtereData.map((item) =>
                    <li className="name" key={item.id} onClick={() => handleItemSelect(item.id)}>
                      <span>{item.ruName}</span>
                      <span>{item.faName}</span>
                    </li>
                  )}
                </ul>}
            </div>
          </div>

        </div>
      </main>
    </>
  )
}

export default Result