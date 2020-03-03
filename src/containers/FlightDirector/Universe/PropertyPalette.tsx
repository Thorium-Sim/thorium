import React from "react";
import {
  Entity,
  IdentityComponent,
  useEntitySetIdentityMutation,
} from "generated/graphql";
import {Label, Input, Collapse} from "reactstrap";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";

interface IdentityEditProps {
  id: string;
  identity: IdentityComponent | null | undefined;
}
const IdentityEdit: React.FC<IdentityEditProps> = ({id, identity}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(identity?.name || "");

  const [setName] = useEntitySetIdentityMutation();

  const unmountHandler = React.useRef(() => {});
  React.useEffect(() => {
    unmountHandler.current = () => {
      console.log("unmount handler", id, value);
      setName({
        variables: {id, name: value},
      });
    };
  }, [id, setName, value]);
  React.useEffect(() => {
    return () => {
      console.log("Unmounting");
      unmountHandler.current();
    };
  }, [id]);
  React.useEffect(() => {
    setValue(identity?.name || "");
  }, [identity]);
  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Identity
      </h3>
      <Collapse isOpen={collapse} timeout={200}>
        <Label>
          Name
          <Input
            type="text"
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
            onBlur={() =>
              setName({
                variables: {id, name: value},
              })
            }
          />
        </Label>
      </Collapse>
    </>
  );
};

interface PropertyPaletteProps {
  selectedEntity: Entity | undefined;
}
const PropertyPalette: React.FC<PropertyPaletteProps> = ({selectedEntity}) => {
  return (
    <div className="control-palette">
      <h2>Property Palette</h2>
      {selectedEntity && (
        <IdentityEdit
          id={selectedEntity.id}
          identity={selectedEntity.identity}
        />
      )}
    </div>
  );
};

export default PropertyPalette;
