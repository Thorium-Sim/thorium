import React from "react";
import { Container, Button, Input } from "reactstrap";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

const QUERY = gql`
  query Thorium {
    thorium {
      autoUpdate
      thoriumId
      doTrack
      spaceEdventuresToken
      spaceEdventuresCenter {
        id
        name
      }
    }
  }
`;

const GoogleSheetsQuery = gql`
  query HasToken {
    googleSheets
  }
`;

const Settings = () => (
  <Query query={QUERY}>
    {({ loading, data }) =>
      loading ? (
        <p>Loading</p>
      ) : (
        <Container>
          <h1>Settings</h1>
          <h3>
            Thorium ID:{" "}
            <span className="selectable">
              {data.thorium && data.thorium.thoriumId}
            </span>
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
          <div>
            <label>
              <div>Space EdVentures Token</div>
              <Mutation
                mutation={gql`
                  mutation setSpaceEdventuresToken($token: String!) {
                    setSpaceEdventuresToken(token: $token) {
                      id
                      name
                    }
                  }
                `}
                refetchQueries={[{ query: QUERY }]}
              >
                {action => (
                  <input
                    defaultValue={data.thorium.spaceEdventuresToken}
                    type="password"
                    onBlur={e =>
                      action({ variables: { token: e.target.value } })
                    }
                  />
                )}
              </Mutation>
            </label>
            <div>
              <small>
                This allows flights flown using this Thorium server to be
                transmitted to spaceedventures.org for participants to track
                their ranks.
              </small>
            </div>
            {data.thorium.spaceEdventuresCenter &&
              data.thorium.spaceEdventuresCenter.id && (
                <div>
                  <h2>
                    Connected to SpaceEdventures.org center:{" "}
                    {data.thorium.spaceEdventuresCenter.name}
                  </h2>
                </div>
              )}
          </div>
          <div>
            <h3>Google Sheets Connections</h3>
            <Query query={GoogleSheetsQuery}>
              {({ loading, data: { googleSheets } }) => (
                <Mutation
                  mutation={gql`
                    mutation Authorize {
                      googleSheetsAuthorize
                    }
                  `}
                >
                  {(action, { data }) =>
                    googleSheets ? (
                      <div>
                        <p>Connected to Google Sheets: {googleSheets}</p>
                        <Mutation
                          mutation={gql`
                            mutation Revoke {
                              googleSheetsRevoke
                            }
                          `}
                          awaitRefetchQueries
                          refetchQueries={[{ query: GoogleSheetsQuery }]}
                        >
                          {action => (
                            <Button onClick={action}>Revoke Connection</Button>
                          )}
                        </Mutation>
                      </div>
                    ) : data && data.googleSheetsAuthorize ? (
                      <div>
                        <label>
                          Paste Access Token Here
                          <Mutation
                            mutation={gql`
                              mutation Authenticate($token: String!) {
                                googleSheetsCompleteAuthorize(token: $token)
                              }
                            `}
                            awaitRefetchQueries
                            refetchQueries={[{ query: GoogleSheetsQuery }]}
                          >
                            {complete => (
                              <Input
                                onBlur={e =>
                                  complete({
                                    variables: { token: e.target.value }
                                  })
                                }
                              />
                            )}
                          </Mutation>
                        </label>
                      </div>
                    ) : (
                      <Button
                        onClick={() =>
                          action().then(({ data: { googleSheetsAuthorize } }) =>
                            window.open(googleSheetsAuthorize)
                          )
                        }
                      >
                        Connect Google Sheets
                      </Button>
                    )
                  }
                </Mutation>
              )}
            </Query>
          </div>
        </Container>
      )
    }
  </Query>
);

export default Settings;
