import React from "react";
import gql from "graphql-tag.macro";
// import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";
import "./style.scss";
import {MidiProvider} from "helpers/midi";

const fragment = gql`
  fragment TemplateData on Template {
    id
  }
`;

export const TEMPLATE_QUERY = gql`
  query Template($simulatorId: ID!) {
    _template(simulatorId: $simulatorId) {
      ...TemplateData
    }
  }
  ${fragment}
`;
export const TEMPLATE_SUB = gql`
  subscription TemplateUpdate($simulatorId: ID!) {
    _templateUpdate(simulatorId: $simulatorId) {
      ...TemplateData
    }
  }
  ${fragment}
`;

const MidiCore = props => {
  // const {simulator} = props;
  // const {loading, data} = useQueryAndSubscription(
  //   {query: TEMPLATE_QUERY, variables: {simulatorId: simulator.id}},
  //   {query: TEMPLATE_SUB, variables: {simulatorId: simulator.id}},
  // );

  // if (loading || !data) return null;
  // const {template} = data;
  // if (!template) return <div>No Template</div>;
  return (
    <MidiProvider>
      <div className="card-template">
        MIDI Control
        {/* <AlertConditionSlider simulator={props.simulator} />
        <AlertConditionButton
          simulator={props.simulator}
          level={"1"}
          controllerNumber={73}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"2"}
          controllerNumber={74}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"3"}
          controllerNumber={75}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"4"}
          controllerNumber={76}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"5"}
          controllerNumber={77}
        />
        <AlertConditionButton
          simulator={props.simulator}
          level={"p"}
          controllerNumber={78}
        /> */}
      </div>
    </MidiProvider>
  );
};
export default MidiCore;
