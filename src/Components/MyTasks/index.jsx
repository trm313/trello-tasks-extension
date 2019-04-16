import React, { Component } from "react";
import Task from "./Task";
import NoTasks from "../UI/NoTasks";

import styled from "styled-components";

const TaskList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const joinMemberInfo = (cardMembers, teamMembers) => {
  let members = teamMembers.filter(member => {
    return cardMembers.indexOf(member.id) > -1;
  });
  return members;
};

class MyTasks extends Component {
  constructor(props) {
    super(props);
  }

  renderTasks = myTasks => {
    return myTasks.map(card => {
      card.memberInfo = joinMemberInfo(card.idMembers, this.props.members);
      return (
        <Task
          key={`mytask-${card.id}`}
          id={card.id}
          due={card.due}
          labels={card.labels}
          shortUrl={card.shortUrl}
          taskStatus={card.taskStatus}
          boardName={card.boardName}
          card={card}
          name={card.name}
        />
      );
    });
  };

  render() {
    let myTasks = this.props.cards.filter(card => {
      return (
        (card.taskStatus.name === "In Progress" ||
          card.taskStatus.name === "Backlog") &&
        card.idMembers.indexOf(this.props.id) > -1
      );
    });

    if (myTasks.length === 0) {
      return <NoTasks />;
    }

    myTasks.sort((a, b) => {
      let aDate = new Date("12-31-2030");
      let bDate = new Date("12-31-2030");
      if (a.due) {
        aDate = new Date(a.due);
      }
      if (b.due) {
        bDate = new Date(b.due);
      }
      return aDate - bDate;
    });

    return (
      <div>
        <TaskList>{this.renderTasks(myTasks)}</TaskList>
      </div>
    );
  }
}

export default MyTasks;
