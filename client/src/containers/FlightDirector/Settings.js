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
          thoriumId
          doTrack
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
          <h3>
            Thorium ID:{" "}
            <span className="selectable">{data.thorium.thoriumId}</span>
          </h3>
          <div>
            <label>
              <Mutation
                mutation={gql`
                  mutation TrackingPref($pref: Boolean!) {
                    setTrackingPreference(pref: $pref)
                  }
                `}
              >
                {action => (
                  <input
                    type="checkbox"
                    defaultChecked={data.thorium.doTrack}
                    onChange={e =>
                      action({ variables: { pref: e.target.checked } })
                    }
                  />
                )}
              </Mutation>{" "}
              Opt in to tracking
              <div>
                <small>
                  When checked, Thorium sends analytics and tracking data to
                  Fyreworks to better understand how Thorium is used.
                </small>
              </div>
            </label>
          </div>
          <div>
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
          </div>
        </Container>
      )
    }
  </Query>
);

export default Settings;
