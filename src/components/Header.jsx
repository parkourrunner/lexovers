import React from "react";
import styled from "styled-components";
import QR from "./QR";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
`;

const TitleWrapper = styled.div`
  padding: 16px;
  width: 480px;
`;

const Title = styled.h4`
  direction: ltr;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  line-height: 28.8px;
  margin: 0%;
`;

const LogoWrapper = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.img`
  vertical-align: middle;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <QR />
        <TitleWrapper>
          <Title>
            Русско-персидский лингвострановедческий исторический словарь
            справочник <br /> (от основании Киевской Руси до распада Советского
            союза)
          </Title>
        </TitleWrapper>
        <LogoWrapper>
          <Logo src={logo} onClick={(e) => navigate("/")} />
        </LogoWrapper>
      </Wrapper>
    </Container>
  );
};

export default Header;
