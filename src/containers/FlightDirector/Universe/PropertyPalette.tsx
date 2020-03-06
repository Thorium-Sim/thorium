import React from "react";
import {
  Entity,
  IdentityComponent,
  useEntitySetIdentityMutation,
  useEntitySetAppearanceMutation,
  AppearanceComponent,
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
      setName({
        variables: {id, name: value},
      });
    };
  }, [id, setName, value]);
  React.useEffect(() => {
    return () => {
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

interface AppearanceEditProps {
  id: string;
  appearance: AppearanceComponent | null | undefined;
}

const AppearanceEdit: React.FC<AppearanceEditProps> = ({id, appearance}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const [color, setColor] = React.useState(appearance?.color);

  const [setName] = useEntitySetAppearanceMutation();

  const unmountHandler = React.useRef(() => {});
  React.useEffect(() => {
    unmountHandler.current = () => {
      const variables = {
        id,
        ...(appearance?.color !== color ? {color} : null),
      };
      setName({
        variables,
      });
    };
  }, [id, setName, color, appearance]);
  React.useEffect(() => {
    return () => {
      unmountHandler.current();
    };
  }, [id]);
  React.useEffect(() => {
    setColor(appearance?.color || "");
  }, [appearance]);
  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Appearance
      </h3>
      <Collapse isOpen={collapse} timeout={200}>
        <Label>
          Color
          <Input
            type="color"
            value={color || "#ffffff"}
            onChange={e => {
              setColor(e.target.value);
            }}
            onBlur={() =>
              setName({
                variables: {id, color},
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
        <>
          <IdentityEdit
            id={selectedEntity.id}
            identity={selectedEntity.identity}
          />
          <AppearanceEdit
            id={selectedEntity.id}
            appearance={selectedEntity.appearance}
          />
        </>
      )}
    </div>
  );
};

export default PropertyPalette;
