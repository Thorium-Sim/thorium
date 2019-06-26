import React from "react";

import PropTypes from "prop-types";
import style from "./mode.module.css";
const Mode = ({ value = "", config = {}, updateValue = () => {} }) => {
  if (config.length) return null;
  return (
    <div className={style.mode}>
      {Object.values(config)
        .filter(c => c)
        .map(c => (
          <div
            key={c}
            className={value === c ? style.selected : ""}
            onMouseDown={e => {
              e.preventDefault();
              e.stopPropagation();
              updateValue(c);
            }}
          >
            {c}
          </div>
        ))}
    </div>
  );
};

Mode.propTypes = {
  value: PropTypes.any,
  config: PropTypes.object,
  updateValue: PropTypes.func
};

export default {
  name: "Mode",
  label: "Mode - Switch Between",
  component: Mode,
  outputs: [{ id: "modeValue", title: "Value of the component", type: "Any" }],
  inputs: [],
  config: [
    {
      id: "label",
      title: "Label",
      props: {
        type: "text",
        placeholder: "Appears above component"
      }
    },
    {
      id: "mode1",
      title: "Mode 1 Name",
      props: {
        type: "text"
      }
    },
    {
      id: "mode2",
      title: "Mode 2 Name",
      props: {
        type: "text"
      }
    },
    {
      id: "mode3",
      title: "Mode 3 Name",
      props: {
        type: "text"
      }
    },
    {
      id: "mode4",
      title: "Mode 4 Name",
      props: {
        type: "text"
      }
    },
    {
      id: "mode5",
      title: "Mode 5 Name",
      props: {
        type: "text"
      }
    },
    {
      id: "mode6",
      title: "Mode 6 Name",
      props: {
        type: "text"
      }
    },
    {
      id: "mode7",
      title: "Mode 7 Name",
      props: {
        type: "text"
      }
    },
    {
      id: "mode8",
      title: "Mode 8 Name",
      props: {
        type: "text"
      }
    }
  ]
};
