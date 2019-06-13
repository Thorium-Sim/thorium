import React, { Component } from "react";
import SideNav from "./FlightDirector/sideNav";
import { Route } from "react-router-dom";
import uuid from "uuid";
import TacticalMapCore from "../components/views/TacticalMap";
import DebugList from "./DebugList";
import {
  FlightConfig,
  SetConfig,
  MissionConfig,
  SimulatorConfig,
  AssetConfig,
  Welcome,
  SoftwarePanels,
  SurveyForms,
  Keyboards,
  ClientsLobby,
  Settings,
  TaskTemplates,
  CommandLineConfig,
  Triggers,
  Interfaces,
  Macros,
  MacroButtons
} from "./FlightDirector";
import MissionPicker from "./missionPicker";
import SimulatorPicker from "./simulatorPicker";
import { AlertsHolder } from "../components/generic/Alerts";
import "./config.scss";

class Config extends Component {
  state = { training: false, alerts: [] };
  onDismiss = id => {
    this.setState(state => ({
      alerts: state.alerts.map(a => {
        if (a.id === id) a.visible = false;
        return a;
      })
    }));
    setTimeout(() => {
      this.setState(state => ({
        alerts: state.alerts.filter(a => a.id !== id)
      }));
    }, 2000);
  };
  trigger = ({ title, body, color, duration, id = uuid.v4() }) => {
    this.setState(state => ({
      alerts: state.alerts.concat(
        Object.assign({ title, body, color, id }, { visible: true })
      )
    }));
    const timeoutDuration = duration ? duration : 5000;
    setTimeout(() => {
      this.onDismiss(id);
    }, timeoutDuration);
  };
  trainingProps = () => {
    return {
      training: this.state.training,
      stopTraining: () => this.setState({ training: false })
    };
  };
  render() {
    const { history } = this.props;
    return (
      <div className="config-container">
        <SideNav startTraining={() => this.setState({ training: true })} />
        <div>
          <Route
            path="/"
            exact
            render={props => <Welcome {...props} {...this.trainingProps()} />}
          />
          <Route
            path="/config/flight"
            exact
            render={props => (
              <FlightConfig
                {...props}
                {...this.trainingProps()}
                history={history}
              />
            )}
          />
          <Route
            path="/config/flight/:flightId"
            exact
            render={props => (
              <ClientsLobby
                {...props}
                history={history}
                {...this.trainingProps()}
              />
            )}
          />
          <Route
            path="/config/assetConfig"
            render={props => (
              <AssetConfig {...props} {...this.trainingProps()} />
            )}
          />
          <Route
            path="/config/mission"
            exact
            render={props => (
              <MissionPicker
                {...props}
                triggerAlert={this.trigger}
                {...this.trainingProps()}
              />
            )}
          />
          <Route
            path="/config/simulator"
            exact
            render={props => (
              <SimulatorPicker
                {...props}
                triggerAlert={this.trigger}
                {...this.trainingProps()}
              />
            )}
          />
          <Route
            path="/config/mission/:missionId"
            render={props => (
              <MissionConfig {...props} {...this.trainingProps()} />
            )}
          />
          <Route
            path="/config/simulator/:simulatorId"
            render={props => (
              <SimulatorConfig {...props} {...this.trainingProps()} />
            )}
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
          <Route
            path="/config/sets"
            render={props => <SetConfig {...props} {...this.trainingProps()} />}
          />
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
          <Route
            path="/config/settings"
            render={props => <Settings {...props} history={history} />}
          />
          <Route
            path="/config/taskTemplates"
            render={props => <TaskTemplates {...props} history={history} />}
          />
          <Route
            path="/config/macros"
            render={props => <Macros {...props} history={history} />}
          />
          <Route
            path="/config/macroButtons"
            render={props => <MacroButtons {...props} history={history} />}
          />
          <Route
            path="/config/commandLine"
            render={props => <CommandLineConfig {...props} history={history} />}
          />
          <Route
            path="/config/triggers"
            render={props => <Triggers {...props} history={history} />}
          />
          <Route
            path="/config/interfaces"
            render={props => <Interfaces {...props} history={history} />}
          />
          <Route path="/config/debug" component={DebugList} />
        </div>
        <AlertsHolder alerts={this.state.alerts} dismiss={this.onDismiss} />
      </div>
    );
  }
}

export default Config;
