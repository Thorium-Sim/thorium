import React from "react";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import {ListGroup, ListGroupItem} from "reactstrap";
import tw from "twin.macro";
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
    <div css={tw`h-full flex justify-between`}>
      <div
        css={[
          tw`h-full mx-4`,
          css`
            flex: 3;
          `,
        ]}
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
        css={[
          tw`h-full`,
          css`
            flex: 9;
          `,
        ]}
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
