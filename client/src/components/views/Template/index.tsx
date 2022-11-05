import React from "react";
import {Simulator, useTemplateUpdateSubscription} from "generated/graphql";
import "./style.scss";

interface TemplateProps {
  children: React.ReactNode;
  simulator: Simulator;
}

const Template: React.FC<TemplateProps> = props => {
  const {simulator} = props;
  const {loading, data} = useTemplateUpdateSubscription({
    variables: {simulatorId: simulator.id},
  });

  if (loading || !data) return null;
  const {_templateUpdate: template} = data;
  if (!template) return <div>No Template</div>;
  return <div className="card-template">Template Card</div>;
};
export default Template;
