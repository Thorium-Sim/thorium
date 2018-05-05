import React from "react";
import SideNav from "./FlightDirector/sideNav";
import { Route } from "react-router-dom";
import TacticalMapCore from "../components/views/TacticalMap";
import DebugList from "./DebugList";
import {
  SetConfig,
  MissionConfig,
  SimulatorConfig,
  AssetConfig,
  Welcome,
  SoftwarePanels,
  SurveyForms,
  Keyboards
} from "./FlightDirector";

const Config = ({ history }) => {
  return (
    <div className="config-container">
      <SideNav />
      <div>
        <Route path="/" exact component={Welcome} />
        <Route path="/config/assets" component={AssetConfig} />
        <Route path="/config/mission/:missionId" component={MissionConfig} />
        <Route
          path="/config/simulator/:simulatorId"
          component={SimulatorConfig}
        />
        <Route
          path="/config/tacticals"
          render={props => {
            return (
              <div style={{ height: "100%" }}>
                <TacticalMapCore dedicated={true} {...props} />
              </div>
            );
          }}
        />
        <Route path="/config/sets" component={SetConfig} />
        <Route
          path="/config/panels"
          render={props => <SoftwarePanels {...props} history={history} />}
        />
        <Route
          path="/config/survey"
          render={props => <SurveyForms {...props} history={history} />}
        />
        <Route
          path="/config/keyboard"
          render={props => <Keyboards {...props} history={history} />}
        />
        <Route path="/config/debug" component={DebugList} />
      </div>
    </div>
  );
};

export default Config;
