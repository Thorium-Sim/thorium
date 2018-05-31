import React, { Component } from "react";
import { Asset } from "../../../../../helpers/assets";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

class Video extends Component {
  player = React.createRef();
  componentDidUpdate() {
    const { playbackSpeed = 1 } = this.props;
    console.log(playbackSpeed);
    if (this.player.current) {
      this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
      setTimeout(() => {
        this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
      }, 50);
    }
  }
  componentDidMount() {
    const { playbackSpeed = 1 } = this.props;
    if (this.player.current)
      this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
    console.log(this.props);
    setTimeout(() => {
      if (this.player.current)
        this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
    }, 300);
  }
  render() {
    const {
      advance,
      loop,
      asset = "/Viewscreen/Videos/Ship Scans",
      autoplay
    } = this.props;
    const videoEnd = () => {
      if (!advance) return;
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
      <div className={`tactical-map-video`}>
        <Asset asset={asset}>
          {({ src }) => (
            <video
              ref={this.player}
              src={`${window.location.origin}${src}`}
              autoPlay={autoplay !== false || true}
              muted
              loop={loop}
              onEnded={videoEnd}
            />
          )}
        </Asset>
      </div>
    );
  }
}

export default withApollo(Video);
