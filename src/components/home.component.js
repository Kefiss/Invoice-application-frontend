import React, { Component } from "react";
import "../App.css";

import UserService from "../services/user.service";
import  { withTranslation}  from "react-i18next";
import scope from "../images/ProjektoScope.png";
import { t } from "i18next";

 class Home extends Component {
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
    const {t} = this.props
   
    return (
      <div className="container">
        <header className="jumbotron">
          {/* <h3>{this.state.content}</h3> */}
          <h3>{t('projectscope')}</h3>
          <h5>{t('adminRoleDescription')}</h5>
          <h5>{t('managerRoleDescription')}</h5>
          <h5>{t('userRoleDescription')}</h5>
        </header>
        <img className="scope" src={scope} alt="Project Scope" />
      </div>
    );
  }
}

export default withTranslation()(Home);