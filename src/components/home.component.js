import React, { Component } from "react";
import "../App.css"; //ka sitas daro

import UserService from "../services/user.service";
import scope from "../images/ProjektoScope.png";
import { t } from "i18next";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          {/* <h3>{this.state.content}</h3> */}
          <h3>{t('projectscope')}</h3>
          <p>
            # Admin can read/edit/delete Users
            {t('roleDescription')}
          </p>
        </header>
        <img className="scope" src={scope} alt="Project Scope" />
      </div>
    );
  }
}