import React, { Component } from "react";
import "./style.scss";

const points = [
  {
    id: 0,
    x: 0.5,
    y: 0.5,
    links: [20, 1],
    directions: ["w", "e"]
  },
  {
    id: 1,
    x: 0.6,
    y: 0.5,
    links: [2, 3],
    directions: ["n", "s"]
  },
  {
    id: 2,
    x: 0.6,
    y: 0.4,
    links: [4, 5],
    directions: ["w", "e"]
  },
  {
    id: 3,
    x: 0.6,
    y: 0.7,
    links: [6]
  },
  {
    id: 4,
    x: 0.55,
    y: 0.4,
    links: [7]
  },
  {
    id: 5,
    x: 0.8,
    y: 0.4,
    links: [8, 9],
    directions: ["s", "n"]
  },
  {
    id: 6,
    x: 0.75,
    y: 0.7,
    links: [10, 11],
    directions: ["e", "s"]
  },
  {
    id: 7,
    x: 0.55,
    y: 0.3,
    links: []
  },
  {
    id: 8,
    x: 0.8,
    y: 0.5,
    links: []
  },
  {
    id: 9,
    x: 0.8,
    y: 0.3,
    links: [12]
  },
  {
    id: 10,
    x: 0.8,
    y: 0.7,
    links: [14]
  },
  {
    id: 11,
    x: 0.75,
    y: 0.8,
    links: [15, 16],
    directions: ["w", "e"]
  },
  {
    id: 12,
    x: 1,
    y: 0.3,
    links: [],
    charge: 4
  },
  {
    id: 14,
    x: 0.8,
    y: 0.55,
    links: [17, 18],
    directions: ["w", "e"]
  },
  {
    id: 15,
    x: 0.55,
    y: 0.8,
    links: []
  },
  {
    id: 16,
    x: 1,
    y: 0.8,
    links: [],
    charge: 3
  },
  {
    id: 17,
    x: 0.65,
    y: 0.55,
    links: [19]
  },
  {
    id: 18,
    x: 0.9,
    y: 0.55,
    links: []
  },
  {
    id: 19,
    x: 0.65,
    y: 0.45,
    links: []
  },
  {
    id: 20,
    x: 0.4,
    y: 0.5,
    links: [21, 22, 23],
    directions: ["w", "s", "n"]
  },
  {
    id: 21,
    x: 0.3,
    y: 0.5,
    links: [24]
  },
  {
    id: 22,
    x: 0.4,
    y: 0.7,
    links: [26, 27],
    directions: ["e", "s"]
  },
  {
    id: 23,
    x: 0.4,
    y: 0.4,
    links: [28, 29],
    directions: ["n", "w"]
  },
  {
    id: 24,
    x: 0.3,
    y: 0.6,
    links: [25]
  },
  {
    id: 25,
    x: 0.25,
    y: 0.6,
    links: []
  },
  {
    id: 26,
    x: 0.55,
    y: 0.7,
    links: [15]
  },
  {
    id: 27,
    x: 0.4,
    y: 0.9,
    links: [30, 31],
    directions: ["s", "w"]
  },
  {
    id: 28,
    x: 0.4,
    y: 0.2,
    links: [32]
  },
  {
    id: 29,
    x: 0.2,
    y: 0.4,
    links: [33, 34, 35],
    directions: ["n", "s", "w"]
  },
  {
    id: 30,
    x: 0.4,
    y: 0.95,
    links: [36]
  },
  {
    id: 31,
    x: 0.2,
    y: 0.9,
    links: [37]
  },
  {
    id: 32,
    x: 0.6,
    y: 0.2,
    links: [38, 39],
    directions: ["e", "s"]
  },
  {
    id: 33,
    x: 0.2,
    y: 0.2,
    links: [40]
  },
  {
    id: 34,
    x: 0.2,
    y: 0.5,
    links: []
  },
  {
    id: 35,
    x: 0.1,
    y: 0.4,
    links: [41]
  },
  {
    id: 36,
    x: 0.55,
    y: 0.95,
    links: []
  },
  {
    id: 37,
    x: 0.2,
    y: 0.7,
    links: [42, 43, 44],
    directions: ["e", "n", "w"]
  },
  {
    id: 38,
    x: 0.9,
    y: 0.2,
    links: []
  },
  {
    id: 39,
    x: 0.6,
    y: 0.3,
    links: []
  },
  {
    id: 40,
    x: 0.1,
    y: 0.2,
    links: []
  },
  {
    id: 41,
    x: 0.1,
    y: 0.3,
    links: [45]
  },
  {
    id: 42,
    x: 0.35,
    y: 0.7,
    links: [46]
  },
  {
    id: 43,
    x: 0.2,
    y: 0.6,
    links: [47]
  },
  {
    id: 44,
    x: 0.1,
    y: 0.7,
    links: [48]
  },
  {
    id: 45,
    x: 0,
    y: 0.3,
    links: [],
    charge: 1
  },
  {
    id: 46,
    x: 0.35,
    y: 0.55,
    links: []
  },
  {
    id: 47,
    x: 0.1,
    y: 0.6,
    links: [49]
  },
  {
    id: 48,
    x: 0.1,
    y: 0.8,
    links: [50]
  },
  {
    id: 49,
    x: 0.1,
    y: 0.5,
    links: []
  },
  {
    id: 50,
    x: 0,
    y: 0.8,
    links: [],
    charge: 2
  }
];

function calcD(p, dir) {
  const size = 2;
  return `M ${size} ${0} L ${-1 * size} ${-1 * size} L ${-1} ${0} L ${-1 *
    size} ${size} Z`;
}
function distance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;

  return Math.sqrt(a * a + b * b);
}
export default class BatteryCharging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrows: points.map(p => (p.directions ? p.directions[0] : "none")),
      spark: {
        destination: 0,
        x: 0.5,
        y: 0.5
      },
      charges: [0, 0, 0, 0]
    };
    this.rotateArrow = arrowIndex => {
      this.setState({
        arrows: this.state.arrows.map((a, i) => {
          if (i === arrowIndex) {
            const dirs = points[i].directions.length;
            return points[i].directions[
              (points[i].directions.indexOf(a) + 1) % dirs
            ];
          }
          return a;
        })
      });
    };
    this.loop = this.loop.bind(this);
    this.loop();
  }
  loop() {
    if (
      this.state.charges.reduce((prev, next) => {
        return prev + next;
      }, 0) === 4
    ) {
      this.props.complete();
      return;
    }
    requestAnimationFrame(this.loop);
    const { spark } = this.state;
    const destI = points.findIndex(p => p.id === spark.destination);
    const dest = points[destI];
    if (distance(spark.x, spark.y, dest.x, dest.y) < 0.01) {
      // Get the next destination
      const dir = this.state.arrows[destI];
      let nextDest = 0;
      if (dest.links.length > 0) {
        nextDest =
          dest.links.length > 1
            ? dest.links[dest.directions.indexOf(dir)]
            : dest.links[0];
      }
      this.setState({
        spark: {
          x: nextDest === 0 ? 0.5 : spark.x,
          y: nextDest === 0 ? 0.5 : spark.y,
          destination: nextDest
        },
        charges: this.state.charges.map((c, i) => {
          if (dest.charge && dest.charge - 1 === i) {
            return Math.min(1, c + 0.25);
          }
          return c;
        })
      });

      return;
    }
    const speed = 0.005;
    const nextX =
      Math.round(
        (spark.x === dest.x
          ? dest.x
          : spark.x < dest.x
            ? spark.x + speed
            : spark.x - speed) * 10000
      ) / 10000;
    const nextY =
      Math.round(
        (spark.y === dest.y
          ? dest.y
          : spark.y < dest.y
            ? spark.y + speed
            : spark.y - speed) * 10000
      ) / 10000;
    this.setState({
      spark: { x: nextX, y: nextY, destination: spark.destination }
    });
  }
  render() {
    return (
      <svg className="battery-charging" viewBox="0 0 100 100">
        {points.map((p, i, arr) => (
          <g key={`circle-${p.id}`}>
            {p.links.length === 0 && !p.charge ? (
              <circle fill="red" cx={p.x * 100} cy={p.y * 100} r={1.5} />
            ) : (
              <circle fill="white" cx={p.x * 100} cy={p.y * 100} r={0.7} />
            )}
            {p.links.map(l => (
              <path
                d={`M ${p.x * 100} ${p.y * 100} L ${arr.find(a => a.id === l)
                  .x * 100} ${arr.find(a => a.id === l).y * 100}`}
                stroke="white"
              />
            ))}
          </g>
        ))}
        {points.map(
          (p, i) =>
            p.links.length > 1 && (
              <g
                transform={`translate(${p.x * 100} ${p.y * 100})`}
                onClick={() => this.rotateArrow(i)}
              >
                <path
                  fill={"#0f0"}
                  className={`arrow ${this.state.arrows[i]}`}
                  d={calcD(p)}
                />
              </g>
            )
        )}
        <path
          transform="scale(0.08) translate(580 520)"
          d="M14,0l64,0l0,4l-4,4l16,0l0,24l-10,0l0,20l12,0l0,5l-0.988,0c-4.388,13.131 -22.886,23 -45.012,23c-22.126,0 -40.624,-9.869 -45.012,-23l-0.988,0l0,-5l12,0l0,-20l-12,0l0,-24l18,0l-4,-4l0,-4Zm-8.123,57c5.309,11.001 21.275,19 40.123,19c18.848,0 34.814,-7.999 40.123,-19l-80.246,0Zm70.123,-25l-2,0l0,20l2,0l0,-20Zm-6,0l-4,0l0,20l4,0l0,-20Zm-8,0l-6,0l0,20l6,0l0,-20Zm-10,0l-12,0l0,20l12,0l0,-20Zm-16,0l-6,0l0,20l6,0l0,-20Zm-10,0l-4,0l0,20l4,0l0,-20Zm-8,0l-2,0l0,20l2,0l0,-20Zm50,-14l-44,0l0,-4l-3,-3l-18,0l0,18l84,0l0,-18l-16,0l-3,3l0,4Z"
          fill="#00cbcd"
        />
        <path
          transform="scale(0.08) translate(670 730) rotate(180)"
          d="M14,0l64,0l0,4l-4,4l16,0l0,24l-10,0l0,20l12,0l0,5l-0.988,0c-4.388,13.131 -22.886,23 -45.012,23c-22.126,0 -40.624,-9.869 -45.012,-23l-0.988,0l0,-5l12,0l0,-20l-12,0l0,-24l18,0l-4,-4l0,-4Zm-8.123,57c5.309,11.001 21.275,19 40.123,19c18.848,0 34.814,-7.999 40.123,-19l-80.246,0Zm70.123,-25l-2,0l0,20l2,0l0,-20Zm-6,0l-4,0l0,20l4,0l0,-20Zm-8,0l-6,0l0,20l6,0l0,-20Zm-10,0l-12,0l0,20l12,0l0,-20Zm-16,0l-6,0l0,20l6,0l0,-20Zm-10,0l-4,0l0,20l4,0l0,-20Zm-8,0l-2,0l0,20l2,0l0,-20Zm50,-14l-44,0l0,-4l-3,-3l-18,0l0,18l84,0l0,-18l-16,0l-3,3l0,4Z"
          fill="#00cbcd"
        />
        <path
          className="spark"
          transform={`translate(${this.state.spark.x * 100} ${this.state.spark
            .y * 100})`}
          d="M0,-1.357l0.244,0.75l0.469,-0.232l-0.075,0.519l0.789,0l-0.638,0.463l0.365,0.375l-0.516,0.089l0.244,0.75l-0.638,-0.464l-0.244,0.464l-0.244,-0.464l-0.638,0.464l0.244,-0.75l-0.516,-0.089l0.365,-0.375l-0.638,-0.463l0.789,0l-0.075,-0.519l0.469,0.232l0.244,-0.75Z"
          fill="#ffe000"
        />

        <rect
          transform="scale(0.2) translate(-70 70)"
          x="0"
          y={Math.abs(this.state.charges[0] - 1) * 100}
          width="75"
          height={this.state.charges[0] * 100}
          fill="#00cbcd"
        />
        <rect
          transform="scale(0.2) translate(-70 70)"
          x="0"
          y="0"
          width="75"
          height="100"
          fill="transparent"
          stroke="#028285"
          strokeWidth="5"
        />
        <rect
          transform="scale(0.2) translate(-70 320)"
          x="0"
          y={Math.abs(this.state.charges[1] - 1) * 100}
          width="75"
          height={this.state.charges[1] * 100}
          fill="#00cbcd"
        />
        <rect
          transform="scale(0.2) translate(-70 320)"
          x="0"
          y="0"
          width="75"
          height="100"
          fill="transparent"
          stroke="#028285"
          strokeWidth="5"
        />
        <rect
          transform="scale(0.2) translate(500 320)"
          x="0"
          y={Math.abs(this.state.charges[2] - 1) * 100}
          width="75"
          height={this.state.charges[2] * 100}
          fill="#00cbcd"
        />
        <rect
          transform="scale(0.2) translate(500 320)"
          x="0"
          y="0"
          width="75"
          height="100"
          fill="transparent"
          stroke="#028285"
          strokeWidth="5"
        />
        <rect
          transform="scale(0.2) translate(500 70)"
          x="0"
          y={Math.abs(this.state.charges[3] - 1) * 100}
          width="75"
          height={this.state.charges[3] * 100}
          fill="#00cbcd"
        />
        <rect
          transform="scale(0.2) translate(500 70)"
          x="0"
          y="0"
          width="75"
          height="100"
          fill="transparent"
          stroke="#028285"
          strokeWidth="5"
        />
      </svg>
    );
  }
}
