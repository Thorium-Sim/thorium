import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import "./style.scss";

class VideoConfig extends Component {
  player = React.createRef();
  componentDidUpdate() {
    const data = JSON.parse(this.props.viewscreen.data);
    if (this.player.current) {
      this.player.current.playbackRate = parseFloat(data.speed) || 1;
      setTimeout(() => {
        if (this.player.current) {
          this.player.current.playbackRate = parseFloat(data.speed) || 1;
        }
      }, 50);
    }
  }
  componentDidMount() {
    const data = JSON.parse(this.props.viewscreen.data);
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
        next: () => {
          this.player.current.paused === false
            ? this.player.current.pause()
            : this.player.current.play();
        },
        error(err) {
          console.error("Error in subscription", err);
        }
      });
    if (this.player.current)
      this.player.current.playbackRate = parseFloat(data.speed) || 1;
    setTimeout(() => {
      if (this.player.current)
        this.player.current.playbackRate = parseFloat(data.speed) || 1;
    }, 300);
    document.addEventListener("keydown", this.keypress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keypress);
    this.videoToggleSub && this.videoToggleSub.unsubscribe();
  }
  keypress = evt => {
    if (evt.code === "Space") {
      this.props.viewscreen &&
        this.props.viewscreen.id &&
        this.props.client.mutate({
          mutation: gql`
            mutation ToggleVideo($viewscreenId: ID) {
              toggleViewscreenVideo(viewscreenId: $viewscreenId)
            }
          `,
          variables: { viewscreenId: this.props.viewscreen.id }
        });
    }
  };
  render() {
    const { core } = this.props;
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
        <video
          ref={this.player}
          src={`/assets${data.asset || "/Viewscreen/Videos/Ship Scans"}`}
          autoPlay={data.autoplay}
          muted={core}
          loop={data.loop}
          onEnded={videoEnd}
        />
      </div>
    );
  }
}

export default withApollo(VideoConfig);
