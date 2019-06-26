import React, { Fragment, Component } from "react";
import gql from "graphql-tag.macro";
import { Subscription } from "react-apollo";
import playSound from "../generic/SoundPlayer";

const SOUND_SUB = gql`
  subscription SoundSub($clientId: ID!) {
    soundSub(clientId: $clientId) {
      id
      url
      asset
      volume
      playbackRate
      channel
      looping
    }
  }
`;

const CANCEL_SOUNDS = gql`
  subscription CancelSounds($clientId: ID!) {
    cancelSound(clientId: $clientId)
  }
`;

const CANCEL_ALL_SOUNDS = gql`
  subscription CancelSounds($clientId: ID!) {
    cancelAllSounds(clientId: $clientId)
  }
`;

const STOP_LOOPING = gql`
  subscription CancelLooping($clientId: ID!) {
    cancelLoopingSounds(clientId: $clientId)
  }
`;

class SoundController extends Component {
  shouldComponentUpdate(prevProps) {
    if (prevProps.clientId !== this.props.clientId) return true;
    return false;
  }
  render() {
    const { clientId } = this.props;
    return (
      <Fragment>
        <Subscription subscription={SOUND_SUB} variables={{ clientId }}>
          {({ data = {} }) => {
            const { soundSub } = data;
            if (soundSub) this.props.playSound(soundSub);
            return null;
          }}
        </Subscription>
        <Subscription subscription={STOP_LOOPING} variables={{ clientId }}>
          {({ data = {} }) => {
            const { cancelLoopingSounds } = data;
            if (cancelLoopingSounds) this.props.stopLooping();
            return null;
          }}
        </Subscription>
        <Subscription subscription={CANCEL_SOUNDS} variables={{ clientId }}>
          {({ data = {} }) => {
            const { cancelSound } = data;
            if (cancelSound) this.props.removeSound(cancelSound);
            return null;
          }}
        </Subscription>
        <Subscription subscription={CANCEL_ALL_SOUNDS} variables={{ clientId }}>
          {({ data }) => {
            this.props.removeAllSounds();
            return null;
          }}
        </Subscription>
      </Fragment>
    );
  }
}

export default playSound(SoundController);
