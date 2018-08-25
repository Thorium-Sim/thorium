import React, { Component } from "react";
import { Asset } from "../../../helpers/assets";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import "./style.scss";

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
    this.videoToggleSub = this.props.client
      .subscribe({
        query: gql`
          subscription ToggleVideo($simulatorId: ID) {
            viewscreenVideoToggle(simulatorId: $simulatorId)
          }
        `,
        variables: { simulatorId: this.props.simulator.id }
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
      this.props.client.mutate({
        mutation: gql`
          mutation ToggleVideo($simulatorId: ID!) {
            toggleViewscreenVideo(simulatorId: $simulatorId)
          }
        `,
        variables: { simulatorId: this.props.simulator.id }
      });
    }
  };
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
              autoPlay={data.autoplay}
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
