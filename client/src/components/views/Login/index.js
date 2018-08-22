import React, { Component } from "react";
import { Button, Row, Col, Input } from "reactstrap";
import { withApollo } from "react-apollo";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import { Asset } from "../../../helpers/assets";
import Tour from "../../../helpers/tourHelper";

import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: ""
    };
  }
  _login() {
    const { loginName } = this.state;
    const client = this.props.clientObj.id;
    if (loginName.length > 0) {
      const obj = {
        client,
        loginName
      };
      const mutation = gql`
        mutation LoginClient($client: ID!, $loginName: String) {
          clientLogin(client: $client, loginName: $loginName)
        }
      `;
      this.props.client.mutate({
        mutation: mutation,
        variables: obj
      });
    }
  }
  generateTraining = () => {
    const {
      simulator: { name: simName },
      station: { name }
    } = this.props;
    const training = [
      {
        selector: ".nothing-at-all",
        content: `Welcome aboard the ${simName}. You are in charge of the ${name} station. This on-screen training will teach you how to use all of the controls on your station. You should go through all of the training at the beginning of your mission, but you can always refer to it later.`
      },
      {
        selector: ".widgets",
        content: (
          <p>
            Here are the widgets. These are controls which you can access on all
            of the screens on your station. Click on the icon to open the
            widget. A <FontAwesome name="question-circle-o" /> icon in the top
            right corner will open training for the widget when you click on it.
          </p>
        )
      },
      {
        selector: ".card-switcher",
        content:
          "Use this to switch between the different screens on your station."
      },
      {
        selector: ".help",
        content:
          "You can use this to access training on the screens that you navigate to. Be sure to do the training on all of the screens so you know how to do your job."
      },
      {
        selector: ".loginBlock",
        content:
          "You should now log in to your station. Good luck with training and on your mission!"
      }
    ];
    return training;
  };
  training = () => {
    this.setState({
      training: true
    });
  };
  render() {
    let simulatorName;
    if (this.props.simulator) simulatorName = this.props.simulator.name;
    const { assets } = this.props.simulator;
    return (
      <Row className="loginCard">
        <Col sm={{ size: 3, offset: 1 }}>
          <Asset asset={assets.logo}>
            {({ src }) => (
              <div
                alt="login logo"
                role="presentation"
                className="login-logo"
                style={{ backgroundImage: `url('${src}')` }}
              >
                <div style={{ paddingTop: "100%" }} />
              </div>
            )}
          </Asset>
          <h1>{simulatorName}</h1>
          <Button color="success" onClick={this.training} block>
            Begin Training
          </Button>
        </Col>
        <Col sm={{ size: 7, offset: 1 }}>
          <Asset asset={assets.side}>
            {({ src }) => (
              <div
                role="presentation"
                alt="ship right"
                style={{ backgroundImage: `url('${src}')` }}
                className="ship-logo"
              >
                {" "}
                <div style={{ paddingTop: "50%" }} />
              </div>
            )}
          </Asset>

          <Col className="loginBlock" sm={{ size: 8, offset: 2 }}>
            <h2>Agent Login</h2>
            <Input
              onKeyDown={e => {
                if (e.which === 13) {
                  this._login.call(this);
                }
              }}
              value={this.state.loginName}
              onChange={e =>
                this.setState({
                  loginName: e.target.value
                })
              }
              ref="loginField"
            />
            <Button onClick={this._login.bind(this)} block>
              Login
            </Button>
          </Col>
        </Col>
        <Tour
          steps={this.generateTraining()}
          isOpen={this.state.training}
          onRequestClose={() => this.setState({ training: false })}
        />
      </Row>
    );
  }
}

export default withApollo(Login);
