import axios from "axios";
import mapSeries from "async/mapSeries";

const BASE = "https://api.trello.com/1";
const KEY = "0549bc895eb4558439ae68fda12ace06";

export function fetchMembers(token, name, callback) {
  // https://api.trello.com/1/organizations/id/members/filter
  let params = `filter=all&fields=all&key=${KEY}&token=${token}`;
  let url = `${BASE}/organizations/${name}/members?${params}`;
  axios
    .get(url)
    .then(response => {
      callback(response.data);
    })
    .catch(error => {
      console.error("fetchMembers", error);
    });
}

export async function fetchOrganization(token, name, returnDataCallback) {
  let params = `filter=all&fields=all&key=${KEY}&token=${token}`;
  let url = `${BASE}/organizations/${name}/boards?${params}`;
  axios
    .get(url)
    .then(response => {
      var boards = response.data;
      mapSeries(
        boards,
        function(board, callback) {
          let params = `cards=open&card_fields=all&filter=open&fields=all&key=${KEY}&token=${token}`;
          let url = `${BASE}/boards/${board.id}/lists?${params}`;
          axios
            .get(url)
            .then(response => {
              board.lists = response.data;
              return callback(null, response.data);
            })
            .catch(error => {
              console.error(error);
              return callback(error);
            });
        },
        function(error, results) {
          let data = {
            results,
            boards
          };
          returnDataCallback(boards);
          return data;
        }
      );
    })
    .catch(error => {
      console.error(error);
    });
}

const listSections = {
  backlog: {
    name: "Backlog",
    color: "#000",
    terms: ["#bl", "backlog", "todo", "to do", "icebox"]
  },
  inprogress: {
    name: "In Progress",
    color: "#000",
    terms: ["#ip", "doing", "in progress", "progress"]
  },
  review: {
    name: "Review",
    color: "#000",
    terms: ["#rv", "review", "pending"]
  },
  completed: {
    name: "Completed",
    color: "#000",
    terms: ["#d", "complete", "completed", "done", "finished"]
  }
};

export function addMetaToCard(boards) {
  let cards = [];
  boards.map(board => {
    var boardName = board.name;
    board.lists.map(list => {
      let taskStatus = "backlog";
      if (list.name.match(/#bl|backlog|icebox|todo|to do/gi)) {
        taskStatus = "backlog";
      } else if (list.name.match(/#ip|doing|in progress/gi)) {
        taskStatus = "inprogress";
      } else if (list.name.match(/#rv|review|pending/gi)) {
        taskStatus = "review";
      } else if (list.name.match(/#d|done|complete|finished|archive/gi)) {
        taskStatus = "completed";
      }
      list.cards.map(card => {
        card.boardName = boardName;
        card.listName = list.name;
        card.taskStatus = listSections[taskStatus];
        cards.push(card);
      });
    });
  });
  return { boards, cards };
}
