import React, { Fragment, Component } from "react";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

function describeArc(x, y, innerRadius, outerRadius, startAngle, endAngle) {
  var innerStart = polarToCartesian(x, y, innerRadius, endAngle);
  var innerEnd = polarToCartesian(x, y, innerRadius, startAngle);
  var outerStart = polarToCartesian(x, y, outerRadius, endAngle);
  var outerEnd = polarToCartesian(x, y, outerRadius, startAngle);

  var d = [
    "M",
    outerStart.x,
    outerStart.y,
    "A",
    outerRadius,
    outerRadius,
    0,
    0,
    0,
    outerEnd.x,
    outerEnd.y,
    "L",
    innerEnd.x,
    innerEnd.y,
    "A",
    innerRadius,
    innerRadius,
    0,
    0,
    1,
    innerStart.x,
    innerStart.y,
    "L",
    outerStart.x,
    outerStart.y
  ].join(" ");

  return d;
}

class SensorsSegments extends Component {
  state = { pointerEvents: "none" };
  keydown = e => {
    if (e.key === "Alt") {
      this.setState({ pointerEvents: "all" });
    }
  };
  keyup = e => {
    if (e.key === "Alt") {
      this.setState({ pointerEvents: "none" });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  }
  render() {
    const {
      segments,
      client,
      sensors,
      rings = 3,
      lines = 12,
      aligned = false,
      dimensions
    } = this.props;

    const setSegment = (ring, line) => {
      const mutation = gql`
        mutation SensorsSegment(
          $id: ID!
          $ring: Int!
          $line: Int!
          $state: Boolean!
        ) {
          setSensorsSegment(id: $id, ring: $ring, line: $line, state: $state)
        }
      `;
      const segment = segments.find(
        s => s.ring === ring && s.line === line
      ) || { state: false };
      const state = !segment.state;
      const variables = {
        id: sensors,
        ring,
        line,
        state
      };
      client.mutate({
        mutation,
        variables
      });
    };
    const fullRadius = 50;
    return (
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
        className="grid-segments"
        style={{ pointerEvents: this.state.pointerEvents }}
      >
        {dimensions && (
          <Fragment>
            {Array(rings)
              .fill(0)
              .map((_, i) =>
                Array(lines)
                  .fill(0)
                  .map((__, ii) => (
                    <path
                      key={`blackout-${i}-${ii}`}
                      className={
                        (
                          segments.find(s => s.ring === i && s.line === ii) || {
                            state: false
                          }
                        ).state
                          ? "active"
                          : "hidden"
                      }
                      onClick={() => setSegment(i, ii)}
                      d={describeArc(
                        50,
                        50,
                        (fullRadius / rings) * i,
                        (fullRadius / rings) * (i + 1),
                        ((ii - (aligned ? 0 : 0.5)) * 360) / lines,
                        ((ii + 1 - (aligned ? 0 : 0.5)) * 360) / lines
                      )}
                    />
                  ))
              )}
          </Fragment>
        )}
      </svg>
    );
  }
}

export default withApollo(SensorsSegments);
