import React from "react";
import { Asset } from "../../../helpers/assets";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import "./style.css";

const VideoConfig = props => {
  const data = JSON.parse(props.viewscreen.data);
  const videoEnd = () => {
    if (!data.advance) return;
    const variables = {
      simulatorId: props.simulator.id
    };
    const mutation = gql`
      mutation AdvanceTimeline($simulatorId: ID!) {
        autoAdvance(simulatorId: $simulatorId)
      }
    `;
    props.client.mutate({
      mutation,
      variables
    });
  };
  return (
    <div className={`viewscreen-video ${data.overlay ? "overlay" : ""}`}>
      <Asset asset={data.asset || "/Viewscreen/Videos/Ship Scans"}>
        {({ src }) => (
          <video
            src={`${window.location.origin}${src}`}
            autoPlay={data.autoplay !== false || true}
            muted
            loop={data.loop}
            onEnded={videoEnd}
          />
        )}
      </Asset>
    </div>
  );
};

export default withApollo(VideoConfig);
