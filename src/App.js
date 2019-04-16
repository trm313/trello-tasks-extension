import React, { Component } from "react";
import "./App.css";

import { fetchOrganization, addMetaToCard, fetchMembers } from "./util/Trello";
import Header from "./Components/Header";
import Authorize from "./Components/Authorize";
import MyTasks from "./Components/MyTasks";
import Loader from "./Components/UI/Loader";
import Error from "./Components/UI/Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      id: null,
      boards: null,
      cards: null,
      members: null,
      error: null
    };
  }

  fetchData = async () => {
    let path = window.location.pathname.split("/");
    fetchOrganization(
      this.state.token,
      path[1],
      this.setData,
      this.setErrorStatus
    );
  };

  fetchMembers = async () => {
    let path = window.location.pathname.split("/");
    fetchMembers(
      this.state.token,
      path[1],
      data => {
        this.setState({ members: data });
      },
      this.setErrorStatus
    );
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

  setErrorStatus = message => {
    this.setState({
      error: message
    });
  };

  render() {
    if (!this.state.id || !this.state.token) {
      return (
        <div className="boards-page-board-section mod-no-sidebar">
          <Header />
          <div>
            {this.state.error && <Error message={this.state.error} />}
            <Authorize
              authorizeUser={this.handleAuthorizeUser}
              errorCallback={this.setErrorStatus}
            />
          </div>
        </div>
      );
    }

    if (!this.state.boards || !this.state.cards || !this.state.members) {
      return (
        <div className="boards-page-board-section mod-no-sidebar">
          <Header />
          <div>
            {this.state.error && <Error message={this.state.error} />}
            <Loader />
          </div>
        </div>
      );
    }

    return (
      <div className="boards-page-board-section mod-no-sidebar">
        <Header />
        {this.state.error && <Error message={this.state.error} />}
        <MyTasks
          token={this.state.token}
          id={this.state.id}
          cards={this.state.cards}
          members={this.state.members}
          errorCallback={this.setErrorStatus}
        />
      </div>
    );
  }
}

export default App;
