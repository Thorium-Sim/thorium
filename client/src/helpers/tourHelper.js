import React from "react";
import ReactDOM from "react-dom";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Tour from "reactour";
import FontAwesome from "react-fontawesome";
import IntlProvider from "./intl";
import "./tourHelper.scss";

const synth = window.speechSynthesis;

const TourHelper = ({
  client = {},
  steps,
  training: propsTraining,
  onRequestClose
}) => {
  const speak = stepNum => {
    synth.cancel();
    const step = steps[stepNum - 1];
    if (typeof step.content === "string") {
      return synth.speak(new SpeechSynthesisUtterance(step.content));
    }
    const div = document.createElement("div");
    // Process the training, in case it's a react element.
    ReactDOM.render(<IntlProvider>{step.content}</IntlProvider>, div);
    setTimeout(
      () => synth.speak(new SpeechSynthesisUtterance(div.innerText)),
      100
    );
  };
  let { training, id } = client;
  if (!training) training = propsTraining;

  return (
    <Mutation
      mutation={gql`
        mutation ClientSetTraining($id: ID!, $training: Boolean!) {
          clientSetTraining(client: $id, training: $training)
        }
      `}
      variables={{
        id,
        training: false
      }}
    >
      {action => (
        <Tour
          steps={steps}
          isOpen={training}
          onRequestClose={() => {
            synth.cancel();
            onRequestClose ? onRequestClose() : action();
          }}
          badgeContent={(current, total) => {
            return (
              <div className="tour-speaker" onClick={() => speak(current)}>
                <FontAwesome size="lg" name="volume-up" /> Speak This
              </div>
            );
          }}
        />
      )}
    </Mutation>
  );
};
export default TourHelper;
