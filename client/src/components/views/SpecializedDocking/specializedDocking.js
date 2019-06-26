import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem
} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { Mutation } from "react-apollo";
import { Clamps, Ramps, Doors } from "../Docking/graphics";
import Tour from "helpers/tourHelper";

const SpecializedDocking = ({ docking, clientObj }) => {
  const [selectedPort, setSelectedPort] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [graphic, setGraphic] = useState(false);

  const timeout = useRef(null);
  const port =
    docking.length > 1 ? docking.find(d => d.id === selectedPort) : docking[0];
  useEffect(() => clearTimeout(timeout.current), []);

  const togglePort = (action, which) => () => {
    setAnimating(true);
    setGraphic(which);
    const update = {
      id: port.id,
      [which]: !port[which]
    };
    action({ variables: { port: update } });
    timeout.current = setTimeout(() => {
      setAnimating(false);
      setGraphic(null);
    }, 4000);
  };

  const trainingSteps = () => {
    return [
      {
        selector: ".selector",
        content:
          docking.length > 1
            ? `Some ships are specifically assigned to your ship and have designated docking ports. This is where you can see the status of those ships and interact with them.`
            : `A ship has been specifically assigned to your ship. It is called "${
                port.name
              }", and can be docked with your ship in a designated docking port.`
      },
      docking.length > 1 && {
        selector: ".port-list",
        content: `This is where you can see the list of ships assigned to your ship. Click on one to see more information.`
      },
      {
        selector: ".port-config",
        content: `If the ship is docked or within docking range, you will see it here.`
      },
      {
        selector: ".docking-buttons",
        content: `Click these buttons in order to dock the ship. The ship is only docked if the clamps are attached, boarding ramps are extended, and the airlock doors are open. To undock, reverse the process.`
      },
      {
        selector: ".inventory",
        content: `Any inventory on the ship is shown here. You can transfer the inventory on and off of the ship from the cargo control screen.`
      }
    ].filter(Boolean);
  };

  return (
    <div className="card-specializedDocking">
      {docking.length > 1 ? (
        <div className="port-list">
          <h3>Specialized Ports</h3>
          <ListGroup>
            {docking.map(d => (
              <ListGroupItem
                key={d.id}
                active={selectedPort === d.id}
                onClick={() => setSelectedPort(d.id)}
              >
                {d.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      ) : null}
      <div className="port-config">
        {port &&
          (port.docked ? (
            <React.Fragment>
              <div className="name">
                <h2>{port.name}</h2>
                {port.deck && <h2>Docking Port Deck: {port.deck.number}</h2>}
              </div>
              <Mutation
                mutation={gql`
                  mutation UpdateShuttleBay($port: DockingPortInput!) {
                    updateDockingPort(port: $port)
                  }
                `}
              >
                {action => (
                  <div className="docking-buttons">
                    <Button
                      disabled={animating}
                      block
                      size="lg"
                      className="clamps-button"
                      color="primary"
                      onClick={togglePort(action, "clamps")}
                    >
                      {port.clamps ? "Detach" : "Attach"} Docking Clamps
                    </Button>
                    <Button
                      disabled={animating}
                      block
                      size="lg"
                      className="ramps-button"
                      color="primary"
                      onClick={togglePort(action, "compress")}
                    >
                      {port.compress ? "Retract" : "Extend"} Boarding Ramps
                    </Button>
                    <Button
                      disabled={animating}
                      block
                      size="lg"
                      className="doors-button"
                      color="primary"
                      onClick={togglePort(action, "doors")}
                    >
                      {port.doors ? "Close" : "Open"} Airlock Doors
                    </Button>
                  </div>
                )}
              </Mutation>
              <div className="docking-view">
                {graphic === "clamps" && <Clamps transform={port.clamps} />}
                {graphic === "compress" && <Ramps transform={port.compress} />}
                {graphic === "doors" && <Doors transform={port.doors} />}
              </div>
              <div className="inventory">
                <h4>Inventory</h4>
                {port.deck ? (
                  <Card>
                    <CardBody>
                      {port.inventory.map(i => (
                        <p key={i.id}>
                          {i.count}: {i.name}
                        </p>
                      ))}
                    </CardBody>
                  </Card>
                ) : (
                  <h5>No Inventory</h5>
                )}
              </div>
              <div className="image">
                <img
                  src={`/assets${port.image}`}
                  alt="Ship"
                  draggable={false}
                />
              </div>
            </React.Fragment>
          ) : (
            <div className="not-present">
              <h1>{port.name} Not Present</h1>
            </div>
          ))}
      </div>
      <Tour steps={trainingSteps()} client={clientObj} />
    </div>
  );
};
export default SpecializedDocking;
