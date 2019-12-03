/*
query TacticalMap($id: ID!) {
  tacticalMap(id: $id) {
    id
    name
    flight {
      id
      __typename
    }
    interval
    layers {
      id
      name
      type
      items {
        id
        layerId
        font
        label
        fontSize
        fontColor
        icon
        size
        speed
        velocity {
          x
          y
          __typename
        }
        location {
          x
          y
          __typename
        }
        destination {
          x
          y
          __typename
        }
        rotation
        opacity
        flash
        ijkl
        wasd
        thrusters
        rotationMatch
        thrusterControls {
          rotation
          reversed
          matchRotation
          up
          down
          left
          right
          __typename
        }
        __typename
      }
      paths {
        id
        layerId
        start {
          x
          y
          __typename
        }
        end {
          x
          y
          __typename
        }
        c1 {
          x
          y
          __typename
        }
        c2 {
          x
          y
          __typename
        }
        color
        width
        arrow
        __typename
      }
      image
      color
      labels
      gridCols
      gridRows
      advance
      asset
      autoplay
      loop
      playbackSpeed
      opacity
      __typename
    }
    frozen
    template
    __typename
  }
}

*/
export default {
  id: "test-map",
  name: "Test Map",
  flight: null,
  interval: 200,
  layers: [
    {
      id: "781177c1-1e2e-4427-98e0-d22b30013e3a",
      name: "Background",
      type: "image",
      items: [],
      paths: [],
      image: "/Viewscreen/Tactical Backgrounds/Stars.png",
      color: "#00ff00",
      labels: false,
      gridCols: 16,
      gridRows: 9,
      advance: false,
      asset: "",
      autoplay: true,
      loop: false,
      playbackSpeed: 1,
      opacity: 1,
      __typename: "TacticalLayer",
    },
    {
      id: "90c846f7-6709-456a-acec-27c7d6bfa6e9",
      name: "Gird",
      type: "grid",
      items: [],
      paths: [],
      image: null,
      color: "rgba(255, 255, 255, 0.25)",
      labels: true,
      gridCols: 16,
      gridRows: 9,
      advance: false,
      asset: "",
      autoplay: true,
      loop: false,
      playbackSpeed: 1,
      opacity: 1,
      __typename: "TacticalLayer",
    },
    {
      id: "91df23ce-d85d-48d3-84b4-77177f3ad120",
      name: "Objects",
      type: "objects",
      items: [
        {
          id: "f65da2e9-3f61-4523-a2a4-5ec4bd57b837",
          layerId: "91df23ce-d85d-48d3-84b4-77177f3ad120",
          font: "Helvetica",
          label: "",
          fontSize: 12,
          fontColor: "white",
          icon: "/Viewscreen/Tactical Icons/Old Icons/Defiant.png",
          size: 1,
          speed: 1000,
          velocity: {
            x: 0,
            y: 0,
            __typename: "Coordinates",
          },
          location: {
            x: 0.21714648773666093,
            y: 0.47258677567412505,
            __typename: "Coordinates",
          },
          destination: {
            x: 0.21714648773666093,
            y: 0.47258677567412505,
            __typename: "Coordinates",
          },
          rotation: 0,
          opacity: 1,
          flash: false,
          ijkl: false,
          wasd: false,
          thrusters: false,
          rotationMatch: null,
          thrusterControls: {
            rotation: "",
            reversed: false,
            matchRotation: true,
            up: "",
            down: "",
            left: "",
            right: "",
            __typename: "ThrusterControls",
          },
          __typename: "TacticalItem",
        },
        {
          id: "2d38e292-c2f1-4819-9aa3-145ff16432e4",
          layerId: "91df23ce-d85d-48d3-84b4-77177f3ad120",
          font: "Helvetica",
          label: "",
          fontSize: 12,
          fontColor: "white",
          icon: "/Viewscreen/Tactical Icons/Old Icons/Klingon BOP.png",
          size: 1,
          speed: 1000,
          velocity: {
            x: 0,
            y: 0,
            __typename: "Coordinates",
          },
          location: {
            x: 0.6913289317986231,
            y: 0.3735955727672595,
            __typename: "Coordinates",
          },
          destination: {
            x: 0.6913289317986231,
            y: 0.3735955727672595,
            __typename: "Coordinates",
          },
          rotation: 0,
          opacity: 1,
          flash: false,
          ijkl: false,
          wasd: false,
          thrusters: false,
          rotationMatch: null,
          thrusterControls: {
            rotation: "",
            reversed: false,
            matchRotation: true,
            up: "",
            down: "",
            left: "",
            right: "",
            __typename: "ThrusterControls",
          },
          __typename: "TacticalItem",
        },
        {
          id: "f1dd726c-0d9d-4d63-950e-f0e9d83ccb60",
          layerId: "91df23ce-d85d-48d3-84b4-77177f3ad120",
          font: "Helvetica",
          label: "",
          fontSize: 12,
          fontColor: "white",
          icon: "/Viewscreen/Tactical Icons/Old Icons/Federation.png",
          size: 1,
          speed: 1000,
          velocity: {
            x: 0,
            y: 0,
            __typename: "Coordinates",
          },
          location: {
            x: 0.5217936478055077,
            y: 0.6078361063300822,
            __typename: "Coordinates",
          },
          destination: {
            x: 0.5217936478055077,
            y: 0.6078361063300822,
            __typename: "Coordinates",
          },
          rotation: 0,
          opacity: 1,
          flash: false,
          ijkl: false,
          wasd: false,
          thrusters: false,
          rotationMatch: null,
          thrusterControls: {
            rotation: "",
            reversed: false,
            matchRotation: true,
            up: "",
            down: "",
            left: "",
            right: "",
            __typename: "ThrusterControls",
          },
          __typename: "TacticalItem",
        },
      ],
      paths: [],
      image: null,
      color: "#00ff00",
      labels: false,
      gridCols: 16,
      gridRows: 9,
      advance: false,
      asset: "",
      autoplay: true,
      loop: false,
      playbackSpeed: 1,
      opacity: 1,
      __typename: "TacticalLayer",
    },
  ],
  frozen: false,
  template: true,
  __typename: "TacticalMap",
};
