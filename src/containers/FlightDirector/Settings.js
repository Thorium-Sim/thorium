import { Query, Mutation, useQuery } from "@apollo/client";
import React from "react";
import {Container, Button, Input} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import "./settings.scss";
const QUERY = gql`
  query Thorium {
    thorium {
      thoriumId
      doTrack
      spaceEdventuresToken
      spaceEdventuresCenter {
        id
        name
      }
      port
      httpOnly
    }
  }
`;

const GoogleSheetsQuery = gql`
  query HasToken {
    googleSheets
  }
`;

const FirebaseManagerQuery = gql`
  query HasFirebase {
    hasFirebaseConnection
  }
`
const Settings = () => {
  const {loading, data} = useQuery(QUERY);

  if (loading) return <p>Loading</p>;

  return (
    <Container className="fd-settings">
      <h1>Settings</h1>
      <section>
        <h3>
          Thorium ID:{" "}
          <span className="selectable">
            {data.thorium && data.thorium.thoriumId}
          </span>
        </h3>
      </section>
      <section>
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
                  onChange={e => action({variables: {pref: e.target.checked}})}
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
      </section>
      <section>
        <div>
          <label>
            <h2>Space EdVentures Token</h2>
            <Mutation
              mutation={gql`
                mutation setSpaceEdventuresToken($token: String!) {
                  setSpaceEdventuresToken(token: $token) {
                    id
                    name
                  }
                }
              `}
              refetchQueries={[{query: QUERY}]}
            >
              {action => (
                <input
                  defaultValue={data.thorium.spaceEdventuresToken}
                  type="password"
                  onBlur={e => action({variables: {token: e.target.value}})}
                />
              )}
            </Mutation>
          </label>
          <div>
            <small>
              This allows flights flown using this Thorium server to be
              transmitted to spaceedventures.org for participants to track their
              ranks.
            </small>
          </div>
          {data.thorium.spaceEdventuresCenter &&
            data.thorium.spaceEdventuresCenter.id && (
              <div>
                <h4>
                  Connected to SpaceEdventures.org center:{" "}
                  {data.thorium.spaceEdventuresCenter.name}
                </h4>
              </div>
            )}
        </div>
      </section>
      <section>
        <div>
          <h3>Google Sheets Connections</h3>
          <Query query={GoogleSheetsQuery}>
            {({loading, data}) => {
              if (loading || !data) return null;
              const {googleSheets} = data;
              return (
                <Mutation
                  mutation={gql`
                    mutation Authorize {
                      googleSheetsAuthorize
                    }
                  `}
                >
                  {(action, {data}) =>
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
                          refetchQueries={[{query: GoogleSheetsQuery}]}
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
                            refetchQueries={[{query: GoogleSheetsQuery}]}
                          >
                            {complete => (
                              <Input
                                onChange={e =>
                                  complete({
                                    variables: {token: e.target.value},
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
                          action().then(({data: {googleSheetsAuthorize}}) =>
                            window.open(googleSheetsAuthorize),
                          )
                        }
                      >
                        Connect Google Sheets
                      </Button>
                    )
                  }
                </Mutation>
              );
            }}
          </Query>
        </div>
      </section>
      <section>
        <h3>EVA (EdVentures App) Integration</h3>
        <div>Connecting to EVA requires adding a firebase.json file to your Documents/thorium folder.</div>
        <Query query={FirebaseManagerQuery}>
          {({ loading, data }) => {
            if (loading || !data) return null;
            const { hasFirebaseConnection } = data;
            return (
              <div style={{ marginTop: '1rem' }}>
                {hasFirebaseConnection ? (
                  <p><span aria-label="Rocket ship" role="img">🚀</span> Connected to EVA <span aria-label="Rocket ship" role="img">🚀</span></p>
                ) : (
                  <p>Not connected to EVA. If you would like to use the EVA integration, please check your firebase.json file and restart the server.</p>
                )}
              </div>
            );
          }}
        </Query>
      </section>
    </Container>
  );
};

export default Settings;
