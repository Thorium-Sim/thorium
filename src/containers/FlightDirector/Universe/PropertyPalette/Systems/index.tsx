import React from "react";
import {
  EngineComponent,
  ThrustersComponent,
  EntityEngineEnum,
} from "generated/graphql";
import {Collapse} from "reactstrap";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import Engines from "./Engines";
import Thrusters from "./Thrusters";

interface SystemsEditProps {
  id: string;
  enginesWarp?: EngineComponent;
  enginesImpulse?: EngineComponent;
  thrusters?: ThrustersComponent;
}

const Systems: React.FC<SystemsEditProps> = ({
  id,
  enginesImpulse,
  enginesWarp,
  thrusters,
}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Systems
      </h3>
      <Collapse isOpen={collapse} timeout={100}>
        <Engines
          id={id}
          type={EntityEngineEnum.Impulse}
          engine={enginesImpulse}
        />
        <Engines id={id} type={EntityEngineEnum.Warp} engine={enginesWarp} />
        <Thrusters id={id} thrusters={thrusters} />
      </Collapse>
    </>
  );
};

export default Systems;
