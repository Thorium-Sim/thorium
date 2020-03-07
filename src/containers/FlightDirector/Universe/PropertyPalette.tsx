import React from "react";
import {
  Entity,
  IdentityComponent,
  useEntitySetIdentityMutation,
  useEntitySetAppearanceMutation,
  useEntitiesSetPositionMutation,
  AppearanceComponent,
  LocationComponent,
  EntityCoordinates,
} from "generated/graphql";
import {Label, Input, Collapse} from "reactstrap";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";

interface LocationEditProps {
  id: string;
  location: LocationComponent;
}
const LocationEdit: React.FC<LocationEditProps> = ({id, location}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<EntityCoordinates>(
    location.position || "",
  );

  const [setEntityPosition] = useEntitiesSetPositionMutation();

  const unmountHandler = React.useRef(() => {});
  React.useEffect(() => {
    unmountHandler.current = () => {
      setEntityPosition({
        variables: {entities: [{id, position}]},
      });
    };
  }, [id, position, setEntityPosition]);
  React.useEffect(() => {
    return () => {
      unmountHandler.current();
    };
  }, [id]);
  React.useEffect(() => {
    setPosition(location.position || "");
  }, [location.position]);
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
            value={position.x}
            onChange={e => {
              const value = e.target.value;
              setPosition(p => ({...p, x: parseInt(value, 10)}));
            }}
            onBlur={() =>
              setEntityPosition({
                variables: {entities: [{id, position}]},
              })
            }
          />
        </Label>
        <Label>
          Y
          <Input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            value={position.y}
            onChange={e => {
              const value = e.target.value;
              setPosition(p => ({...p, y: parseInt(value, 10)}));
            }}
            onBlur={() =>
              setEntityPosition({
                variables: {entities: [{id, position}]},
              })
            }
          />
        </Label>
        <Label>
          Z
          <Input
            type="text"
            inputmode="numeric"
            pattern="[0-9]*"
            value={position.z}
            onChange={e => {
              const value = e.target.value;
              setPosition(p => ({...p, z: parseInt(value, 10)}));
            }}
            onBlur={() =>
              setEntityPosition({
                variables: {entities: [{id, position}]},
              })
            }
          />
        </Label>
      </Collapse>
    </>
  );
};

interface IdentityEditProps {
  id: string;
  identity: IdentityComponent;
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
  appearance: AppearanceComponent;
}

// position will be between 0 and 100
var minp = 1;
var maxp = 100;

// The result should be between 100 an 10000000
var minv = Math.log(1);
var maxv = Math.log(695500000);

// calculate adjustment factor
var logScale = (maxv - minv) / (maxp - minp);
function logslider(position: number) {
  return Math.exp(minv + logScale * (position - minp));
}
function logposition(value: number) {
  return (Math.log(value) - minv) / logScale + minp;
}

const AppearanceEdit: React.FC<AppearanceEditProps> = ({id, appearance}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const [color, setColor] = React.useState(appearance?.color);
  const [scale, setScale] = React.useState(appearance?.scale);

  const [setAppearance] = useEntitySetAppearanceMutation();

  const unmountHandler = React.useRef(() => {});
  React.useEffect(() => {
    unmountHandler.current = () => {
      const variables = {
        id,
        ...(appearance?.color !== color ? {color} : null),
      };
      setAppearance({
        variables,
      });
    };
  }, [id, setAppearance, color, appearance]);
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
              setAppearance({
                variables: {id, color},
              })
            }
          />
        </Label>
        <Label>
          Scale ({Math.round(scale || 1)})
          <Input
            style={{width: "100%"}}
            type="range"
            value={logposition(scale ?? 1)}
            min={1}
            max={100}
            step={0.01}
            onChange={e => {
              setScale(logslider(parseFloat(e.target.value)));
            }}
            onMouseUp={() =>
              setAppearance({
                variables: {id, scale},
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
          {selectedEntity.identity && (
            <IdentityEdit
              id={selectedEntity.id}
              identity={selectedEntity.identity}
            />
          )}
          {selectedEntity.appearance && (
            <AppearanceEdit
              id={selectedEntity.id}
              appearance={selectedEntity.appearance}
            />
          )}
          {selectedEntity.location && (
            <LocationEdit
              id={selectedEntity.id}
              location={selectedEntity.location}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PropertyPalette;
