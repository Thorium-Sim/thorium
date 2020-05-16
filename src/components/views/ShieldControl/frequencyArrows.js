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

export function useMouseIncrement({
  value: inputValue,
  onSet,
  increment = 0.1,
  delayDec = 7,
  min = 100,
  max = 350,
}) {
  const [value, setValue] = React.useState(inputValue);
  const [delay, setDelay] = React.useState(150);

  const callback = React.useRef();

  // Remember the latest callback.
  React.useEffect(() => {
    callback.current = onSet;
  }, [onSet]);

  React.useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  const [direction, setDirection] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false);
  const mouseDowned = React.useRef(false);
  const tempDirection = React.useRef(null);

  React.useEffect(() => {
    if (disabled) {
      const timeout = setTimeout(() => setDisabled(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [disabled]);

  React.useEffect(() => {
    function reset() {
      setDirection(null);
      callback.current(value);
    }
    if (direction) {
      document.addEventListener("mouseup", reset);
      document.addEventListener("touchend", reset);
    }
    return () => {
      document.removeEventListener("mouseup", reset);
      document.removeEventListener("touchend", reset);
    };
  }, [direction, value]);

  const handleDirection = dir => () => {
    if (disabled) return;
    mouseDowned.current = true;
    tempDirection.current = dir;
    setTimeout(() => {
      if (mouseDowned.current === true) {
        setDelay(150);
        setDirection(dir);
        setDisabled(true);
        mouseDowned.current = false;
      }
    }, 150);
  };

  useInterval(
    () => {
      const adder = direction === "down" ? -increment : increment;
      if (delay > 5) {
        setDelay(delay => delay - delayDec);
      }
      setValue(val => Math.min(max, Math.max(min, val + adder)));
    },
    direction ? delay : null,
  );

  const handleMouseUp = async () => {
    if (mouseDowned.current) {
      mouseDowned.current = false;
      const adder = tempDirection.current === "down" ? -increment : increment;
      const newFreq = value + adder;
      await callback.current(newFreq);
      setDirection(null);
    }
  };

  return {handleDirection, handleMouseUp, value};
}
const FrequencyArrows = ({shields, simulator, noSetAll}) => {
  const [updateFrequency] = useMutation(SET_FREQUENCY);
  const [setAll] = useMutation(SET_ALL);
  const {handleDirection, handleMouseUp, value} = useMouseIncrement({
    value: shields.frequency,
    onSet: value => {
      const variables = {
        id: shields.id,
        freq: value,
      };
      return updateFrequency({
        variables,
      });
    },
  });

  return (
    <>
      <Flex>
        <h4>Frequency:</h4>
        {!noSetAll && (
          <Button
            size="sm"
            color="info"
            onClick={() =>
              setAll({variables: {frequency: value, simulatorId: simulator.id}})
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
            {`${(Math.round(value * 100) / 100).toFixed(1)} MHz`}
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
