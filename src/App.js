import "./css/App.css";
import Header from "./components/Header";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./pages/Page.jsx";
import Home from "./pages/Home";
import React, { useState } from "react";
import dataContext from "./context/data.context.js";

const Container = styled.div`
  display: flex;
  background-color: #90d692;
  direction: rtl;
  height: 100%;
`;

const Main = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #e5ffe5;
  height: inherit;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  padding: 0 48px;
  margin: 0 0 48px 0;
`;

function App() {
  const [data, seData] = useState([]);
  const updateData = (newValue) => {
    seData(newValue);
 };
  return (
    <Container>
      <dataContext.Provider value={{ data, updateData }}>
        <BrowserRouter>
          <Main>
            <Header />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="page">
                    <Route path=":id" element={<Page />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </dataContext.Provider>
    </Container>
  );
}

export default App;
