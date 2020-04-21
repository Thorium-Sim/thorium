import React from "react";
import {
  useEntityCreateTemplateMutation,
  Entity as EntityType,
} from "generated/graphql";
import gql from "graphql-tag.macro";
import {Container, Row, Col, Button} from "reactstrap";
import usePatchedSubscriptions from "helpers/hooks/usePatchedSubscriptions";
import SearchableList from "helpers/SearchableList";
import PropertyPalette from "../Universe/PropertyPalette";
import {Canvas} from "react-three-fiber";
import Entity from "../Universe/Entity";
import OrbitControlsContainer from "./OrbitControlsContainer";
import {PositionTuple} from "../Universe/CanvasApp";

const sub = gql`
  subscription TemplateEntities {
    entities(flightId: "template", template: true) {
      id
      identity {
        name
      }
      template {
        category
      }
      appearance {
        color
        meshType
        modelAsset
        materialMapAsset
        ringMapAsset
        cloudMapAsset
        emissiveColor
        emissiveIntensity
        scale
      }
      light {
        intensity
        decay
        color
      }
      glow {
        glowMode
        color
      }
    }
  }
`;

const EntityTemplate: React.FC = () => {
  const [create] = useEntityCreateTemplateMutation();
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const [useEntityState, storeApi] = usePatchedSubscriptions<
    EntityType[],
    {flightId: string}
  >(sub);
  const entities = useEntityState(state => state.data) || [];
  const mousePosition = React.useRef<PositionTuple>([0, 0, 0]);

  const entity = entities.find(e => e.id === selectedItem);
  return (
    <Container fluid style={{height: "100%"}}>
      <Row style={{height: "100%"}}>
        <Col sm={3}>
          <h2>Templates</h2>
          <SearchableList
            items={entities.map(e => ({
              id: e.id,
              label: e.identity?.name || "Item",
              category: e.template?.category,
            }))}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <Button
            block
            color="success"
            onClick={() => {
              const name = prompt("What is the name of this template?");
              if (!name) return;
              create({variables: {name}}).then(res =>
                setSelectedItem(res.data?.entityCreate.id || null),
              );
            }}
          >
            Create Template
          </Button>
        </Col>
        <Col
          sm={3}
          style={{height: "100%", overflowY: "auto", paddingBottom: "2rem"}}
        >
          <PropertyPalette
            key={entity?.id}
            selectedEntity={entity}
            useEntityState={useEntityState}
          />
        </Col>
        <Col sm={6} style={{height: "100%"}}>
          <h2>Preview</h2>
          {entity && (
            <Canvas className="library-mesh" camera={{position: [0, 0, 3]}}>
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <React.Suspense fallback={null}>
                <Entity
                  key={entity.id}
                  library
                  mousePosition={mousePosition}
                  entity={{...entity}}
                  entityIndex={-1}
                  storeApi={storeApi}
                />
              </React.Suspense>
              <OrbitControlsContainer />
            </Canvas>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default EntityTemplate;
