import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card.jsx";
import data from "../data/dataMap-v2.js";

const Container = styled.div`
  padding: 48px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 80%;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  box-shadow: 0 0 40px rgb(51 51 51 / 10%);
  margin-bottom: 12px;
`;

const Input = styled.input`
  text-align: center;
  /* padding-left: 112px; */
  height: 60px;
  text-indent: 25px;
  border: 2px solid #d6d4d4;
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 300;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  font-family: inherit;
`;

const ResultWrapper = styled.div`
  display: flex;
  max-height: 400px;
  overflow: auto;
  width: 100%;
  border: 1px solid #343434;
  border-radius: 4px;
`;

const Ul = styled.ul`
  box-shadow: 0 0 40px rgb(51 51 51 / 10%);
  width: 100%;
  height: 100%;
  padding: 8px;
  margin: 8px;
`;

const Home = () => {
  const [q, setQ] = useState("");
  const [filtereData, setFilteredData] = useState([]);
  useEffect(() => {
    const result = data.filter(
      (item) => item.faName.indexOf(q) !== -1 || item.ruName.indexOf(q) !== -1
    );
    setFilteredData(result);
  }, [q]);

  return (
    <Container>
      <Wrapper>
        <SearchWrapper>
          <Input onChange={(e) => setQ(e.target.value)} placeholder="جستجو" />
        </SearchWrapper>
        <ResultWrapper>
          <Ul>
            {filtereData.map((item) => {
              return <Card key={item.id} item={item} />;
            })}
          </Ul>
        </ResultWrapper>
      </Wrapper>
    </Container>
  );
};

export default Home;
