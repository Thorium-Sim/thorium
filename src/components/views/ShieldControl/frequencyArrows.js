import React from "react";
import {Button} from "helpers/reactstrap";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import useInterval from "helpers/hooks/useInterval";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Grow = styled.div`
  flex: 1;
`;

const SET_FREQUENCY = gql`
  mutation SetShieldFrequency($id: ID!, $freq: Float) {
    shieldFrequencySet(id: $id, frequency: $freq)
  }
`;
const SET_ALL = gql`
  mutation SetAll($simulatorId: ID!, $frequency: Float!) {
    shieldFrequencySetAll(simulatorId: $simulatorId, frequency: $frequency)
  }
`;
const FrequencyArrows = ({shields, simulator, noSetAll}) => {
  const [direction, setDirection] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);
  const [frequency, setFrequency] = React.useState(shields.frequency);
  const mouseDowned = React.useRef(false);
  const tempDirection = React.useRef(null);

  const [frequencyDelay, setFrequencyDelay] = React.useState(150);

  const [updateFrequency] = useMutation(SET_FREQUENCY);
  const [setAll] = useMutation(SET_ALL);

  React.useEffect(() => {
    setFrequency(shields.frequency);
  }, [shields.frequency]);

  React.useEffect(() => {
    if (disabled) {
      const timeout = setTimeout(() => setDisabled(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [disabled]);

  React.useEffect(() => {
    function reset() {
      setDirection(null);
      const variables = {
        id: shields.id,
        freq: frequency,
      };
      updateFrequency({
        variables,
      });
    }
    if (direction) {
      document.addEventListener("mouseup", reset);
      document.addEventListener("touchend", reset);
    }
    return () => {
      document.removeEventListener("mouseup", reset);
      document.removeEventListener("touchend", reset);
    };
  }, [direction, frequency, shields.id, updateFrequency]);

  useInterval(
    () => {
      const frequencyAdder = direction === "down" ? -0.1 : 0.1;
      if (frequencyDelay > 5) {
        setFrequencyDelay(delay => delay - 7);
      }
      setFrequency(freq => Math.min(350, Math.max(100, freq + frequencyAdder)));
    },
    direction ? frequencyDelay : null,
  );

  const handleDirection = dir => () => {
    if (disabled) return;
    mouseDowned.current = true;
    tempDirection.current = dir;
    setTimeout(() => {
      if (mouseDowned.current === true) {
        setFrequencyDelay(150);
        setDirection(dir);
        setDisabled(true);
        mouseDowned.current = false;
      }
    }, 150);
  };

  const handleMouseUp = () => {
    if (mouseDowned.current) {
      mouseDowned.current = false;
      const frequencyAdder = tempDirection.current === "down" ? -0.1 : 0.1;
      const newFreq = frequency + frequencyAdder;
      const variables = {
        id: shields.id,
        freq: newFreq,
      };
      updateFrequency({
        variables,
      }).then(() => setDirection(null));
    }
  };

  return (
    <>
      <Flex>
        <h4>Frequency:</h4>
        {!noSetAll && (
          <Button
            size="sm"
            color="info"
            onClick={() =>
              setAll({variables: {frequency, simulatorId: simulator.id}})
            }
          >
            Set All
          </Button>
        )}
      </Flex>
      <Flex>
        <FaArrowDown
          size="2em"
          onMouseDown={handleDirection("down")}
          onTouchStart={handleDirection("down")}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        />
        <Grow>
          <h2 className="text-center">
            {`${(Math.round(frequency * 100) / 100).toFixed(1)} MHz`}
          </h2>
        </Grow>
        <FaArrowUp
          size="2em"
          onMouseDown={handleDirection("up")}
          onTouchStart={handleDirection("up")}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        />
      </Flex>
    </>
  );
};

export default FrequencyArrows;
