import React from "react";
import styled from "styled-components";

var isPast = require("date-fns/is_past");
var format = require("date-fns/format");

const Card = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 45, 66, 0.25);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  &:not(:last-child) {
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;
const TaskBody = styled.div`
  padding: 10px;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
`;
const RowLabels = styled(Row)`
  justify-content: flex-start;
`;
const RowSegment = styled.div`
  display: flex;
  align-items: center;
`;
const Label = styled.div`
  border-bottom: ${props => `4px solid ${props.color}`};
  width: 20px;
  height: 2px;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;
const Title = styled.a`
  margin-bottom: 6px;
`;
const Description = styled.p`
  color: #6b808c;
  font-size: 10px;
  margin: 0;
`;
const StatPair = styled.div`
  background-color: ${props => (props.alert ? "#ec9488" : "")};
  border-radius: 3px;
  padding: 2px 4px 2px 2px;
  font-size: 14px;
  margin: 0 4px 4px 0;

  color: ${props => (props.alert ? "#fff" : "#6b808c")};

  i {
    color: ${props => (props.alert ? "#fff" : "#6b808c")};
  }
`;
const StatIcon = styled.i``;
// attachment: icon-attachment
// comment:
// label: icon-label
// members: icon-member
// checklist: icon-checklist
// Due: icon-clock
// activity: icon-activity
// description: icon-description

const StatText = styled.span``;

const Member = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  font-size: 12px;
  background-color: #dfe3e6;
  color: #17394d;
  font-weight: 700;
`;

const Task = props => {
  let { id, due, labels, shortUrl, taskStatus, boardName, name, card } = props;

  return (
    <Card key={"task-" + id}>
      <TaskBody>
        <RowLabels>
          {card.labels.map(label => {
            return (
              <span
                className={`card-label card-label-${
                  label.color
                } mod-card-front`}
              >
                {label.name}
              </span>
            );
          })}
        </RowLabels>
        <Description>{`${card.boardName}\\${card.listName}`}</Description>
        <Title className="list-card-title js-card-name" href={card.shortUrl}>
          {name}
        </Title>

        <Row>
          <RowSegment>
            {card.badges.comments > 0 && (
              <StatPair>
                <StatIcon className="icon-sm icon-comment" />
                <StatText>{card.badges.comments}</StatText>
              </StatPair>
            )}
            {card.badges.checkItems > 0 && (
              <StatPair>
                <StatIcon className="icon-sm icon-checklist" />
                <StatText>
                  {card.badges.checkItemsChecked}/{card.badges.checkItems}
                </StatText>
              </StatPair>
            )}
            {card.badges.attachments > 0 && (
              <StatPair>
                <StatIcon className="icon-sm icon-attachment" />
                <StatText>{card.badges.attachments}</StatText>
              </StatPair>
            )}
            {card.badges.due && !card.badges.dueComplete && (
              <StatPair alert={isPast(card.badges.due)}>
                <StatIcon className="icon-sm icon-clock" />
                <StatText>
                  {format(new Date(card.badges.due), "MMM D")}
                </StatText>
              </StatPair>
            )}
          </RowSegment>
          <RowSegment>
            {card.memberInfo.map((member, index) => {
              if (index < 2) {
                return <Member>{member.initials}</Member>;
              } else if (index == 3) {
                return <Member>+{card.memberInfo.length - 2}</Member>;
              } else {
                return;
              }
            })}
          </RowSegment>
        </Row>
      </TaskBody>
    </Card>
  );
};

export default Task;
