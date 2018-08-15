import React from "react";
import { Container } from "reactstrap";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const Settings = () => (
  <Query
    query={gql`
      query Thorium {
        thorium {
          autoUpdate
        }
      }
    `}
  >
    {({ loading, data }) =>
      loading ? (
        <p>Loading</p>
      ) : (
        <Container>
          <h1>Settings</h1>
          <label>
            <Mutation
              mutation={gql`
                mutation ToggleAutoUpdate($autoUpdate: Boolean!) {
                  toggleAutoUpdate(autoUpdate: $autoUpdate)
                }
              `}
            >
              {action => (
                <input
                  type="checkbox"
                  defaultChecked={data.thorium.autoUpdate}
                  onChange={e =>
                    action({ variables: { autoUpdate: e.target.checked } })
                  }
                />
              )}
            </Mutation>{" "}
            Automatically check for updates
          </label>
        </Container>
      )
    }
  </Query>
);

export default Settings;
