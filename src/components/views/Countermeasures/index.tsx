import React from "react";
import {
  Simulator,
  useCountermeasuresSubscription,
  useCountermeasureModulesQuery,
  CountermeasureSlot,
} from "generated/graphql";
import {ReactComponent as CenterSVG} from "./countermeasure-center.svg";
import "./style.scss";

interface CenterProps {
  setSlot: (nextState: string) => void;
  slot: string | null;
  slots: CountermeasureSlot;
}
const Center: React.FC<CenterProps> = ({slots, slot, setSlot}) => {
  return (
    <>
      {Object.entries(slots)
        .filter(([key]) => key !== "__typename")
        .map(([key, value]) => (
          <div
            className={`slot ${key} ${slot === key ? "selected" : ""}`}
            style={{
              ["--end-angle" as any]:
                typeof value !== "string" && value?.building
                  ? `${(value.buildPercentage || 0) * 100}%`
                  : "0%",
            }}
            onClick={() => setSlot(key)}
          ></div>
        ))}
      <CenterSVG />
    </>
  );
};

interface CountermeasuresProps {
  children: React.ReactNode;
  simulator: Simulator;
}

const Countermeasures: React.FC<CountermeasuresProps> = props => {
  const {simulator} = props;
  const {loading, data} = useCountermeasuresSubscription({
    variables: {simulatorId: simulator.id},
  });
  const {data: modulesData} = useCountermeasureModulesQuery();
  const moduleTypes = modulesData?.countermeasureModuleType || [];
  const [slot, setSlot] = React.useState<string | null>(null);
  if (loading || !data) return <div>No Countermeasures System</div>;
  const {countermeasuresUpdate: countermeasures} = data;
  if (!countermeasures) return <div>No Countermeasures System</div>;
  console.log(countermeasures, moduleTypes);
  return (
    <div className="card-countermeasures">
      <div className="center">
        <Center
          slots={countermeasures.slots as CountermeasureSlot}
          slot={slot}
          setSlot={setSlot}
        />
      </div>
    </div>
  );
};
export default Countermeasures;
