import React from "react";
import {
  useEntitiesSetPositionMutation,
  LocationComponent,
} from "generated/graphql";
import {Label, Input, Collapse} from "reactstrap";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";

interface LocationEditProps {
  id: string;
  location: LocationComponent;
}
const Location: React.FC<LocationEditProps> = ({id, location}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  const [setEntityPosition] = useEntitiesSetPositionMutation();

  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Location
      </h3>
      <Collapse isOpen={collapse} timeout={200}>
        <h4>Position</h4>
        <Label>
          X
          <Input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            value={location.position.x}
            onChange={e => {
              const value = parseInt(e.target.value, 10);
              setEntityPosition({
                variables: {
                  entities: [{id, position: {...location.position, x: value}}],
                },
              });
            }}
          />
        </Label>
        <Label>
          Y
          <Input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            value={location.position.y}
            onChange={e => {
              const value = parseInt(e.target.value, 10);
              setEntityPosition({
                variables: {
                  entities: [{id, position: {...location.position, y: value}}],
                },
              });
            }}
          />
        </Label>
        <Label>
          Z
          <Input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            value={location.position.z}
            onChange={e => {
              const value = parseInt(e.target.value, 10);
              setEntityPosition({
                variables: {
                  entities: [{id, position: {...location.position, z: value}}],
                },
              });
            }}
          />
        </Label>
      </Collapse>
    </>
  );
};

export default Location;
