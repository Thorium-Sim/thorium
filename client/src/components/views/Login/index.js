import React from "react";
import { Button, Row, Col, Input } from "helpers/reactstrap";
import { withApollo, Query, Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag.macro";
import { Asset } from "helpers/assets";
import Tour from "helpers/tourHelper";
import { publish } from "helpers/pubsub";
import "./login.scss";
import useSoundEffect from "../../../helpers/hooks/useSoundEffect";

const Login = ({
  hasSpaceEd,
  clientObj,
  client,
  simulator: { name: simName, assets },
  station: { name, widgets }
}) => {
  const [loginName, setLoginName] = React.useState("");
  const [spaceEdLogin, setSpaceEdLogin] = React.useState("");
  const [spaceEdToken, setSpaceEdToken] = React.useState("");
  const playEffect = useSoundEffect();
  const login = e => {
    e.preventDefault();
    e.stopPropagation();
    playEffect("login");
    const clientId = clientObj.id;
    if (loginName.length > 0) {
      const obj = {
        client: clientId,
        loginName
      };
      const mutation = gql`
        mutation LoginClient($client: ID!, $loginName: String) {
          clientLogin(client: $client, loginName: $loginName)
        }
      `;
      client.mutate({
        mutation: mutation,
        variables: obj
      });
    }
  };
  const generateTraining = () => {
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
  const training = action => {
    action().then(() => {
      publish("toggleTraining");
    });
  };

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
        <h1>{simName}</h1>
        <Mutation
          mutation={gql`
            mutation ClientSetTraining($id: ID!, $training: Boolean!) {
              clientSetTraining(client: $id, training: $training)
            }
          `}
          variables={{
            id: clientObj.id,
            training: true
          }}
        >
          {action => (
            <Button color="success" onClick={() => training(action)} block>
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
              onSubmit={login}
              className={`name-field  ${!spaceEdLogin ? "expand" : ""}`}
            >
              <Input
                data-testid="login-field"
                value={loginName}
                onChange={e => setLoginName(e.target.value)}
              />
              <Button type="submit" block silent>
                Login
              </Button>
            </form>
            <Mutation
              mutation={gql`
                mutation LoginWithToken($token: String!) {
                  getSpaceEdventuresLogin(token: $token)
                }
              `}
              variables={{ token: spaceEdToken }}
            >
              {(action, { loading }) => (
                <form
                  onSubmit={
                    loading
                      ? () => {}
                      : () =>
                          action().then(res => {
                            if (res.data && res.data.getSpaceEdventuresLogin) {
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
                    spaceEdLogin ? "expand" : ""
                  }`}
                >
                  <Input
                    disabled={loading}
                    value={spaceEdToken || ""}
                    onChange={e => setSpaceEdToken(e.target.value)}
                  />
                  <Button disabled={loading} type="submit" block>
                    Submit Officer Code
                  </Button>
                </form>
              )}
            </Mutation>
          </div>
          {hasSpaceEd && (
            <Button block onClick={() => setSpaceEdLogin(!spaceEdLogin)}>
              Login with {spaceEdLogin ? "Name" : "Space EdVentures"}
            </Button>
          )}
        </Col>
      </Col>
      <Tour
        client={clientObj}
        steps={generateTraining()}
        training={clientObj.training}
      />
    </Row>
  );
};

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
