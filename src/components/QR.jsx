import React from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";

const Container = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const QR = () => {
  return (
    <Container>
      <QRCode size={100} value={window.location.href} />
    </Container>
  );
};

export default QR;
