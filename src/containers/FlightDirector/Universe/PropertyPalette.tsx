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
import {throttle} from "helpers/debounce";

interface LocationEditProps {
  id: string;
  location: LocationComponent;
}
const LocationEdit: React.FC<LocationEditProps> = ({id, location}) => {
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

interface IdentityEditProps {
  id: string;
  identity: IdentityComponent;
}
const IdentityEdit: React.FC<IdentityEditProps> = ({id, identity}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  const [setName] = useEntitySetIdentityMutation();

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
            value={identity.name || ""}
            onChange={e => {
              setName({
                variables: {id, name: e.target.value},
              });
            }}
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

  React.useEffect(() => {
    setColor(appearance?.color || "");
    setScale(appearance?.scale);
  }, [appearance]);

  const [setAppearance] = useEntitySetAppearanceMutation();
  const throttleSetAppearance = React.useCallback(
    throttle(setAppearance, 250),
    [],
  );

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
              throttleSetAppearance({
                variables: {id, color: e.target.value},
              });
            }}
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
              throttleSetAppearance({
                variables: {id, scale: logslider(parseFloat(e.target.value))},
              });
            }}
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
