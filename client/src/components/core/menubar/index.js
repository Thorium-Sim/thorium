import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import SimulatorPicker from "./simulatorPicker";
import LayoutPicker from "./layoutPicker";
import MosaicPicker from "./mosaicPicker";
import RunningCheck from "./runningCheck";
import NotifyConfig from "./notifyConfig";
import FeedbackModal from "./feedbackModal";

const Menubar = ({
  flight,
  simulators,
  simulator,
  pickSimulator,
  pickLayout,
  layout,
  mosaic,
  setMosaic,
  editable,
  setEdit,
  notifications,
  speech,
  setNotifications,
  setSpeech
}) => (
  <Fragment>
    <Button tag={Link} size="sm" to={`/config/flight/${flight && flight.id}`}>
      {"<-"} Client Config
    </Button>
    <SimulatorPicker
      simulators={simulators}
      simulator={simulator}
      pickSimulator={pickSimulator}
    />
    <LayoutPicker pickLayout={pickLayout} layout={layout} />
    <MosaicPicker
      layout={layout}
      mosaic={mosaic}
      setMosaic={setMosaic}
      editable={editable}
      setEdit={setEdit}
    />
    <FeedbackModal />
    <NotifyConfig
      notifications={notifications}
      speech={speech}
      setNotifications={setNotifications}
      setSpeech={setSpeech}
    />
    <RunningCheck flight={flight} />
  </Fragment>
);

export default Menubar;
