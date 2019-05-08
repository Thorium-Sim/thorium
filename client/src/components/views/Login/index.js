import React, { Component } from "react";
import { Button, Row, Col, Input } from "reactstrap";
import { withApollo, Query, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag.macro";
import { Asset } from "helpers/assets";
import Tour from "helpers/tourHelper";
import { publish } from "helpers/pubsub";
import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      spaceEdLogin: false
    };
  }
  login = e => {
    e.preventDefault();
    e.stopPropagation();
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
  };
  generateTraining = () => {
    const {
      simulator: { name: simName },
      station: { name, widgets }
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
      widgets.includes("objectives")
        ? {
            selector: "#widget-objectives",
            content:
              "This is the objectives widget. You can use it to see what your mission objective are at any time during the mission. Be sure to open it up and check it periodically to make sure you know what you are supposed to be doing."
          }
        : null,
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
    return training.filter(Boolean);
  };
  training = action => {
    action().then(() => {
      publish("toggleTraining");
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
          <Mutation
            mutation={gql`
              mutation ClientSetTraining($id: ID!, $training: Boolean!) {
                clientSetTraining(client: $id, training: $training)
              }
            `}
            variables={{
              id: this.props.clientObj.id,
              training: true
            }}
          >
            {action => (
              <Button
                color="success"
                onClick={() => this.training(action)}
                block
              >
                Begin Training
              </Button>
            )}
          </Mutation>
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
            <h2>Officer Login</h2>
            <div className="login-form-container">
              <form
                // eslint-disable-next-line
                action={"javascript:void(0);"}
                onSubmit={this.login}
                className={`name-field  ${
                  !this.state.spaceEdLogin ? "expand" : ""
                }`}
              >
                <Input
                  data-testid="login-field"
                  value={this.state.loginName}
                  onChange={e =>
                    this.setState({
                      loginName: e.target.value
                    })
                  }
                  ref="loginField"
                />
                <Button type="submit" block>
                  Login
                </Button>
              </form>
              <Mutation
                mutation={gql`
                  mutation LoginWithToken($token: String!) {
                    getSpaceEdventuresLogin(token: $token)
                  }
                `}
                variables={{ token: this.state.spaceEdToken }}
              >
                {(action, { loading }) => (
                  <form
                    onSubmit={
                      loading
                        ? () => {}
                        : () =>
                            action().then(res => {
                              if (
                                res.data &&
                                res.data.getSpaceEdventuresLogin
                              ) {
                                publish("triggerNotification", {
                                  title: res.data.getSpaceEdventuresLogin,
                                  color: "danger"
                                });
                              }
                            })
                    }
                    // eslint-disable-next-line
                    action={"javascript:void(0);"}
                    className={`space-edventures-field ${
                      this.state.spaceEdLogin ? "expand" : ""
                    }`}
                  >
                    <Input
                      disabled={loading}
                      value={this.state.spaceEdToken || ""}
                      onChange={e =>
                        this.setState({
                          spaceEdToken: e.target.value
                        })
                      }
                    />
                    <Button disabled={loading} type="submit" block>
                      Submit Officer Code
                    </Button>
                  </form>
                )}
              </Mutation>
            </div>
            {this.props.hasSpaceEd && (
              <Button
                block
                onClick={() =>
                  this.setState({
                    spaceEdLogin: !this.state.spaceEdLogin
                  })
                }
              >
                Login with{" "}
                {this.state.spaceEdLogin ? "Name" : "Space EdVentures"}
              </Button>
            )}
          </Col>
        </Col>
        <Tour
          client={this.props.clientObj}
          steps={this.generateTraining()}
          training={this.props.clientObj.training}
        />
      </Row>
    );
  }
}
const FlightData = props => {
  return (
    <Query
      query={gql`
        query Flight($flightId: ID!) {
          flights(id: $flightId) {
            id
            flightType
          }
        }
      `}
      variables={{ flightId: props.flight.id }}
    >
      {({ loading, data }) => (
        <Login
          {...props}
          hasSpaceEd={
            !(
              loading ||
              !data.flights ||
              !data.flights[0] ||
              !data.flights[0].flightType
            )
          }
        />
      )}
    </Query>
  );
};

export default withApollo(FlightData);
