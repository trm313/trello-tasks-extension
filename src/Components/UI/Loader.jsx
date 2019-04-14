import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
`;

const Loader = () => {
  return (
    <Container>
      <div class="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </Container>
  );
};

export default Loader;
