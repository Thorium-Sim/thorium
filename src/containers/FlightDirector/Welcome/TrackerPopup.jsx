import React, {Fragment, useState} from "react";
import {Button, Alert} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import {Mutation} from "react-apollo";


const TrackerPopup = ({askedToTrack}) => {
  const [clickedTrack, setClickedTrack] = useState(false);
  return (
    !askedToTrack &&
    !clickedTrack && (
      <Alert color={"info"}>Would you like opt-in to share some analytics data about Thorium with the developer? You can opt-out at any time from the Settings sidebar menu.
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          <Mutation
            mutation={gql`
              mutation SetTrackingPreference($pref: Boolean!) {
                setTrackingPreference(pref: $pref)
              }
            `}
          >
            {action => (
              <Fragment>
                <Button
                  outline
                  color="secondary"
                  onClick={() => {
                    action({variables: {pref: false}});
                    setClickedTrack(true);
                  }}
                  style={{marginRight: "20px"}}
                >
                  No Thanks
                </Button>
                <Button
                  outline
                  color="secondary"
                  onClick={() => {
                    action({variables: {pref: true}});
                    setClickedTrack(true);
                  }}
                >
                  Track Me
                </Button>
              </Fragment>
            )}
          </Mutation>
        </div>
      </Alert>
    )
  );
};

export default TrackerPopup;
