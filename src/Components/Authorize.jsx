import React, { Component } from "react";
import Trello from "../lib/Trello";

export default class Authorize extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (localStorage.getItem("trello_token") && localStorage.getItem("idMe")) {
      let token = localStorage.getItem("trello_token");
      let id = JSON.parse(localStorage.getItem("idMe"));
      this.props.authorizeUser(id, token);
    }
  }

  authenticationSuccess = () => {
    let token = localStorage.getItem("trello_token");
    let id = JSON.parse(localStorage.getItem("idMe"));
    window.Trello.setToken(token);
    this.props.authorizeUser(id, token);
  };

  authenticationFailure = () => {
    console.error("Authentication to Trello failed");
  };

  authorizeUser = () => {
    window.Trello.authorize({
      type: "popup",
      name: "Trello Project Management",
      scope: {
        read: "true",
        write: "false"
      },
      expiration: "never",
      success: this.authenticationSuccess,
      error: this.authenticationFailure
    });
  };

  render() {
    return (
      <div className="layout-centered-content">
        <p>Authorize this plugin to get started with TrelloPM</p>
        <button
          className="global-header-section-button mod-primary"
          onClick={this.authorizeUser}
        >
          Authorize
        </button>
      </div>
    );
  }
}
