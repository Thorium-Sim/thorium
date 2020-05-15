import React from "react";
import {Route, Routes} from "react-router-dom";
import uuid from "uuid";
import TacticalMapCore from "../components/views/TacticalMap";
import DebugList from "./DebugList";
import {
  SetConfig,
  MissionConfig,
  SimulatorConfig,
  AssetConfig,
  SoftwarePanels,
  SurveyForms,
  Keyboards,
  Settings,
  Tasks,
  CommandLineConfig,
  Triggers,
  Interfaces,
  Macros,
  MacroButtons,
  Records,
  Midi,
  DMX,
} from "./FlightDirector";
import MissionPicker from "./missionPicker";
import SimulatorPicker from "./simulatorPicker";
import {AlertsHolder} from "../components/generic/Alerts";
import UniversalSandboxEditor from "./FlightDirector/Universe";
import EntityTemplate from "./FlightDirector/EntityTemplate";

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
    <>
      <div style={{height: "100%"}}>
        <Routes>
          <Route path="assetConfig" element={<AssetConfig />} />
          <Route
            path="mission"
            element={<MissionPicker triggerAlert={trigger} />}
          />
          <Route
            path="simulator"
            element={<SimulatorPicker triggerAlert={trigger} />}
          />
          <Route path="sandbox" element={<UniversalSandboxEditor />} />
          <Route path="sandbox/:stageId" element={<UniversalSandboxEditor />} />
          <Route path="entityTemplates" element={<EntityTemplate />} />
          <Route path="mission/:missionId/*" element={<MissionConfig />} />
          <Route
            path="simulator/:simulatorId/*"
            element={<SimulatorConfig />}
          />
          <Route
            path="tacticals"
            element={
              <div style={{height: "100%"}}>
                <TacticalMapCore dedicated={true} />
              </div>
            }
          />
          <Route path="sets" element={<SetConfig />} />
          <Route path="sets/:setId" element={<SetConfig />} />
          <Route path="sets/:setId/:simulatorId" element={<SetConfig />} />
          <Route
            path="sets/:setId/:simulatorId/:stationSetId"
            element={<SetConfig />}
          />
          <Route
            path="sets/:setId/:simulatorId/:stationSetId/:station"
            element={<SetConfig />}
          />
          <Route path="panels" element={<SoftwarePanels />} />
          <Route path="survey" element={<SurveyForms />} />
          <Route path="keyboard" element={<Keyboards />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tasks/*" element={<Tasks />}></Route>
          <Route path="macros" element={<Macros />} />
          <Route path="macroButtons" element={<MacroButtons />} />
          <Route path="commandLine" element={<CommandLineConfig />} />
          <Route path="triggers" element={<Triggers />} />
          <Route path="interfaces" element={<Interfaces />} />
          <Route path="records" element={<Records />} />
          <Route path="midi" element={<Midi />} />
          <Route path="dmx/*" element={<DMX />} />
          <Route path="debug" element={<DebugList />} />
        </Routes>
      </div>
      <AlertsHolder alerts={alerts} dismiss={onDismiss} />
    </>
  );
};

export default Config;
