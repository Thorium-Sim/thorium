import React from "react";
import {Container, Button} from "helpers/reactstrap";
import TimelineConfig from "./TimelineConfig";
import PrintMission from "./PrintMission";
import {useParams, useNavigate, Link, Route, Routes} from "react-router-dom";
import {
  Mission,
  useRemoveMissionMutation,
  useEditMissionMutation,
  useMissionSubscriptionSubscription,
} from "generated/graphql";

import "./style.scss";

const MissionsConfig: React.FC = () => {
  const {missionId = ""} = useParams();
  const {data} = useMissionSubscriptionSubscription({
    variables: {missionId},
    skip: !missionId,
  });

  const [printingMission, setPrintingMission] = React.useState<Mission | null>(
    null,
  );
  const navigate = useNavigate();

  const [removeMissionMutation] = useRemoveMissionMutation();
  const [editMissionMutation] = useEditMissionMutation();

  const mission = data?.missionsUpdate[0];

  if (!mission) return null;

  const removeMission = () => {
    if (mission?.id) {
      if (window.confirm("Are you sure you want to delete that mission?")) {
        removeMissionMutation({variables: {id: mission.id}});
        navigate("/config/mission");
      }
    }
  };
  const updateMission = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const missionId = mission.id;
    const {value, checked} = e.target;
    editMissionMutation({
      variables: {missionId, [type]: value === "on" ? checked : value},
    });
  };
  const exportMissionScript = (mission: Mission) => {
    setPrintingMission(mission);
  };

  if (printingMission) {
    return (
      <PrintMission
        clearMission={() => setPrintingMission(null)}
        mission={printingMission}
      />
    );
  }
  if (!mission) return null;
  return (
    <Container fluid className="missionConfig">
      <Link to="/config/mission">{"<-"} Back to Missions</Link>
      <h4>
        Missions Config{" "}
        <Button color="danger" size="sm" onClick={removeMission}>
          Remove Mission
        </Button>
      </h4>
      <TimelineConfig
        mission={mission}
        removeMission={removeMission}
        updateMission={updateMission}
        exportMissionScript={exportMissionScript}
      />
      <small>
        Yellow timeline actions might need additional configuration in the
        simulator config.
      </small>
    </Container>
  );
};

const MissionsConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MissionsConfig />} />
      <Route path=":timelineStep" element={<MissionsConfig />} />
      <Route
        path=":timelineStep/:timelineAction"
        element={<MissionsConfig />}
      />
    </Routes>
  );
};

export default MissionsConfigRoutes;
