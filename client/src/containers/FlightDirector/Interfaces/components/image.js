import React from "react";
import FileExplorer from "components/views/TacticalMap/fileExplorer";

export default {
  name: "Image",
  component: ({ value = {}, config = {} }) => {
    return (
      <div
        style={{
          opacity: config.hidden ? 0.2 : 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img
          src={`/assets${config.src}`}
          style={{
            width: `${config.width || 50}px`,
            height: config.height ? `${config.height}px` : null
          }}
          alt={config.label}
          draggable={false}
        />

        <label>{config.label}</label>
      </div>
    );
  },
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: [
    {
      id: "objectLabel",
      title: "Object Label",
      props: {
        type: "text"
      }
    },
    {
      id: "label",
      title: "Image Label",
      props: {
        type: "text"
      }
    },
    {
      id: "width",
      title: "Width (px) - Required",
      props: {
        type: "number",
        placeholder: "50"
      }
    },
    {
      id: "height",
      title: "Height (px) - Required",
      props: {
        type: "number",
        placeholder: "50"
      }
    },
    {
      id: "src",
      title: "Image",
      component: props => {
        return (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <FileExplorer
              selectedFiles={[props.value]}
              onClick={(evt, container) => props.onChange(container.fullPath)}
            />
          </div>
        );
      },
      props: {
        type: "filepicker"
      }
    },
    {
      id: "hidden",
      title: "Hidden",
      props: {
        type: "checkbox"
      }
    }
  ]
};
