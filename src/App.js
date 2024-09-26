import "./css/App.scss";
import Header from "./components/Header";
import Page from "./pages/Page.jsx";
import Home from "./pages/Home";
import Home1 from "./pages/Home1.jsx";
import Result from "./pages/Result.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataContext from "./context/data.context.js";
import React, { useState } from "react";
function App() {
  const [data, seData] = useState([]);
  const updateData = (newValue) => {
    seData(newValue);
  };
  return (
    <dataContext.Provider value={{ data, updateData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home1 />} />
            <Route path="home1" element={<Home1 />} />
            <Route path="result" element={<Result />} />
            <Route path="page">
              <Route path=":id" element={<><Header /><Page /></>} />
            </Route>
          </Route>
        </Routes>

      </BrowserRouter>
    </dataContext.Provider>
  );
}

export default App;
