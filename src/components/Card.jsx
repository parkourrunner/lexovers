import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Li = styled.li`
  cursor: pointer;
  padding: 4px;
  box-shadow: 0 0 40px rgb(51 51 51 / 10%);
  border-radius: 4px;
  border: 1px solid green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 4px 0;
  padding: 4px;
`;

const Span = styled.span`
  font-size: 16px;
  font-weight: 300;
`;

const SpanLeft = styled(Span)`
  text-align: left;
`;

const SpanRight = styled(Span)`
  text-align: right;
`;

const Card = ({ item }) => {
  const navigate = useNavigate();

  const handleclick = (e) => {
    e.preventDefault();
    navigate(`/page/${item.id}`);
  };
  return (
    <Li onClick={handleclick}>
      <SpanRight>{item.faName}</SpanRight>
      <SpanLeft>{item.ruName}</SpanLeft>
    </Li>
  );
};

export default Card;
