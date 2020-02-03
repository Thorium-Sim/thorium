import React from "react";
import {Simulator, useCountermeasuresSubscription} from "generated/graphql";
import "./style.scss";

interface TemplateProps {
  children: React.ReactNode;
  simulator: Simulator;
}

const Template: React.FC<TemplateProps> = props => {
  const {simulator} = props;
  const {loading, data} = useCountermeasuresSubscription({
    variables: {simulatorId: simulator.id},
  });

  if (loading || !data) return null;
  const {countermeasuresUpdate} = data;
  if (!countermeasuresUpdate) return <div>No Template</div>;
  return <div className="core-template">Template Core</div>;
};
export default Template;
