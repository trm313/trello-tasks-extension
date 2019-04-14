import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b808c;
  height: 100px;
  width: 100%;
`;

const CheckIcon = styled.i`
  font-size: 50px;
  margin-right: 40px;
  margin-top: -10px;
`;

const NoTasks = () => {
  return (
    <Container>
      <CheckIcon className="icon-lg icon-checklist" />
      <div>
        <h2>Great work!</h2>
        <p>You have no active tasks remaining</p>
      </div>
    </Container>
  );
};

export default NoTasks;
