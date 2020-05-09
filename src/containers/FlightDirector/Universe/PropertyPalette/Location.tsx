import React from "react";
import {
  useEntitiesSetPositionMutation,
  useEntitySetLocationMutation,
  LocationComponent,
} from "generated/graphql";
import {Label, Input, Collapse, Button, ButtonGroup} from "reactstrap";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";
import {Quaternion, Vector3} from "three";
// import {throttle} from "helpers/debounce";

interface LocationEditProps {
  id: string;
  location: LocationComponent;
}

const NumberInput: React.FC<{
  label: string;
  value: number;
  setValue: (v: number) => void;
}> = ({label, value, setValue}) => {
  return (
    <Label>
      {label}
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        defaultValue={value}
        onChange={e => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) {
            setValue(v);
          }
        }}
      />
    </Label>
  );
};

// const RangeInput: React.FC<{
//   label: string;
//   value: number;
//   min: number;
//   max: number;
//   step: number;
//   setValue: (v: number) => void;
//   mouseUp?: () => void;
// }> = ({label, value, min, max, step, setValue, mouseUp}) => {
//   return (
//     <Label>
//       {label}
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         // label="Yaw"
//         value={value}
//         onChange={e => {
//           const v = parseFloat(e.target.value);
//           setValue(v);
//         }}
//         onMouseUp={mouseUp}
//       />
//     </Label>
//   );
// };

const Location: React.FC<LocationEditProps> = ({id, location}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  const [setEntityPosition] = useEntitiesSetPositionMutation();
  const [setEntityLocation] = useEntitySetLocationMutation();

  const setRotation = React.useRef<Function>();
  React.useEffect(() => {
    setRotation.current = (key: "x" | "y" | "z", v: number = Math.PI / 10) => {
      const axisAngle = new Vector3();
      axisAngle[key] = 1;
      const angleQuaternion = new Quaternion().setFromAxisAngle(axisAngle, v);

      const quaternion = new Quaternion(
        location.rotation.x,
        location.rotation.y,
        location.rotation.z,
        location.rotation.w,
      );
      quaternion.multiply(angleQuaternion);
      setEntityLocation({
        variables: {
          id,
          rotation: {
            x: quaternion.x,
            y: quaternion.y,
            z: quaternion.z,
            w: quaternion.w,
          },
        },
      });
    };
  }, [
    id,
    location.rotation.w,
    location.rotation.x,
    location.rotation.y,
    location.rotation.z,
    setEntityLocation,
  ]);

  const clear = React.useCallback(() => {
    document.removeEventListener("mouseup", clear);
    clearInterval(interval.current);
  }, []);
  const buttonHandler = React.useCallback(
    (key, value) => {
      return () => {
        clearInterval(interval.current);
        interval.current = (setInterval(
          () => setRotation.current?.(key, value),
          100,
        ) as unknown) as number;
        document.addEventListener("mouseup", clear);
      };
    },
    [clear],
  );

  let interval = React.useRef<number>();
  React.useEffect(() => {
    const intervalVal = interval.current;
    return () => clearInterval(intervalVal);
  }, []);

  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Location
      </h3>
      <Collapse isOpen={collapse} timeout={100}>
        <h4>Position</h4>
        <NumberInput
          key={`${id}-X`}
          label="X"
          value={location.position.x}
          setValue={v =>
            setEntityPosition({
              variables: {
                entities: [{id, position: {...location.position, x: v}}],
              },
            })
          }
        />
        <NumberInput
          key={`${id}-Y`}
          label="Y"
          value={location.position.y}
          setValue={v =>
            setEntityPosition({
              variables: {
                entities: [{id, position: {...location.position, y: v}}],
              },
            })
          }
        />
        <NumberInput
          key={`${id}-Z`}
          label="Z"
          value={location.position.z}
          setValue={v =>
            setEntityPosition({
              variables: {
                entities: [{id, position: {...location.position, z: v}}],
              },
            })
          }
        />
        <h4>Rotation</h4>
        <Button
          size="sm"
          onClick={() => {
            setEntityLocation({
              variables: {id, rotation: {x: 0, y: 0, z: 0, w: 1}},
            });
          }}
        >
          Reset Rotation
        </Button>
        <Label>
          Yaw
          <div>
            <ButtonGroup>
              <Button size="sm" onMouseDown={buttonHandler("z", Math.PI / 18)}>
                -
              </Button>
              <Button size="sm" onMouseDown={buttonHandler("z", -Math.PI / 18)}>
                +
              </Button>
            </ButtonGroup>
          </div>
        </Label>
        <Label>
          Pitch
          <div>
            <ButtonGroup>
              <Button size="sm" onMouseDown={buttonHandler("x", Math.PI / 18)}>
                -
              </Button>
              <Button size="sm" onMouseDown={buttonHandler("x", -Math.PI / 18)}>
                +
              </Button>
            </ButtonGroup>
          </div>
        </Label>
        <Label>
          Roll
          <div>
            <ButtonGroup>
              <Button size="sm" onMouseDown={buttonHandler("y", Math.PI / 18)}>
                -
              </Button>
              <Button size="sm" onMouseDown={buttonHandler("y", -Math.PI / 18)}>
                +
              </Button>
            </ButtonGroup>
          </div>
        </Label>
      </Collapse>
    </>
  );
};

export default Location;
