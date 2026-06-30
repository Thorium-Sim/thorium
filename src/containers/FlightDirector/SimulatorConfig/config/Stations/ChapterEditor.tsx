import React from "react";
import {
  Button,
  Input,
  Label,
  FormGroup,
  Card,
  CardBody,
  CardHeader,
  Collapse,
} from "helpers/reactstrap";
import {
  getActionLabel,
  VIDEO_COMPLETE_EVENT,
  LOGIN_EVENT,
} from "components/training/actionRegistry";

// 3x3 grid of anchor points for positioning a chapter's media overlay.
const MEDIA_POSITIONS = [
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

// A blank chapter, used when the FD adds a new chapter of any kind.
export function emptyChapter(id: string, name: string) {
  return {
    id,
    name,
    cardComponent: "",
    mediaAsset: null,
    autoOpenMedia: false,
    autoAdvance: false,
    autoLogin: "none",
    cardSwitchBehavior: "manual",
    mediaSize: "small",
    mediaPosition: "bottom-right",
    subChapters: [],
  };
}

// Normalize a chapter (and its nested sub-chapters/actions) into the exact shape
// the server mutation expects, dropping any extra client-only fields.
export function serializeChapter(ch: any) {
  return {
    id: ch.id,
    name: ch.name,
    cardComponent: ch.cardComponent || "",
    mediaAsset: ch.mediaAsset || null,
    autoOpenMedia: ch.autoOpenMedia ?? false,
    autoAdvance: ch.autoAdvance ?? false,
    autoLogin: ch.autoLogin ?? "none",
    cardSwitchBehavior: ch.cardSwitchBehavior || "manual",
    mediaSize: ch.mediaSize || "small",
    mediaPosition: ch.mediaPosition || "bottom-right",
    subChapters: (ch.subChapters || []).map((sc: any) => ({
      id: sc.id,
      name: sc.name,
      requiredActions: (sc.requiredActions || []).map((ra: any) => ({
        id: ra.id,
        eventName: ra.eventName,
        args: ra.args || null,
      })),
    })),
  };
}

interface SyntheticActionToggleProps {
  sub: any;
  eventName: string;
  idPrefix: string;
  label: string;
  onUpdateSubChapter: (subId: string, updates: any) => void;
}

// Checkbox that adds/removes a single synthetic required action (e.g. "media
// finished" or "logged in") on a sub-chapter. These actions have no card UI to
// click, so the FD toggles them directly.
const SyntheticActionToggle: React.FC<SyntheticActionToggleProps> = ({
  sub,
  eventName,
  idPrefix,
  label,
  onUpdateSubChapter,
}) => {
  const current = sub.requiredActions || [];
  const checked = current.some((ra: any) => ra.eventName === eventName);
  return (
    <div style={{paddingLeft: "28px"}}>
      <Label
        check
        style={{display: "flex", gap: "6px", fontSize: "12px", color: "#aaa"}}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={e => {
            if (e.target.checked) {
              if (!checked) {
                onUpdateSubChapter(sub.id, {
                  requiredActions: [
                    ...current,
                    {id: `${idPrefix}-${sub.id}`, eventName},
                  ],
                });
              }
            } else {
              onUpdateSubChapter(sub.id, {
                requiredActions: current.filter(
                  (ra: any) => ra.eventName !== eventName,
                ),
              });
            }
          }}
        />
        {label}
      </Label>
    </div>
  );
};

interface ChapterEditorProps {
  chapter: any;
  index: number;
  label?: string;
  stationCards: any[];
  // When provided, the Card selector uses this explicit list instead of the
  // station's cards (e.g. in-flight chapters that can target any card component,
  // including ones not on this station). Each entry is {value, label}.
  cardOptions?: {value: string; label: string}[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: any) => void;
  onRemove?: () => void;
  onAddSubChapter: () => void;
  onRemoveSubChapter: (subId: string) => void;
  onUpdateSubChapter: (subId: string, updates: any) => void;
  onStartRecording: (subId: string) => void;
  onSetMediaPicker: () => void;
  showCardSelector?: boolean;
  isLoginChapter?: boolean;
}

export const ChapterEditor: React.FC<ChapterEditorProps> = ({
  chapter,
  index,
  label,
  stationCards,
  cardOptions,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onRemove,
  onAddSubChapter,
  onRemoveSubChapter,
  onUpdateSubChapter,
  onStartRecording,
  onSetMediaPicker,
  showCardSelector = true,
  isLoginChapter = false,
}) => {
  const cardSelectOptions =
    cardOptions ||
    stationCards.map((c: any) => ({
      value: c.component,
      label: `${c.name} (${c.component})`,
    }));
  return (
    <Card style={{marginBottom: "8px", background: "rgba(0,0,0,0.2)"}}>
      <CardHeader
        onClick={onToggleExpand}
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
        }}
      >
        <span>
          <strong>{label || `${index + 1}. ${chapter.name}`}</strong>
          {showCardSelector && (
            <small style={{marginLeft: "8px", color: "#888"}}>
              {chapter.cardComponent}
            </small>
          )}
        </span>
        {onRemove && (
          <Button
            size="sm"
            color="danger"
            outline
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            Remove
          </Button>
        )}
      </CardHeader>
      <Collapse isOpen={isExpanded}>
        <CardBody style={{padding: "12px"}}>
          <FormGroup>
            <Label>Chapter Name</Label>
            <Input
              value={chapter.name}
              onChange={e => onUpdate({name: e.target.value})}
            />
          </FormGroup>
          {showCardSelector && (
            <FormGroup>
              <Label>Card</Label>
              <Input
                type="select"
                value={chapter.cardComponent}
                onChange={e => onUpdate({cardComponent: e.target.value})}
              >
                <option value="">-- Select Card --</option>
                {cardSelectOptions.map((c: {value: string; label: string}) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </Input>
            </FormGroup>
          )}
          <FormGroup>
            <Label>Media Asset: {chapter.mediaAsset || <em>None</em>}</Label>
            <div style={{display: "flex", gap: "4px"}}>
              <Button size="sm" color="secondary" onClick={onSetMediaPicker}>
                Browse
              </Button>
              {chapter.mediaAsset && (
                <Button
                  size="sm"
                  color="warning"
                  onClick={() => onUpdate({mediaAsset: null})}
                >
                  Clear
                </Button>
              )}
            </div>
          </FormGroup>
          {chapter.mediaAsset && (
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
                  Media Size
                </Label>
                <Input
                  type="select"
                  bsSize="sm"
                  style={{width: "auto"}}
                  value={chapter.mediaSize || "small"}
                  onChange={e => onUpdate({mediaSize: e.target.value})}
                >
                  <option value="small">Small (25%)</option>
                  <option value="medium">Medium (40%)</option>
                  <option value="large">Large (60%)</option>
                </Input>
              </div>
              <div>
                <Label style={{display: "block", marginBottom: "4px"}}>
                  Media Position
                </Label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 28px)",
                    gap: "3px",
                  }}
                >
                  {MEDIA_POSITIONS.map(pos => (
                    <button
                      key={pos}
                      title={pos}
                      onClick={() => onUpdate({mediaPosition: pos})}
                      style={{
                        width: "28px",
                        height: "28px",
                        background:
                          (chapter.mediaPosition || "bottom-right") === pos
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
                  {chapter.mediaPosition || "bottom-right"}
                </div>
              </div>
            </FormGroup>
          )}
          <FormGroup style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>
            <Label check style={{display: "flex", gap: "4px"}}>
              <input
                type="checkbox"
                checked={chapter.autoOpenMedia ?? false}
                onChange={e => onUpdate({autoOpenMedia: e.target.checked})}
              />
              Auto-open media
            </Label>
            <Label check style={{display: "flex", gap: "4px"}}>
              <input
                type="checkbox"
                checked={chapter.autoAdvance ?? false}
                onChange={e => onUpdate({autoAdvance: e.target.checked})}
              />
              Auto-advance
            </Label>
            {showCardSelector && (
              <Label>
                Card switch:{" "}
                <Input
                  type="select"
                  bsSize="sm"
                  style={{display: "inline-block", width: "auto"}}
                  value={chapter.cardSwitchBehavior || "manual"}
                  onChange={e => onUpdate({cardSwitchBehavior: e.target.value})}
                >
                  <option value="manual">Manual</option>
                  <option value="auto">Auto</option>
                </Input>
              </Label>
            )}
          </FormGroup>

          {/* Sub-chapters */}
          <div style={{marginTop: "8px"}}>
            <Label style={{fontWeight: 600}}>Sub-Chapters</Label>
            {(chapter.subChapters || []).map((sub: any, sIdx: number) => (
              <div
                key={sub.id}
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  padding: "8px",
                  marginBottom: "6px",
                  background: "rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{color: "#888", minWidth: "20px"}}>
                    {index + 1}.{sIdx + 1}
                  </span>
                  <Input
                    bsSize="sm"
                    value={sub.name}
                    onChange={e =>
                      onUpdateSubChapter(sub.id, {name: e.target.value})
                    }
                    style={{flex: 1}}
                  />
                  <Button
                    size="sm"
                    color="info"
                    outline
                    onClick={() => onStartRecording(sub.id)}
                  >
                    Record Actions
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    outline
                    onClick={() => onRemoveSubChapter(sub.id)}
                  >
                    X
                  </Button>
                </div>
                {chapter.mediaAsset && (
                  <SyntheticActionToggle
                    sub={sub}
                    eventName={VIDEO_COMPLETE_EVENT}
                    idPrefix="vc"
                    label="Require media to finish"
                    onUpdateSubChapter={onUpdateSubChapter}
                  />
                )}
                {isLoginChapter && (
                  <SyntheticActionToggle
                    sub={sub}
                    eventName={LOGIN_EVENT}
                    idPrefix="li"
                    label="Require login to proceed"
                    onUpdateSubChapter={onUpdateSubChapter}
                  />
                )}
                {sub.requiredActions?.length > 0 && (
                  <div
                    style={{
                      paddingLeft: "28px",
                      fontSize: "12px",
                      color: "#aaa",
                    }}
                  >
                    Required:{" "}
                    {sub.requiredActions
                      .map((ra: any) =>
                        getActionLabel(ra.eventName, chapter.cardComponent),
                      )
                      .join(", ")}
                  </div>
                )}
              </div>
            ))}
            <Button size="sm" color="success" outline onClick={onAddSubChapter}>
              + Add Sub-Chapter
            </Button>
          </div>
        </CardBody>
      </Collapse>
    </Card>
  );
};
