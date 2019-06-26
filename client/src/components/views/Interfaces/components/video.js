import React, { useRef, useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export const CompVideo = ({ id, interfaceId, config = {}, value = {} }) => {
  const { autoPlay = true, loop = true } = config;
  const { playing = autoPlay } = value;
  const videoRef = useRef();
  useEffect(() => {
    if (playing) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playing]);
  return (
    <Mutation
      mutation={gql`
        mutation TriggerInterface($id: ID!, $objectId: ID!) {
          triggerInterfaceObject(id: $id, objectId: $objectId)
        }
      `}
      variables={{ id: interfaceId, objectId: id }}
    >
      {action => (
        <div onClick={() => action().catch(err => console.log(err))}>
          <video
            ref={videoRef}
            src={`/assets${config.src}`}
            style={{
              width: `${config.width || 50}px`,
              height: config.height ? `${config.height}px` : null,
              objectFit: "fill"
            }}
            autoPlay={playing || autoPlay}
            muted
            loop={loop}
            playsInline
            alt={config.label}
            draggable={false}
          />
        </div>
      )}
    </Mutation>
  );
};
