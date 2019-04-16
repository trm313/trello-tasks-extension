import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  max-width: 50%;
  margin: 10px 0;
  background-color: #e07082;
`;

const Error = ({ message }) => {
  return (
    <Container>
      <p>{message}</p>
    </Container>
  );
};

export default Error;
