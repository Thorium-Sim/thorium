import React from "react";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import {ListGroup, ListGroupItem} from "reactstrap";
import css from "@emotion/css/macro";
import DMXDevices from "./devices";
import DMXSets from "./sets";
import DMXConfigs from "./configs";

const DMX: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const devicesActive = location.pathname.includes("devices");
  const setsActive = location.pathname.includes("sets");
  const configsActive = location.pathname.includes("configs");
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          height: 100%;
          margin-left: 1rem;
          margin-right: 1rem;
          flex: 3;
        `}
      >
        <h3>DMX</h3>
        <ListGroup>
          <ListGroupItem
            active={devicesActive}
            onClick={() => navigate("devices")}
          >
            Devices
          </ListGroupItem>
          <ListGroupItem active={setsActive} onClick={() => navigate("sets")}>
            Sets
          </ListGroupItem>
          <ListGroupItem
            active={configsActive}
            onClick={() => navigate("configs")}
          >
            Configs
          </ListGroupItem>
        </ListGroup>
      </div>
      <div
        css={css`
          flex: 9;
          height: 100%;
        `}
      >
        <Routes>
          <Route path="devices" element={<DMXDevices />}></Route>
          <Route path="devices/:deviceId" element={<DMXDevices />}></Route>
          <Route path="sets" element={<DMXSets />}></Route>
          <Route path="sets/:setId" element={<DMXSets />}></Route>
          <Route path="sets/:setId/:fixtureId" element={<DMXSets />}></Route>
          <Route path="configs" element={<DMXConfigs />}></Route>
          <Route path="configs/:configId" element={<DMXConfigs />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default DMX;
