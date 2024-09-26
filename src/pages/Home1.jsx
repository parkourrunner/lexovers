import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

import "./_Home.scss";
import logo from "../img/logo.png";
import SearchForm from "../components/SearchForm";

const Home1 = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(q)
    navigate(`/result`, {
      state: {
        searchQuery: q
      }
    });
  }
  return (
    <>
      <header>
        <div className="container">
          <div className="title">
            <div className="title_logo">
              <img src={logo} alt="logo" />
              <div className="loadingCircle">
                <div className="loader"></div>
              </div>
            </div>
            <h1 className="title_russian">Русско-персидский словарь</h1>
            <h1 className="title_persian">فرهنگ لغت روسی- فارسی</h1>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <SearchForm className="home-search-form" onSubmit={handleFormSubmit} onChange={(e) => setQ(e.target.value)} />
        </div>
      </main>
    </>
  );
};

export default Home1;
