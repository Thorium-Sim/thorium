import React, {Fragment} from "react";
import {Row, Col, Input, Label, FormGroup, Button} from "helpers/reactstrap";
import {ChromePicker} from "react-color";

import ImageConfig from "./imageConfig";
import ObjectConfig from "./objectConfig";
import PathConfig from "./pathConfig";
import VideoConfig from "./videoConfig";
import {
  useUpdateLayerMutation,
  useAddTacticalItemMutation,
  Tactical_Types,
  TacticalLayer,
  TacticalMap,
} from "generated/graphql";
import {useApolloClient} from "@apollo/client";

const configs = {
  gridConfig: ({
    selectedLayer,
    updateLayer,
  }: {
    tacticalMapId: any;
    layerId: any;
    objectId: any;
    client: any;
    updateObject: any;
    removeObject: any;
    selectedLayer?: TacticalLayer;
    updateLayer: Function;
  }) => {
    return (
      <Row>
        <Col>
          <FormGroup>
            <Label>
              Grid Columns{" "}
              <Input
                type="range"
                min="1"
                max="36"
                defaultValue={selectedLayer?.gridCols || ""}
                onChange={evt =>
                  updateLayer("gridCols", parseInt(evt.target.value, 10))
                }
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              Grid Rows{" "}
              <Input
                type="range"
                min="1"
                max="25"
                defaultValue={selectedLayer?.gridRows || ""}
                onChange={evt =>
                  updateLayer("gridRows", parseInt(evt.target.value, 10))
                }
              />
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={Boolean(selectedLayer?.labels)}
                onChange={evt => updateLayer("labels", evt.target.checked)}
              />{" "}
              Labels?
            </Label>
          </FormGroup>
        </Col>
        <Col>
          <ChromePicker
            color={selectedLayer?.color || ""}
            onChangeComplete={color =>
              updateLayer(
                "color",
                `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
              )
            }
          />
        </Col>
      </Row>
    );
  },
  imageConfig: ImageConfig,
  objectsConfig: ObjectConfig,
  pathConfig: PathConfig,
  videoConfig: VideoConfig,
};

interface BottomProps {
  tacticalMapId: string;
  layerId: string;
  objectId: string;
  tacticalMap?: TacticalMap;
  updateObject: Function;
  removeObject: Function;
  updateSpeed: Function;
  speed: number;
}
const Bottom: React.FC<BottomProps> = ({
  tacticalMapId,
  layerId,
  objectId,
  tacticalMap,
  updateObject,
  removeObject,
  updateSpeed,
  speed,
}) => {
  const [updateLayerMutation] = useUpdateLayerMutation();
  const [addItemMutation] = useAddTacticalItemMutation();

  const client = useApolloClient();
  const updateType = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateLayerMutation({
      variables: {
        mapId: tacticalMapId,
        layer: {
          id: layerId,
          type: evt.target.value as Tactical_Types,
        },
      },
    });
  };
  const updateLayer = (key: string, value: any) => {
    const variables = {
      mapId: tacticalMapId,
      layer: {
        id: layerId,
        [key]: value,
      },
    };
    updateLayerMutation({variables});
  };
  const addLabel = () => {
    addItemMutation({
      variables: {
        mapId: tacticalMapId,
        layerId: layerId,
        item: {
          label: "Label",
          icon: null,
          location: {x: 0.5, y: 0.5, z: 0},
          destination: {x: 0.5, y: 0.5, z: 0},
        },
      },
    });
  };

  if (!tacticalMapId || !layerId) return null;
  const selectedLayer = tacticalMap?.layers?.find(l => l?.id === layerId);
  return (
    <div className="tactical-bottom-panel">
      <div className="tactical-bottom-panel__meta auto-scroll">
        <h3 className="tactical-bottom-panel__layer-name">
          {selectedLayer?.name}
        </h3>
        <FormGroup>
          <Label>Layer Type</Label>
          <Input
            type="select"
            bsSize="sm"
            value={selectedLayer?.type || ""}
            onChange={updateType}
          >
            <option value="grid">Grid</option>
            <option value="image">Image</option>
            <option value="objects">Objects</option>
            <option value="path">Paths</option>
            <option value="video">Video</option>
          </Input>
        </FormGroup>
        {selectedLayer?.type === "objects" && (
          <Fragment>
            <FormGroup>
              <Button size="sm" color="primary" block onClick={addLabel}>
                Add Label
              </Button>
            </FormGroup>
            <FormGroup>
              <Label>Placement Speed</Label>
              <Input
                type="select"
                bsSize="sm"
                value={speed}
                onChange={evt => updateSpeed(evt.target.value)}
              >
                <option value="1000">Instant</option>
                <option value="1.5">Warp</option>
                <option value="0.2">Very Fast</option>
                <option value="0.08">Fast</option>
                <option value="0.05">Moderate</option>
                <option value="0.02">Slow</option>
                <option value="0.008">Very Slow</option>
              </Input>
            </FormGroup>
          </Fragment>
        )}

        <FormGroup style={{marginBottom: 0}}>
          <Label>Layer Opacity</Label>
          <Input
            type="range"
            bsSize="sm"
            min={0}
            max={1}
            step={0.01}
            value={selectedLayer?.opacity || 1}
            onChange={evt => updateLayer("opacity", evt.target.value)}
          />
        </FormGroup>
      </div>
      <div className="tactical-bottom-panel__config auto-scroll">
        {(() => {
          const config = `${selectedLayer?.type}Config` as
            | "gridConfig"
            | "imageConfig"
            | "objectsConfig"
            | "pathConfig"
            | "videoConfig";
          const Comp = configs[config];
          return (
            <Comp
              tacticalMapId={tacticalMapId || ""}
              layerId={layerId}
              objectId={objectId}
              client={client}
              selectedLayer={selectedLayer}
              updateLayer={updateLayer}
              updateObject={updateObject}
              removeObject={removeObject}
            />
          );
        })()}
      </div>
    </div>
  );
};
export default Bottom;
