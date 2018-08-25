import React, { Component } from "react";
import { Asset } from "../../../../../helpers/assets";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

class Video extends Component {
  player = React.createRef();
  componentDidUpdate() {
    const { playbackSpeed = 1 } = this.props;
    if (this.player.current) {
      this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
      setTimeout(() => {
        if (this.player.current)
          this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
      }, 50);
    }
  }
  componentDidMount() {
    this.videoToggleSub = this.props.client
      .subscribe({
        query: gql`
          subscription ToggleVideo($simulatorId: ID) {
            viewscreenVideoToggle(simulatorId: $simulatorId)
          }
        `,
        variables: { simulatorId: this.props.simulatorId }
      })
      .subscribe({
        next: ({ data: { viewscreenVideoToggle } }) => {
          this.player.current.paused === false
            ? this.player.current.pause()
            : this.player.current.play();
        },
        error(err) {
          console.error("Error in subscription", err);
        }
      });
    const { playbackSpeed = 1 } = this.props;
    if (this.player.current)
      this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
    setTimeout(() => {
      if (this.player.current)
        this.player.current.playbackRate = parseFloat(playbackSpeed) || 1;
    }, 300);
  }
  componentWillUnmount() {
    this.videoToggleSub && this.videoToggleSub.unsubscribe();
  }
  render() {
    const {
      advance,
      loop,
      asset = "/Viewscreen/Videos/Ship Scans",
      autoplay,
      opacity,
      simulatorId
    } = this.props;
    const videoEnd = () => {
      if (!advance) return;
      const variables = {
        simulatorId
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
      <div className={`tactical-map-video`} style={{ opacity }}>
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
