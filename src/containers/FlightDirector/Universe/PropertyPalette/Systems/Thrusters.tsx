import React from "react";
import {
  useEntitySetThrustersMutation,
  useEntityRemoveThrustersMutation,
  ThrustersComponent,
} from "generated/graphql";
import {Label, Input} from "reactstrap";
interface ThrustersProps {
  id: string;
  thrusters?: ThrustersComponent;
}

const Thrusters: React.FC<ThrustersProps> = ({id, thrusters}) => {
  const [setThrusters] = useEntitySetThrustersMutation();
  const [removeThrusters] = useEntityRemoveThrustersMutation();
  return (
    <div>
      <Label style={{paddingLeft: "1rem"}}>
        <h3>
          <Input
            type="checkbox"
            checked={Boolean(thrusters)}
            onChange={e => {
              if (e.target.checked) {
                setThrusters({variables: {id}});
              } else {
                removeThrusters({variables: {id}});
              }
            }}
          />{" "}
          Thrusters
        </h3>
      </Label>
    </div>
  );
};

export default Thrusters;
