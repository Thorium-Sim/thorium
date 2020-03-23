import React from "react";
import SideNav from "./FlightDirector/sideNav";
import {Route} from "react-router-dom";
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
  MacroButtons,
  Records,
  Midi,
} from "./FlightDirector";
import MissionPicker from "./missionPicker";
import SimulatorPicker from "./simulatorPicker";
import {AlertsHolder} from "../components/generic/Alerts";
import "./config.scss";
import UniversalSandboxEditor from "./FlightDirector/Universe";
import EntityTemplate from "./FlightDirector/EntityTemplate";

interface TrainingContextI {
  training: boolean;
  stopTraining: () => void;
  startTraining: () => void;
}
export const TrainingContext = React.createContext<TrainingContextI>({
  training: false,
  stopTraining: () => {},
  startTraining: () => {},
});

const TrainingContextProvider: React.FC = ({children}) => {
  const [training, setTraining] = React.useState(false);

  const value = React.useMemo(() => {
    return {
      training,
      stopTraining: () => setTraining(false),
      startTraining: () => setTraining(true),
    };
  }, [training]);
  return (
    <TrainingContext.Provider value={value}>
      {children}
    </TrainingContext.Provider>
  );
};

interface Alert {
  id: string;
  visible: boolean;
  title: string;
  body: string;
  color?: string;
  duration?: number;
}
const Config = () => {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  const onDismiss = (id: string) => {
    setAlerts(alerts =>
      alerts.map(a => {
        if (a.id === id) return {...a, visible: false};
        return a;
      }),
    );

    setTimeout(() => {
      setAlerts(alerts => alerts.filter(a => a.id !== id));
    }, 2000);
  };
  const trigger = ({title, body, color, duration, id = uuid.v4()}: Alert) => {
    setAlerts(alerts =>
      alerts.concat({title, body, duration, id, visible: true}),
    );

    const timeoutDuration = duration ?? 5000;
    setTimeout(() => {
      onDismiss(id);
    }, timeoutDuration);
  };

  return (
    <TrainingContextProvider>
      <div className="config-container">
        <SideNav />
        <div style={{height: "100%"}}>
          <Route path="/" exact children={<Welcome />} />
          <Route path="/config/flight" exact children={<FlightConfig />} />
          <Route
            path="/config/flight/:flightId"
            exact
            children={<ClientsLobby />}
          />
          <Route path="/config/assetConfig" children={<AssetConfig />} />
          <Route
            path="/config/mission"
            exact
            children={<MissionPicker triggerAlert={trigger} />}
          />
          <Route
            path="/config/simulator"
            exact
            children={<SimulatorPicker triggerAlert={trigger} />}
          />
          <Route
            path="/config/sandbox"
            exact
            children={<UniversalSandboxEditor />}
          />
          <Route
            path="/config/entityTemplates"
            exact
            children={<EntityTemplate />}
          />
          <Route
            path="/config/mission/:missionId"
            children={<MissionConfig />}
          />
          <Route
            path="/config/simulator/:simulatorId"
            children={<SimulatorConfig />}
          />
          <Route
            path="/config/tacticals"
            children={
              <div style={{height: "100%"}}>
                <TacticalMapCore dedicated={true} />
              </div>
            }
          />
          <Route path="/config/sets" children={<SetConfig />} />
          <Route path="/config/panels" children={<SoftwarePanels />} />
          <Route path="/config/survey" children={<SurveyForms />} />
          <Route path="/config/keyboard" children={<Keyboards />} />
          <Route path="/config/settings" children={<Settings />} />
          <Route path="/config/taskTemplates" children={<TaskTemplates />} />
          <Route path="/config/macros" children={<Macros />} />
          <Route path="/config/macroButtons" children={<MacroButtons />} />
          <Route path="/config/commandLine" children={<CommandLineConfig />} />
          <Route path="/config/triggers" children={<Triggers />} />
          <Route path="/config/interfaces" children={<Interfaces />} />
          <Route path="/config/records" children={<Records />} />
          <Route path="/config/midi" children={<Midi />} />
          <Route path="/config/debug" children={<DebugList />} />
        </div>
        <AlertsHolder alerts={alerts} dismiss={onDismiss} />
      </div>
    </TrainingContextProvider>
  );
};

export default Config;
