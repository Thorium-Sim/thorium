import React from "react";
import FileExplorer from "components/views/TacticalMap/fileExplorer";

export default {
  name: "Video",
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
        <video
          src={`/assets${config.src}`}
          style={{
            width: `${config.width || 50}px`,
            height: config.height ? `${config.height}px` : null,
            objectFit: "fill"
          }}
          autoPlay={config.autoPlay}
          muted
          loop={config.loop}
          playsInline
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
      id: "autoPlay",
      title: "Auto Play",
      default: true,
      props: {
        type: "checkbox"
      }
    },
    {
      id: "loop",
      title: "Loop",
      default: true,
      props: {
        type: "checkbox"
      }
    },
    {
      id: "src",
      title: "Video",
      component: props => {
        return (
          <FileExplorer
            selectedFiles={[props.value]}
            onClick={(evt, container) => props.onChange(container.fullPath)}
          />
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
