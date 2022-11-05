import React from "react";
import {FormGroup, Label} from "helpers/reactstrap";
import GenericSystemConfig from "./Generic";
import {
  useTractorBeamUpdateSubscription,
  useTractorBeamSetCountMutation,
} from "generated/graphql";
import {Button} from "reactstrap";

const TractorBeam = (props: any) => {
  const {simulatorId} = props;
  const {data} = useTractorBeamUpdateSubscription({variables: {simulatorId}});
  const [setCount] = useTractorBeamSetCountMutation();

  const tractorBeam = data?.tractorBeamUpdate?.[0];
  return (
    <GenericSystemConfig {...props}>
      {tractorBeam && (
        <FormGroup className="beams">
          <div>
            <Label style={{display: "inline-block"}}>
              Beams: {tractorBeam.beams.length}
              <div>
                <Button
                  size="sm"
                  active={tractorBeam.beams.length === 1}
                  onClick={() =>
                    setCount({variables: {id: tractorBeam.id, beams: 1}})
                  }
                >
                  1
                </Button>
                <Button
                  size="sm"
                  active={tractorBeam.beams.length === 2}
                  onClick={() =>
                    setCount({variables: {id: tractorBeam.id, beams: 2}})
                  }
                >
                  2
                </Button>
                <Button
                  size="sm"
                  active={tractorBeam.beams.length === 4}
                  onClick={() =>
                    setCount({variables: {id: tractorBeam.id, beams: 4}})
                  }
                >
                  4
                </Button>
              </div>
            </Label>
          </div>
        </FormGroup>
      )}
    </GenericSystemConfig>
  );
};
export default TractorBeam;
