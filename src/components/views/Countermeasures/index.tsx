import React from "react";
import {
  Simulator,
  useCountermeasuresSubscription,
  useCountermeasureModulesQuery,
} from "generated/graphql";
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
  const {data: modulesData} = useCountermeasureModulesQuery();
  const moduleTypes = modulesData?.countermeasureModuleType || [];

  if (loading || !data) return null;
  const {countermeasuresUpdate: countermeasures} = data;
  if (!countermeasures) return <div>No Template</div>;
  console.log(countermeasures, moduleTypes);
  return <div className="card-template">Template Card</div>;
};
export default Template;
