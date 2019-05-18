import React, { Component } from "react";
import gql from "graphql-tag.macro";
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
    if (this.props.viewscreen) {
      this.videoToggleSub = this.props.client
        .subscribe({
          query: gql`
            subscription ToggleVideo($viewscreenId: ID) {
              viewscreenVideoToggle(viewscreenId: $viewscreenId)
            }
          `,
          variables: { viewscreenId: this.props.viewscreen.id }
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
    }
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
        <video
          ref={this.player}
          src={`/assets${asset}`}
          autoPlay={autoplay !== false || true}
          muted
          loop={loop}
          onEnded={videoEnd}
        />
      </div>
    );
  }
}

export default withApollo(Video);
