import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
0% {
  top: 6px;
  height: 51px;
}
50%,
100% {
  top: 19px;
  height: 26px;
}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
`;

const LoaderTop = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
`;

const LoaderLeft = styled.div`
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: #6b808c;
  animation: ${bounce} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation-delay: -0.24s;
`;

const LoaderMid = styled.div`
  display: inline-block;
  position: absolute;
  width: 13px;
  background: #6b808c;
  animation: ${bounce} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  left: 26px;
  animation-delay: -0.12s;
`;

const LoaderRight = styled.div`
  display: inline-block;
  position: absolute;
  width: 13px;
  background: #6b808c;
  animation: ${bounce} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  left: 45px;
  animation-delay: 0;
`;

/*
.lds-facebook div:nth-child(1) {
  left: 6px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 26px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 45px;
  animation-delay: 0;
}
*/

const Loader = () => {
  return (
    <Container>
      <LoaderTop>
        <LoaderLeft />
        <LoaderMid />
        <LoaderRight />
      </LoaderTop>
    </Container>
  );
};

export default Loader;
