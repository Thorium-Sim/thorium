import React from "react";
import ReactDOM from "react-dom";
import {useMutation} from "react-apollo";
import gql from "graphql-tag.macro";
import Tour from "reactour";
import IntlProvider from "./intl";
import "./tourHelper.scss";
import {FaVolumeUp} from "react-icons/fa";
import {ClientContext} from "components/client/client";
import {isMedia} from "../components/client/Card";

const synth = window.speechSynthesis;

const SET_CLIENT_TRAINING = gql`
  mutation ClientSetTraining($id: ID!, $training: Boolean!) {
    clientSetTraining(client: $id, training: $training)
  }
`;

const TourHelper = ({
  steps,
  training: propsTraining = undefined,
  onRequestClose = null,
}) => {
  const {client = {}, station = {}, simulator = {}} = React.useContext(
    ClientContext,
  );

  const speak = stepNum => {
    synth && synth.cancel();
    const step = steps[stepNum - 1];
    if (typeof step.content === "string") {
      return synth.speak(new SpeechSynthesisUtterance(step.content));
    }
    const div = document.createElement("div");
    // Process the training, in case it's a react element.
    ReactDOM.render(<IntlProvider>{step.content}</IntlProvider>, div);
    setTimeout(
      () => synth.speak(new SpeechSynthesisUtterance(div.innerText)),
      100,
    );
  };
  let {id} = client;
  let training = propsTraining ?? client.training;

  const [setClientTraining] = useMutation(SET_CLIENT_TRAINING, {
    variables: {id, training: false},
  });

  // If we are in training mode and the station has audio or video training, don't show the tour.
  if (station.training && isMedia(station.training) && simulator.training)
    return null;
  if (!steps) return null;
  return (
    <Tour
      steps={steps}
      isOpen={training || false}
      onAfterOpen={target => {
        const node = document.getElementById("___reactour");
        if (node) {
          node.style.transform = "translateZ(-10px)";
        }
      }}
      onRequestClose={() => {
        synth && synth.cancel();
        onRequestClose ? onRequestClose() : setClientTraining();
      }}
      badgeContent={(current, total) => {
        return (
          <div className="tour-speaker" onClick={() => speak(current)}>
            <FaVolumeUp size="1em" /> Speak This
          </div>
        );
      }}
    />
  );
};
export default TourHelper;
