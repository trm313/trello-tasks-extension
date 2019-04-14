import React, { Component } from "react";
import "./App.css";

import { fetchOrganization, addMetaToCard, fetchMembers } from "./util/Trello";
import Header from "./Components/Header";
import Authorize from "./Components/Authorize";
import MyTasks from "./Components/MyTasks";
import Loader from "./Components/UI/Loader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      id: null,
      boards: null,
      cards: null,
      members: null
    };
  }

  fetchData = async () => {
    let path = window.location.pathname.split("/");
    fetchOrganization(this.state.token, path[1], this.setData);
  };

  fetchMembers = async () => {
    let path = window.location.pathname.split("/");
    fetchMembers(this.state.token, path[1], data => {
      this.setState({ members: data });
    });
  };

  setData = boards => {
    let data = addMetaToCard(boards);
    this.setState({ boards: data.boards, cards: data.cards });
  };

  handleAuthorizeUser = (id, token) => {
    this.setState({ id, token }, () => {
      this.fetchData();
      this.fetchMembers();
    });
  };

  render() {
    if (!this.state.id || !this.state.token) {
      return (
        <div className="boards-page-board-section mod-no-sidebar">
          <Header />
          <div>
            <Authorize authorizeUser={this.handleAuthorizeUser} />
          </div>
        </div>
      );
    }

    if (!this.state.boards || !this.state.cards || !this.state.members) {
      return (
        <div className="boards-page-board-section mod-no-sidebar">
          <Header />
          <div>
            <Loader />
          </div>
        </div>
      );
    }

    return (
      <div className="boards-page-board-section mod-no-sidebar">
        <Header />
        <MyTasks
          token={this.state.token}
          id={this.state.id}
          cards={this.state.cards}
          members={this.state.members}
        />
      </div>
    );
  }
}

export default App;
