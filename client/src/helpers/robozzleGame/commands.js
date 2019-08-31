import React, { Fragment } from "react";

const Red = ({ onMouseDown }) => {
  return (
    <div
      className="command paint paint-red"
      onMouseDown={evt =>
        onMouseDown({ x: evt.clientX, y: evt.clientY }, "paint-red")
      }
    />
  );
};
const Green = ({ onMouseDown }) => {
  return (
    <div
      className="command paint paint-green"
      onMouseDown={evt =>
        onMouseDown({ x: evt.clientX, y: evt.clientY }, "paint-green")
      }
    />
  );
};
const Blue = ({ onMouseDown }) => {
  return (
    <div
      className="command paint paint-blue"
      onMouseDown={evt =>
        onMouseDown({ x: evt.clientX, y: evt.clientY }, "paint-blue")
      }
    />
  );
};
const ColorCommands = ({ colors, onMouseDown }) => {
  if (colors === 1) {
    return (
      <Fragment>
        <Red onMouseDown={onMouseDown} />
        <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 2) {
    return (
      <Fragment>
        <Green onMouseDown={onMouseDown} />
        <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 3) {
    return (
      <Fragment>
        <Red onMouseDown={onMouseDown} />
        <Green onMouseDown={onMouseDown} />
        <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 4) {
    return (
      <Fragment>
        <Blue onMouseDown={onMouseDown} /> <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 5) {
    return (
      <Fragment>
        <Red onMouseDown={onMouseDown} />
        <Blue onMouseDown={onMouseDown} /> <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 6) {
    return (
      <Fragment>
        <Green onMouseDown={onMouseDown} />
        <Blue onMouseDown={onMouseDown} /> <div className="divider" />
      </Fragment>
    );
  }
  if (colors === 7) {
    return (
      <Fragment>
        <Red onMouseDown={onMouseDown} />
        <Green onMouseDown={onMouseDown} />
        <Blue onMouseDown={onMouseDown} /> <div className="divider" />
      </Fragment>
    );
  }
  return null;
};
const Commands = ({ SubLengths, AllowedCommands, dragging, onMouseDown }) => {
  return (
    <div className={`commands-area ${dragging ? "dragging" : ""}`}>
      <div
        className="command forward"
        onMouseDown={evt =>
          onMouseDown({ x: evt.clientX, y: evt.clientY }, "forward", "")
        }
      />
      <div
        className="command left"
        onMouseDown={evt =>
          onMouseDown({ x: evt.clientX, y: evt.clientY }, "left", "")
        }
      />
      <div
        className="command right"
        onMouseDown={evt =>
          onMouseDown({ x: evt.clientX, y: evt.clientY }, "right", "")
        }
      />
      <div className="divider" />
      {SubLengths.map(
        (s, i) =>
          parseInt(s, 10) > 0 && (
            <div
              key={`sublength-${i}`}
              className={`command f${i + 1}`}
              onMouseDown={evt =>
                onMouseDown({ x: evt.clientX, y: evt.clientY }, `f${i + 1}`)
              }
            />
          )
      )}
      <div className="divider" />
      <ColorCommands
        colors={parseInt(AllowedCommands, 10)}
        onMouseDown={onMouseDown}
      />
      <div
        className="command color clear"
        onMouseDown={evt =>
          onMouseDown({ x: evt.clientX, y: evt.clientY }, null, "clear")
        }
      />
      <div
        className="command color red"
        onMouseDown={evt =>
          onMouseDown({ x: evt.clientX, y: evt.clientY }, null, "red")
        }
      />
      <div
        className="command color green"
        onMouseDown={evt =>
          onMouseDown({ x: evt.clientX, y: evt.clientY }, null, "green")
        }
      />
      <div
        className="command color blue"
        onMouseDown={evt =>
          onMouseDown({ x: evt.clientX, y: evt.clientY }, null, "blue")
        }
      />
    </div>
  );
};

export default Commands;
