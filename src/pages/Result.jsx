import "./_Result.scss"
import logo from "../img/logo.png";
import vase from "../img/vase.svg";

import axios from "axios";
import rawdata from "../data/dataMap-v2.js";
import Gallery from "../components/Gallery.jsx";
import SearchForm from "../components/SearchForm";
import dataContext from "../context/data.context.js";

import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

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
            <Sidebar/>
            <div className="wordList">
              {isLoading ? <div className="loader"></div> : filtereData.length === 1 ? <>
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