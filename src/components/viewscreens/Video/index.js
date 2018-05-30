import React, { Component } from "react";
import { Asset } from "../../../helpers/assets";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import "./style.css";

class VideoConfig extends Component {
  player = React.createRef();
  componentDidUpdate() {
    const data = JSON.parse(this.props.viewscreen.data);
    if (this.player.current) {
      this.player.current.playbackRate = parseFloat(data.speed) || 1;
      setTimeout(() => {
        this.player.current.playbackRate = parseFloat(data.speed) || 1;
      }, 50);
    }
  }
  componentDidMount() {
    const data = JSON.parse(this.props.viewscreen.data);
    if (this.player.current)
      this.player.current.playbackRate = parseFloat(data.speed) || 1;
  }
  render() {
    const data = JSON.parse(this.props.viewscreen.data);
    const videoEnd = () => {
      if (!data.advance) return;
      const variables = {
        simulatorId: this.props.simulator.id
      };
      const mutation = gql`
        mutation AdvanceTimeline($simulatorId: ID!) {
          autoAdvance(simulatorId: $simulatorId)
        }
      `;
      this.props.client.mutate({
        mutation,
        variables
      });
    };

    return (
      <div className={`viewscreen-video ${data.overlay ? "overlay" : ""}`}>
        <Asset asset={data.asset || "/Viewscreen/Videos/Ship Scans"}>
          {({ src }) => (
            <video
              ref={this.player}
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
  }
}

export default withApollo(VideoConfig);
