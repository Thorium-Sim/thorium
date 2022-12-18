import {trainingSteps as MessagesTraining} from "./Messaging";
import {
  FaKeyboard,
  FaPenFancy,
  FaCalculator,
  FaListUl,
  FaRss,
  FaRegComment,
  FaRegFileAlt,
  FaRegFileCode,
  FaRegFileExcel,
  FaBook,
  FaTasks,
  FaCircleNotch,
  FaTerminal,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import React from "react";

// Widgets
const ComposerWidget = React.lazy(() => import("./LongRangeComm/Composer"));
const CalculatorWidget = React.lazy(() => import("./Widgets/calculator"));
const RemoteWidget = React.lazy(() => import("./RemoteAccess/widget"));
const Keyboard = React.lazy(() => import("./Widgets/keyboard"));
const SensorsWidget = React.lazy(() => import("./Sensors/widget"));
const RnDReports = React.lazy(() => import("./DamageControl/rnd"));
const Tasks = React.lazy(() => import("./Tasks"));
const CommandLine = React.lazy(() => import("./CommandLine"));
const EngineeringReports = React.lazy(
  () => import("./DamageControl/engineering"),
);
const DamageControl = React.lazy(() => import("./DamageControl"));
const Messages = React.lazy(() => import("./Messaging"));
const OfficerLog = React.lazy(() => import("./OfficerLog"));
const CodeCyphers = React.lazy(() => import("./CodeCyphers"));
const Objectives = React.lazy(() => import("./Objectives"));

export const Widgets = {
  keyboard: {
    widget: Keyboard,
    icon: FaKeyboard,
    name: "Keyboard",
    size: "lg",
    color: "rgb(90,180,255)",
  },
  composer: {
    widget: ComposerWidget,
    icon: FaPenFancy,
    name: "Long Range Message Composer",
    color: "rgb(200,150,255)",
  },
  calculator: {
    widget: CalculatorWidget,
    icon: FaCalculator,
    name: "Calculator",
    color: "rgb(255,200,100)",
  },
  objectives: {
    widget: Objectives,
    icon: FaListUl,
    name: "Objectives",
    color: "rgb(200,200,200)",
  },
  remote: {
    widget: RemoteWidget,
    icon: FaRss,
    name: "Remote Access",
    color: "rgb(100,200,100)",
    training: [
      {
        selector: ".remote-access",
        content:
          "Remote access codes are used to send commands or information from one system to another. You can send remote access codes to systems on your ship or to systems on antoher ship.",
      },
      {
        selector: ".remote-access",
        content:
          "To send a remote access code, type the code in the text box and click the send button. The results of the remote access code will soon appear as a notification in the top right corner of your screen.",
      },
    ],
  },
  messages: {
    widget: Messages,
    icon: FaRegComment,
    name: "Messaging",
    size: "lg",
    color: "rgb(100,150,200)",
    training: MessagesTraining,
  },
  damageReport: {
    widget: DamageControl,
    icon: FaRegFileAlt,
    name: "Damage Report",
    size: "lg",
    color: "rgb(200, 100, 100)",
  },
  engineeringReport: {
    widget: EngineeringReports,
    icon: FaRegFileCode,
    name: "Engineering Report",
    size: "lg",
    color: "rgb(180,100, 30)",
  },
  rndReport: {
    widget: RnDReports,
    icon: FaRegFileExcel,
    name: "R&D Report",
    size: "lg",
    color: "rgb(180,100, 130)",
  },
  officerLog: {
    widget: OfficerLog,
    icon: FaBook,
    name: "Officer Log",
    size: "lg",
    color: "rgb(255,255,100)",
  },
  tasks: {
    widget: Tasks,
    icon: FaTasks,
    name: "Tasks",
    size: "lg",
    color: "#6F84EE",
  },
  sensors: {
    widget: SensorsWidget,
    icon: FaCircleNotch,
    name: "Sensors",
    size: "xl",
    color: "#6FEDC5",
  },
  commandLine: {
    widget: CommandLine,
    icon: FaTerminal,
    name: "Command Line",
    size: "lg",
    color: "#5FFF5F",
  },
  commCyphers: {
    widget: CodeCyphers,
    icon: FaEnvelopeOpenText,
    name: "Code Cyphers",
    size: "lg",
    color: "white",
  },
};
