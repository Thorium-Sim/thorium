import React from "react";
import {Input, Label, FormGroup} from "helpers/reactstrap";
import {useTacticalMapListSubscription} from "generated/graphql";

// FD panel for authoring a chapter's tactical-map training exercise. Mirrors
// the shape of the media-asset section in ChapterEditor.tsx (size + 3x3
// position grid + auto-open), but sources its "asset" from the existing
// Tactical Map template list instead of the asset file browser, since a
// tactical map is authored in its own dedicated editor (/config/tacticals),
// not picked from a file.

// Reuses the same 3x3 anchor grid as MEDIA_POSITIONS in ChapterEditor.tsx —
// duplicated locally to keep this file self-contained.
const TACTICAL_MAP_POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "middle-center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

interface TrainingTacticalMapConfigProps {
  chapter: any;
  onUpdate: (updates: any) => void;
}

const TrainingTacticalMapConfig: React.FC<TrainingTacticalMapConfigProps> = ({
  chapter,
  onUpdate,
}) => {
  const {data, loading} = useTacticalMapListSubscription();
  const templates = (data?.tacticalMapsUpdate || []).filter(
    (t: any) => t?.template,
  );

  return (
    <>
      <FormGroup>
        <Label style={{display: "block", marginBottom: "4px"}}>
          Tactical Map Exercise
        </Label>
        <div style={{display: "flex", gap: "4px"}}>
          <Input
            type="select"
            bsSize="sm"
            style={{width: "auto"}}
            disabled={loading}
            value={chapter.tacticalMapId || ""}
            onChange={e => onUpdate({tacticalMapId: e.target.value || null})}
          >
            <option value="">-- None --</option>
            {templates.map((t: any) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Input>
        </div>
        <div style={{fontSize: "11px", color: "#78909c", marginTop: "2px"}}>
          A fresh copy of this template map is given to each trainee when the
          chapter starts. Author it in Tactical Map Config (/config/tacticals).
        </div>
      </FormGroup>
      {chapter.tacticalMapId && (
        <>
          <FormGroup
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div>
              <Label style={{display: "block", marginBottom: "4px"}}>
                Map Size
              </Label>
              <Input
                type="select"
                bsSize="sm"
                style={{width: "auto"}}
                value={chapter.tacticalMapSize || "medium"}
                onChange={e => onUpdate({tacticalMapSize: e.target.value})}
              >
                <option value="small">Small (25%)</option>
                <option value="medium">Medium (40%)</option>
                <option value="large">Large (60%)</option>
              </Input>
            </div>
            <div>
              <Label style={{display: "block", marginBottom: "4px"}}>
                Map Position
              </Label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 28px)",
                  gap: "3px",
                }}
              >
                {TACTICAL_MAP_POSITIONS.map(pos => (
                  <button
                    key={pos}
                    title={pos}
                    onClick={() => onUpdate({tacticalMapPosition: pos})}
                    style={{
                      width: "28px",
                      height: "28px",
                      background:
                        (chapter.tacticalMapPosition || "bottom-right") === pos
                          ? "#00bcd4"
                          : "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "3px",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
              <div
                style={{fontSize: "11px", color: "#78909c", marginTop: "2px"}}
              >
                {chapter.tacticalMapPosition || "bottom-right"}
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label check style={{display: "flex", gap: "4px"}}>
              <input
                type="checkbox"
                checked={chapter.autoOpenTacticalMap ?? false}
                onChange={e =>
                  onUpdate({autoOpenTacticalMap: e.target.checked})
                }
              />
              Auto-open tactical map
            </Label>
          </FormGroup>
        </>
      )}
    </>
  );
};

export default TrainingTacticalMapConfig;
