import React, { Fragment, Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Cores } from "components/views";
import categories from "./categories";
import { titleCase } from "change-case";
const fkeys = categories.reduce((prev, next, i) => {
  return Object.assign({}, prev, { [i + 112]: next.name });
}, {});

const mutation = gql`
  mutation UpdateViewscreen($id: ID!, $data: String!, $component: String!) {
    updateViewscreenComponent(
      simulatorId: $id
      data: $data
      component: $component
    )
  }
`;
const autoMutation = gql`
  mutation ViewscreenAuto($id: ID) {
    setViewscreenToAuto(simulatorId: $id)
  }
`;

class Hotkey extends Component {
  constructor(props) {
    super(props);
    const storedAllowed = localStorage.getItem("allowed_viewscreenHotkeys");
    const allowed = storedAllowed
      ? JSON.parse(storedAllowed)
      : {
          1: "auto",
          2: "ShipLogo",
          3: "RedAlert",
          4: "CollisionAlert",
          5: "Communications",
          6: "DamageMonitoring",
          7: "Overheating",
          8: "ViewscreenOffline",
          9: "RadiationMonitoring",
          0: "Blackout"
        };
    this.state = {
      showing: false,
      viewscreen: false,
      viewscreens: allowed
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup);
  }
  handleKeydown = e => {
    const { viewscreens } = this.state;
    const comp = fkeys[e.which];
    if (!comp && !(e.shiftKey && e.altKey)) return;
    e.preventDefault();
    e.stopPropagation();
    if (comp) {
      return this.setState({ showing: comp });
    }
    this.setState({ viewscreen: true });
    const code = e.code.replace("Digit", "").replace("Key", "");
    const viewscreen = viewscreens[code];

    if (viewscreen) {
      if (viewscreen.auto) {
        this.props.client.mutate({
          mutation: autoMutation,
          variables: { id: this.props.simulator.id }
        });
        return;
      }
      this.props.client.mutate({
        mutation,
        variables: {
          id: this.props.simulator.id,
          data: "{}",
          component: viewscreen
        }
      });
    }
  };
  handleKeyup = e => {
    const comp = fkeys[e.which];
    if (!(e.shiftKey && e.altKey)) this.setState({ viewscreen: false });
    if (!comp) return;
    e.preventDefault();
    e.stopPropagation();
    if (!this.currentShowing) {
      this.currentShowing = this.state.showing;
      setTimeout(() => {
        this.currentShowing = null;
      }, 200);
      this.setState({ showing: null });
    }
  };
  render() {
    const { showing, viewscreen, viewscreens } = this.state;
    return (
      <Fragment>
        <div
          className={`hotkey-core core viewscreen ${
            viewscreen ? "showing" : ""
          }`}
        >
          {Object.entries(viewscreens).map(([key, v], i) => (
            <h3 key={`viewscreen-${i}`}>
              {key}: {titleCase(v)}
            </h3>
          ))}
        </div>
        <div className={`hotkey-core core ${showing ? "showing" : ""}`}>
          {showing && (
            <div
              className={`hotkey-core-cores hotkey-core-${
                categories.find(c => c.name === showing).name
              }`}
              style={categories.find(c => c.name === showing).style}
            >
              {categories.find(c => c.name === showing).components.map(c => {
                const Comp = Cores[c];
                return (
                  <div className="hotkey-core-comp" style={{ gridArea: c }}>
                    <p>{titleCase(c)}</p>
                    <Comp {...this.props} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default withApollo(Hotkey);
