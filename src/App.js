import "./css/App.scss";
import Home from "./pages/Home.jsx";
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
            <Route index element={<Home />} />
            <Route path="result" element={<Result />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </dataContext.Provider>
  );
}

export default App;
