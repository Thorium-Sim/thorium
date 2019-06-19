import React, { useState } from "react";
import { Label, Input, Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { ReactComponent as Logo } from "./logo.svg";
const SpaceEdventuresToken = ({ clientObj }) => {
  const [email, setEmail] = useState("");
  const style = {
    height: "100%",
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center"
  };
  return (
    <div style={{ height: "100%" }}>
      <Logo style={{ maxWidth: "500px", maxHeight: "100px" }} />
      <div style={{ display: "flex", height: "80%" }}>
        <div style={style}>
          <h2 style={{ maxWidth: "50vw" }}>
            You have earned Space EdVentures points during this flight. Use the
            following token to redeem your points on SpaceEdVentures.org:
          </h2>
          <h1>{clientObj.token}</h1>
          <p>
            Space EdVentures allows you to track your flights in the Space
            EdVentures network of simulators. You can see your flight and class
            hours, earn ranks, keep track of your missions and officers logs,
            and earn rewards.
          </p>
        </div>
        <div style={{ flex: 1 }} />
        <div style={style}>
          <Mutation
            mutation={gql`
              mutation SetClientEmail($clientId: ID!, $email: String!) {
                clientSetEmail(client: $clientId, email: $email)
              }
            `}
            variables={{ clientId: clientObj.id, email }}
          >
            {action =>
              clientObj.email ? (
                <div>
                  <h2 style={{ maxWidth: "50vw" }}>
                    Your email has been set to {clientObj.email}
                  </h2>
                  <Button
                    onClick={() =>
                      action({
                        variables: { clientId: clientObj.id, email: "" }
                      })
                    }
                  >
                    Change Email Address
                  </Button>
                </div>
              ) : (
                <div>
                  <h2 style={{ maxWidth: "50vw" }}>
                    Enter your email below if you would like to be sent an email
                    with this token and redemption instructions.
                  </h2>
                  <form // eslint-disable-next-line
                    action={"javascript:void(0);"}
                    onSubmit={action}
                    style={{ margin: "20px" }}
                  >
                    <Label style={{ width: "100%" }}>
                      Email
                      <Input
                        style={{ width: "100%" }}
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Label>
                    <div>
                      <Button type="submit">Set Email Address</Button>
                    </div>
                  </form>
                </div>
              )
            }
          </Mutation>
          <div style={{ maxWidth: "50vw" }}>
            <p>
              Your email address will only be used once to send you this token.
              Your email address is only saved if you register for a Space
              EdVentures account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpaceEdventuresToken;
