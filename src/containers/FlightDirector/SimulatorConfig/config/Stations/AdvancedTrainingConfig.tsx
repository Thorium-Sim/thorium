import React from "react";
import {Button, Label, CustomInput, Container} from "helpers/reactstrap";
import {useMutation} from "react-apollo";
import {useParams, useNavigate} from "react-router-dom";
import {useStationSetConfigSubscription} from "generated/graphql";
import {TOGGLE_ADVANCED_TRAINING_MODE} from "components/training/queries";
import {useAdvancedTrainingConfigEditor} from "./useAdvancedTrainingConfigEditor";
import AdvancedTrainingEditor from "./AdvancedTrainingEditor";

const AdvancedTrainingConfig: React.FC = () => {
  const {
    simulatorId,
    stationSetId,
    stationName: encodedStationName,
  } = useParams();
  const stationName = decodeURI(encodedStationName || "");
  const navigate = useNavigate();

  const {data: stationData} = useStationSetConfigSubscription();
  const stationSets = stationData?.stationSetUpdate?.filter(
    (s: any) => s?.simulator?.id === simulatorId,
  );
  const stationSet = stationSets?.find((s: any) => s?.id === stationSetId);
  const station = stationSet?.stations?.find(
    (s: any) => s?.name === stationName,
  );

  const advancedTraining = (station as any)?.advancedTraining;
  const enabled = advancedTraining?.enabled ?? false;
  const sequentialChapters = advancedTraining?.sequentialChapters ?? false;
  const chapters = advancedTraining?.chapters ?? [];
  const inFlightChapters = advancedTraining?.inFlightChapters ?? [];
  const stationCards = station?.cards || [];

  const [toggleMode] = useMutation(TOGGLE_ADVANCED_TRAINING_MODE);

  const editor = useAdvancedTrainingConfigEditor({
    advancedTraining,
    chapters,
    inFlightChapters,
    sequentialChapters,
    enabled,
    stationCards,
    stationSetId,
    stationName,
  });

  const handleToggle = () => {
    if (!stationSetId || !stationName) {
      return;
    }
    toggleMode({
      variables: {stationSetID: stationSetId, stationName, enabled: !enabled},
    });
  };

  const goBack = () => {
    navigate(
      `/config/simulator/${simulatorId}/Stations/${stationSetId}/${encodeURI(
        stationName,
      )}`,
    );
  };

  if (!station) {
    return (
      <Container className="advanced-training-config-page">
        <p>Loading station data...</p>
        <Button color="secondary" onClick={goBack}>
          Back to Station Config
        </Button>
      </Container>
    );
  }

  return (
    <Container className="advanced-training-config-page" fluid>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <Button color="secondary" size="sm" onClick={goBack}>
          &larr; Back
        </Button>
        <h4 style={{margin: 0}}>Advanced Training &mdash; {stationName}</h4>
      </div>

      <Label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: 600,
          marginBottom: "16px",
        }}
      >
        <CustomInput
          type="switch"
          id="advanced-training-toggle"
          checked={enabled}
          onChange={handleToggle}
        />
        Enable Advanced Training
      </Label>

      {enabled && (
        <div
          style={{
            border: "1px solid rgba(0,188,212,0.3)",
            borderRadius: "4px",
            padding: "16px",
            overflowY: "auto",
            height: "85vh",
          }}
        >
          {!editor.isEditing ? (
            <>
              <div style={{marginBottom: "8px"}}>
                <strong>{chapters.length}</strong> chapter
                {chapters.length !== 1 ? "s" : ""} configured
                {advancedTraining?.loginChapter && (
                  <span style={{marginLeft: "8px", color: "#80deea"}}>
                    + login chapter
                  </span>
                )}
                {advancedTraining?.completionChapter && (
                  <span style={{marginLeft: "8px", color: "#80deea"}}>
                    + completion chapter
                  </span>
                )}
                {inFlightChapters.length > 0 && (
                  <span style={{marginLeft: "8px", color: "#80deea"}}>
                    + {inFlightChapters.length} in-flight help chapter
                    {inFlightChapters.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {chapters.map((ch: any, idx: number) => (
                <div
                  key={ch.id}
                  style={{padding: "4px 8px", fontSize: "13px", color: "#ccc"}}
                >
                  {idx + 1}. {ch.name}{" "}
                  <span style={{color: "#888"}}>
                    ({ch.cardComponent}, {ch.subChapters?.length || 0}{" "}
                    sub-tasks)
                  </span>
                </div>
              ))}
              {inFlightChapters.map((ch: any) => (
                <div
                  key={ch.id}
                  style={{padding: "4px 8px", fontSize: "13px", color: "#ccc"}}
                >
                  <span style={{color: "#80deea"}}>⚑ {ch.name}</span>{" "}
                  <span style={{color: "#888"}}>
                    ({ch.cardComponent}, {ch.subChapters?.length || 0}{" "}
                    sub-tasks)
                  </span>
                </div>
              ))}
              <Button
                size="sm"
                color="info"
                onClick={editor.startEditing}
                style={{marginTop: "8px"}}
              >
                Edit Chapters
              </Button>
            </>
          ) : (
            <AdvancedTrainingEditor
              editor={editor}
              stationCards={stationCards}
              sequentialChapters={sequentialChapters}
              simulatorId={simulatorId || ""}
              stationSetId={stationSetId || ""}
              stationName={stationName}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default AdvancedTrainingConfig;
