import React, { Component } from "react";

import MyTasks from "./MyTasks";

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "my-tasks" // ['my-tasks', 'projects', 'team']
    };
  }

  navigateTab = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    return (
      <div>
        <div className="tabbed-pane-nav u-clearfix">
          <ul>
            <li
              className="tabbed-pane-nav-item"
              onClick={this.navigateTab.bind(this, "my-tasks")}
            >
              <p
                className={
                  "tabbed-pane-nav-item-button" +
                  (this.state.activeTab === "my-tasks" ? " active" : "")
                }
              >
                My Tasks
              </p>
            </li>
            <li
              className="tabbed-pane-nav-item"
              onClick={this.navigateTab.bind(this, "projects")}
            >
              <p
                className={
                  "tabbed-pane-nav-item-button" +
                  (this.state.activeTab === "projects" ? " active" : "")
                }
              >
                Projects
              </p>
            </li>
            <li
              className="tabbed-pane-nav-item"
              onClick={this.navigateTab.bind(this, "team")}
            >
              <p
                className={
                  "tabbed-pane-nav-item-button" +
                  (this.state.activeTab === "team" ? " active" : "")
                }
              >
                Team
              </p>
            </li>
          </ul>
        </div>
        <div className="tabbed-pane-main-col u-clearfix">
          <div className="tabbed-pane-main-col-wrapper">
            {this.state.activeTab === "my-tasks" && (
              <MyTasks
                token={this.props.token}
                id={this.props.id}
                cards={this.props.cards}
              />
            )}
            {this.state.activeTab === "projects" && <p>Projects</p>}
            {this.state.activeTab === "team" && <p>Team</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default TabContainer;
