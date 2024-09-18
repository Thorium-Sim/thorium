import React from "react";
import "./sidebar.scss";
import {Cores} from "components/views";
import {subscribe} from "helpers/pubsub";
import CoreError from "./layouts/coreError";
import useLocalStorage from "helpers/hooks/useLocalStorage";

const defaultSidebar = [
  {
    label: "Timeline",
    component: "TimelineCore",
  },
  {
    label: "Transporters",
    component: "TransporterCore",
  },
  {
    label: "Ship",
    component: "ShipCore",
  },
  {label: "Core Feed", component: "CoreFeed"},
  {label: "Messaging", component: "MessagingCore"},
  {label: "Login Names", component: "HypercardAndLoginNameCore"},
  {
    label: "Tractor Beam",
    component: "TractorBeamCore",
  },
];

const Sidebar = props => {
  const [sidebar, setSidebar] = useLocalStorage(
    "thorium_coreSidebarItems",
    defaultSidebar,
  );
  const [positions, setPositions] = React.useState({});
  const [open, setOpen] = React.useState({});
  const [showing, setShowing] = React.useState({});

  React.useEffect(() => {
    return subscribe("core_sidebar_update", () => {
      setSidebar(JSON.parse(localStorage.getItem("thorium_coreSidebarItems")));
    });
  }, [setSidebar]);

  React.useEffect(() => {
    setShowing(open);
  }, [open]);
  return (
    <div className="core-sidebar">
      <div className="labels">
        {sidebar.map(s => (
          <div
            ref={el => {
              if (el && !positions[`${s.label}-${s.component}`]) {
                const bounds = el.getBoundingClientRect();
                setPositions(p => ({
                  ...p,
                  [`${s.label}-${s.component}`]: {
                    top: bounds.top,
                    bottom: bounds.bottom,
                  },
                }));
              }
            }}
            className="sidebar-label"
            key={`${s.label}-${s.component}`}
            onClick={() => {
              setOpen({
                [`${s.label}-${s.component}`]: !open[
                  `${s.label}-${s.component}`
                ],
              });
              setShowing(showing => ({
                ...showing,
                [`${s.label}-${s.component}`]: true,
              }));
            }}
            style={{
              transform: `rotate(180deg) translate(0, ${
                open[`${s.label}-${s.component}`] ? "-350px" : "0"
              })`,
            }}
          >
            {s.label}
          </div>
        ))}
      </div>
      <div className="sidebar-components">
        {sidebar.map(s => {
          if (!positions[`${s.label}-${s.component}`]) return null;
          const onBottom =
            window.innerHeight <
            positions[`${s.label}-${s.component}`].top + 300;
          const position = onBottom
            ? positions[`${s.label}-${s.component}`].bottom - window.innerHeight
            : positions[`${s.label}-${s.component}`].top;
          return (
            <div
              key={`component-${s.label}-${s.component}`}
              className={"sidebar-component"}
              style={{
                bottom: onBottom ? 0 : null,
                top: onBottom ? null : 0,
                transform: `translate(${
                  open[`${s.label}-${s.component}`] ? "-350px" : "0"
                }, ${position}px)`,
              }}
            >
              {showing[`${s.label}-${s.component}`] &&
                (() => {
                  const Comp = Cores[s.component];
                  if (!Comp) return null;
                  return (
                    <CoreError>
                      <Comp {...props} />
                    </CoreError>
                  );
                })()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Sidebar;
