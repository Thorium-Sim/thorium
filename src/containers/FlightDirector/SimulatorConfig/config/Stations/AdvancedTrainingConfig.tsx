import React, {useState, useCallback} from "react";
import {
  Button,
  Input,
  Label,
  FormGroup,
  CustomInput,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "helpers/reactstrap";
import {useMutation} from "react-apollo";
import {useParams, useNavigate} from "react-router-dom";
import {useStationSetConfigSubscription} from "generated/graphql";
import FileExplorer from "components/views/TacticalMap/fileExplorer";
import {
  SET_STATION_ADVANCED_TRAINING,
  TOGGLE_ADVANCED_TRAINING_MODE,
} from "components/training/queries";
import {getActionLabel, VIDEO_COMPLETE_EVENT, LOGIN_EVENT} from "components/training/actionRegistry";
import RecordActionsModal from "./RecordActionsModal";

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

function emptyChapter(id: string, name: string) {
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

function serializeChapter(ch: any) {
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

interface ChapterEditorProps {
  chapter: any;
  index: number;
  label?: string;
  stationCards: any[];
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

const ChapterEditor: React.FC<ChapterEditorProps> = ({
  chapter,
  index,
  label,
  stationCards,
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
          <strong>
            {label || `${index + 1}. ${chapter.name}`}
          </strong>
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
                {stationCards.map((c: any) => (
                  <option key={c.component} value={c.component}>
                    {c.name} ({c.component})
                  </option>
                ))}
              </Input>
            </FormGroup>
          )}
          <FormGroup>
            <Label>
              Media Asset: {chapter.mediaAsset || <em>None</em>}
            </Label>
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
            <>
              <FormGroup style={{display: "flex", gap: "16px", alignItems: "flex-start", flexWrap: "wrap"}}>
                <div>
                  <Label style={{display: "block", marginBottom: "4px"}}>Media Size</Label>
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
                  <Label style={{display: "block", marginBottom: "4px"}}>Media Position</Label>
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
                  <div style={{fontSize: "11px", color: "#78909c", marginTop: "2px"}}>
                    {chapter.mediaPosition || "bottom-right"}
                  </div>
                </div>
              </FormGroup>
            </>
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
                    onChange={e => onUpdateSubChapter(sub.id, {name: e.target.value})}
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
                  <div style={{paddingLeft: "28px"}}>
                    <Label check style={{display: "flex", gap: "6px", fontSize: "12px", color: "#aaa"}}>
                      <input
                        type="checkbox"
                        checked={(sub.requiredActions || []).some(
                          (ra: any) => ra.eventName === VIDEO_COMPLETE_EVENT,
                        )}
                        onChange={e => {
                          const current = sub.requiredActions || [];
                          if (e.target.checked) {
                            if (!current.some((ra: any) => ra.eventName === VIDEO_COMPLETE_EVENT)) {
                              onUpdateSubChapter(sub.id, {
                                requiredActions: [
                                  ...current,
                                  {id: `vc-${sub.id}`, eventName: VIDEO_COMPLETE_EVENT},
                                ],
                              });
                            }
                          } else {
                            onUpdateSubChapter(sub.id, {
                              requiredActions: current.filter(
                                (ra: any) => ra.eventName !== VIDEO_COMPLETE_EVENT,
                              ),
                            });
                          }
                        }}
                      />
                      Require media to finish
                    </Label>
                  </div>
                )}
                {isLoginChapter && (
                  <div style={{paddingLeft: "28px"}}>
                    <Label check style={{display: "flex", gap: "6px", fontSize: "12px", color: "#aaa"}}>
                      <input
                        type="checkbox"
                        checked={(sub.requiredActions || []).some(
                          (ra: any) => ra.eventName === LOGIN_EVENT,
                        )}
                        onChange={e => {
                          const current = sub.requiredActions || [];
                          if (e.target.checked) {
                            if (!current.some((ra: any) => ra.eventName === LOGIN_EVENT)) {
                              onUpdateSubChapter(sub.id, {
                                requiredActions: [
                                  ...current,
                                  {id: `li-${sub.id}`, eventName: LOGIN_EVENT},
                                ],
                              });
                            }
                          } else {
                            onUpdateSubChapter(sub.id, {
                              requiredActions: current.filter(
                                (ra: any) => ra.eventName !== LOGIN_EVENT,
                              ),
                            });
                          }
                        }}
                      />
                      Require login to proceed
                    </Label>
                  </div>
                )}
                {sub.requiredActions?.length > 0 && (
                  <div style={{paddingLeft: "28px", fontSize: "12px", color: "#aaa"}}>
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

const AdvancedTrainingConfig: React.FC = () => {
  const {simulatorId, stationSetId, stationName: encodedStationName} = useParams();
  const stationName = decodeURI(encodedStationName || "");
  const navigate = useNavigate();

  const {data: stationData} = useStationSetConfigSubscription();
  const stationSets = stationData?.stationSetUpdate?.filter(
    (s: any) => s?.simulator?.id === simulatorId,
  );
  const stationSet = stationSets?.find((s: any) => s?.id === stationSetId);
  const station = stationSet?.stations?.find((s: any) => s?.name === stationName);

  const advancedTraining = (station as any)?.advancedTraining;
  const enabled = advancedTraining?.enabled ?? false;
  const sequentialChapters = advancedTraining?.sequentialChapters ?? false;
  const chapters = advancedTraining?.chapters ?? [];

  const [toggleMode] = useMutation(TOGGLE_ADVANCED_TRAINING_MODE);
  const [saveConfig] = useMutation(SET_STATION_ADVANCED_TRAINING);

  // Local editing state
  const [editingChapters, setEditingChapters] = useState<any[] | null>(null);
  const [editingSequential, setEditingSequential] = useState<boolean | null>(null);
  const [editingStripPosition, setEditingStripPosition] = useState<"top" | "bottom" | null>(null);
  const [editingLoginChapter, setEditingLoginChapter] = useState<any | null | undefined>(undefined);
  const [editingCompletionChapter, setEditingCompletionChapter] = useState<any | null | undefined>(undefined);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [recordingSubChapter, setRecordingSubChapter] = useState<string | null>(null);
  const [mediaPickerChapter, setMediaPickerChapter] = useState<string | null>(null);

  const isEditing = editingChapters !== null;
  const displayChapters = isEditing ? editingChapters : chapters;

  // undefined = not editing; null = editing with no special chapter; object = editing with chapter
  const editingLogin = editingLoginChapter !== undefined ? editingLoginChapter : advancedTraining?.loginChapter ?? null;
  const editingCompletion = editingCompletionChapter !== undefined ? editingCompletionChapter : advancedTraining?.completionChapter ?? null;

  const stationCards = station?.cards || [];

  const handleToggle = () => {
    if (!stationSetId || !stationName) return;
    toggleMode({
      variables: {stationSetID: stationSetId, stationName, enabled: !enabled},
    });
  };

  const goBack = () => {
    navigate(
      `/config/simulator/${simulatorId}/Stations/${stationSetId}/${encodeURI(stationName)}`,
    );
  };

  const startEditing = () => {
    setEditingChapters(JSON.parse(JSON.stringify(chapters)));
    setEditingSequential(sequentialChapters);
    setEditingStripPosition(advancedTraining?.stripPosition || "bottom");
    setEditingLoginChapter(
      advancedTraining?.loginChapter
        ? JSON.parse(JSON.stringify(advancedTraining.loginChapter))
        : null,
    );
    setEditingCompletionChapter(
      advancedTraining?.completionChapter
        ? JSON.parse(JSON.stringify(advancedTraining.completionChapter))
        : null,
    );
  };

  const cancelEditing = () => {
    setEditingChapters(null);
    setEditingSequential(null);
    setEditingStripPosition(null);
    setEditingLoginChapter(undefined);
    setEditingCompletionChapter(undefined);
    setExpandedChapter(null);
  };

  const saveEditing = () => {
    if (!stationSetId || !stationName || !editingChapters) return;
    saveConfig({
      variables: {
        stationSetID: stationSetId,
        stationName,
        config: {
          enabled,
          sequentialChapters: editingSequential ?? sequentialChapters,
          stripPosition: editingStripPosition ?? advancedTraining?.stripPosition ?? "bottom",
          chapters: editingChapters.map(serializeChapter),
          loginChapter: editingLogin ? serializeChapter(editingLogin) : null,
          completionChapter: editingCompletion
            ? serializeChapter(editingCompletion)
            : null,
        },
      },
    });
    setEditingChapters(null);
    setEditingLoginChapter(undefined);
    setEditingCompletionChapter(undefined);
    setExpandedChapter(null);
  };

  const addChapter = () => {
    if (!editingChapters) return;
    const newChapter = emptyChapter(
      `ch-${Date.now()}`,
      "New Chapter",
    );
    (newChapter as any).cardComponent = stationCards[0]?.component || "";
    setEditingChapters([...editingChapters, newChapter]);
    setExpandedChapter(newChapter.id);
  };

  const removeChapter = (chapterId: string) => {
    if (!editingChapters) return;
    setEditingChapters(editingChapters.filter((c: any) => c.id !== chapterId));
    if (expandedChapter === chapterId) setExpandedChapter(null);
  };

  const updateChapter = useCallback(
    (chapterId: string, updates: any) => {
      if (!editingChapters) return;
      setEditingChapters(
        editingChapters.map((c: any) =>
          c.id === chapterId ? {...c, ...updates} : c,
        ),
      );
    },
    [editingChapters],
  );

  const addSubChapter = (chapterId: string, isSpecial?: "login" | "completion") => {
    const newSub = {
      id: `sc-${Date.now()}`,
      name: "New Sub-Chapter",
      requiredActions: [],
    };
    if (isSpecial === "login") {
      setEditingLoginChapter((prev: any) => ({
        ...prev,
        subChapters: [...(prev?.subChapters || []), newSub],
      }));
    } else if (isSpecial === "completion") {
      setEditingCompletionChapter((prev: any) => ({
        ...prev,
        subChapters: [...(prev?.subChapters || []), newSub],
      }));
    } else {
      if (!editingChapters) return;
      setEditingChapters(
        editingChapters.map((c: any) =>
          c.id === chapterId
            ? {...c, subChapters: [...(c.subChapters || []), newSub]}
            : c,
        ),
      );
    }
  };

  const removeSubChapter = (chapterId: string, subChapterId: string, isSpecial?: "login" | "completion") => {
    if (isSpecial === "login") {
      setEditingLoginChapter((prev: any) => ({
        ...prev,
        subChapters: prev.subChapters.filter((s: any) => s.id !== subChapterId),
      }));
    } else if (isSpecial === "completion") {
      setEditingCompletionChapter((prev: any) => ({
        ...prev,
        subChapters: prev.subChapters.filter((s: any) => s.id !== subChapterId),
      }));
    } else {
      if (!editingChapters) return;
      setEditingChapters(
        editingChapters.map((c: any) =>
          c.id === chapterId
            ? {...c, subChapters: c.subChapters.filter((s: any) => s.id !== subChapterId)}
            : c,
        ),
      );
    }
  };

  const updateSubChapter = (
    chapterId: string,
    subChapterId: string,
    updates: any,
    isSpecial?: "login" | "completion",
  ) => {
    if (isSpecial === "login") {
      setEditingLoginChapter((prev: any) => ({
        ...prev,
        subChapters: prev.subChapters.map((s: any) =>
          s.id === subChapterId ? {...s, ...updates} : s,
        ),
      }));
    } else if (isSpecial === "completion") {
      setEditingCompletionChapter((prev: any) => ({
        ...prev,
        subChapters: prev.subChapters.map((s: any) =>
          s.id === subChapterId ? {...s, ...updates} : s,
        ),
      }));
    } else {
      if (!editingChapters) return;
      setEditingChapters(
        editingChapters.map((c: any) =>
          c.id === chapterId
            ? {
                ...c,
                subChapters: c.subChapters.map((s: any) =>
                  s.id === subChapterId ? {...s, ...updates} : s,
                ),
              }
            : c,
        ),
      );
    }
  };

  // Record mode helpers
  const startRecording = (chapterId: string, subChapterId: string) => {
    setRecordingSubChapter(`${chapterId}:${subChapterId}`);
  };

  const cancelRecording = () => {
    setRecordingSubChapter(null);
  };

  const saveRecording = (actions: any[]) => {
    if (!recordingSubChapter || !editingChapters) return;
    const [chapterId, subChapterId] = recordingSubChapter.split(":");
    updateSubChapter(chapterId, subChapterId, {requiredActions: actions});
    setRecordingSubChapter(null);
  };

  const recordingChapterId = recordingSubChapter?.split(":")[0];
  const recordingSubChapterId = recordingSubChapter?.split(":")[1];
  const recordingChapter = editingChapters?.find(
    (c: any) => c.id === recordingChapterId,
  );
  const recordingSubChapterData = recordingChapter?.subChapters?.find(
    (s: any) => s.id === recordingSubChapterId,
  );

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
        <h4 style={{margin: 0}}>
          Advanced Training &mdash; {stationName}
        </h4>
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
            height: "85vh"
          }}
        >
          {!isEditing ? (
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
              </div>
              {chapters.map((ch: any, idx: number) => (
                <div
                  key={ch.id}
                  style={{padding: "4px 8px", fontSize: "13px", color: "#ccc"}}
                >
                  {idx + 1}. {ch.name}{" "}
                  <span style={{color: "#888"}}>
                    ({ch.cardComponent}, {ch.subChapters?.length || 0} sub-tasks)
                  </span>
                </div>
              ))}
              <Button
                size="sm"
                color="info"
                onClick={startEditing}
                style={{marginTop: "8px"}}
              >
                Edit Chapters
              </Button>
            </>
          ) : (
            <>
              <FormGroup style={{marginBottom: "12px", display: "flex", gap: "24px", flexWrap: "wrap"}}>
                <Label check style={{display: "flex", gap: "8px", fontWeight: 500}}>
                  <input
                    type="checkbox"
                    checked={editingSequential ?? sequentialChapters}
                    onChange={e => setEditingSequential(e.target.checked)}
                  />
                  Sequential chapters (lock until previous complete)
                </Label>
                <div style={{display: "flex", alignItems: "center", gap: "8px", fontWeight: 500}}>
                  Training bar:
                  <Label check style={{display: "flex", gap: "4px", marginBottom: 0, fontWeight: 400}}>
                    <input
                      type="radio"
                      checked={(editingStripPosition ?? "bottom") === "bottom"}
                      onChange={() => setEditingStripPosition("bottom")}
                    />
                    Bottom
                  </Label>
                  <Label check style={{display: "flex", gap: "4px", marginBottom: 0, fontWeight: 400}}>
                    <input
                      type="radio"
                      checked={(editingStripPosition ?? "bottom") === "top"}
                      onChange={() => setEditingStripPosition("top")}
                    />
                    Top
                  </Label>
                </div>
              </FormGroup>

              {/* Login chapter */}
              <div style={{marginBottom: "12px"}}>
                <Label check style={{display: "flex", gap: "8px", fontWeight: 500, marginBottom: "6px"}}>
                  <input
                    type="checkbox"
                    checked={!!editingLogin}
                    onChange={e => {
                      if (e.target.checked) {
                        setEditingLoginChapter(emptyChapter(`login-${Date.now()}`, "Login Chapter"));
                      } else {
                        setEditingLoginChapter(null);
                        if (expandedChapter === editingLogin?.id) setExpandedChapter(null);
                      }
                    }}
                  />
                  Login Chapter (shown on login screen before training starts)
                </Label>
                {editingLogin && (
                  <>
                    <div style={{paddingLeft: "24px", marginBottom: "8px", fontSize: "13px"}}>
                      <div style={{fontWeight: 500, marginBottom: "4px"}}>Station Login</div>
                      {(["none", "immediate", "on-complete"] as const).map(opt => (
                        <Label key={opt} check style={{display: "flex", gap: "6px", marginBottom: "3px", fontWeight: 400}}>
                          <input
                            type="radio"
                            name={`autoLogin-${editingLogin.id}`}
                            value={opt}
                            checked={(editingLogin.autoLogin ?? "none") === opt}
                            onChange={() =>
                              setEditingLoginChapter((prev: any) => ({...prev, autoLogin: opt}))
                            }
                          />
                          {opt === "none" && "None (crew logs in manually)"}
                          {opt === "immediate" && "Auto-login when training starts"}
                          {opt === "on-complete" && "Auto-login after login chapter completes"}
                        </Label>
                      ))}
                    </div>
                    <ChapterEditor
                      chapter={editingLogin}
                      index={-1}
                      label={`Login: ${editingLogin.name}`}
                      stationCards={stationCards}
                      isExpanded={expandedChapter === editingLogin.id}
                      onToggleExpand={() =>
                        setExpandedChapter(
                          expandedChapter === editingLogin.id ? null : editingLogin.id,
                        )
                      }
                      onUpdate={updates =>
                        setEditingLoginChapter((prev: any) => ({...prev, ...updates}))
                      }
                      onAddSubChapter={() => addSubChapter(editingLogin.id, "login")}
                      onRemoveSubChapter={subId => removeSubChapter(editingLogin.id, subId, "login")}
                      onUpdateSubChapter={(subId, updates) =>
                        updateSubChapter(editingLogin.id, subId, updates, "login")
                      }
                      onStartRecording={subId => startRecording(editingLogin.id, subId)}
                      onSetMediaPicker={() => setMediaPickerChapter(`login:${editingLogin.id}`)}
                      showCardSelector={false}
                      isLoginChapter
                    />
                  </>
                )}
              </div>

              {/* Regular chapters */}
              {displayChapters?.map((chapter: any, chIdx: number) => (
                <ChapterEditor
                  key={chapter.id}
                  chapter={chapter}
                  index={chIdx}
                  stationCards={stationCards}
                  isExpanded={expandedChapter === chapter.id}
                  onToggleExpand={() =>
                    setExpandedChapter(
                      expandedChapter === chapter.id ? null : chapter.id,
                    )
                  }
                  onUpdate={updates => updateChapter(chapter.id, updates)}
                  onRemove={() => removeChapter(chapter.id)}
                  onAddSubChapter={() => addSubChapter(chapter.id)}
                  onRemoveSubChapter={subId => removeSubChapter(chapter.id, subId)}
                  onUpdateSubChapter={(subId, updates) =>
                    updateSubChapter(chapter.id, subId, updates)
                  }
                  onStartRecording={subId => startRecording(chapter.id, subId)}
                  onSetMediaPicker={() => setMediaPickerChapter(chapter.id)}
                />
              ))}

              {/* Completion chapter */}
              <div style={{marginTop: "8px", marginBottom: "12px"}}>
                <Label check style={{display: "flex", gap: "8px", fontWeight: 500, marginBottom: "6px"}}>
                  <input
                    type="checkbox"
                    checked={!!editingCompletion}
                    onChange={e => {
                      if (e.target.checked) {
                        setEditingCompletionChapter(
                          emptyChapter(`completion-${Date.now()}`, "Training Complete"),
                        );
                      } else {
                        setEditingCompletionChapter(null);
                        if (expandedChapter === editingCompletion?.id)
                          setExpandedChapter(null);
                      }
                    }}
                  />
                  Completion Chapter (shown after all chapters are finished)
                </Label>
                {editingCompletion && (
                  <ChapterEditor
                    chapter={editingCompletion}
                    index={displayChapters?.length || 0}
                    label={`Completion: ${editingCompletion.name}`}
                    stationCards={stationCards}
                    isExpanded={expandedChapter === editingCompletion.id}
                    onToggleExpand={() =>
                      setExpandedChapter(
                        expandedChapter === editingCompletion.id
                          ? null
                          : editingCompletion.id,
                      )
                    }
                    onUpdate={updates =>
                      setEditingCompletionChapter((prev: any) => ({...prev, ...updates}))
                    }
                    onAddSubChapter={() =>
                      addSubChapter(editingCompletion.id, "completion")
                    }
                    onRemoveSubChapter={subId =>
                      removeSubChapter(editingCompletion.id, subId, "completion")
                    }
                    onUpdateSubChapter={(subId, updates) =>
                      updateSubChapter(editingCompletion.id, subId, updates, "completion")
                    }
                    onStartRecording={subId => startRecording(editingCompletion.id, subId)}
                    onSetMediaPicker={() =>
                      setMediaPickerChapter(`completion:${editingCompletion.id}`)
                    }
                    showCardSelector={false}
                  />
                )}
              </div>

              <div style={{display: "flex", gap: "8px", marginTop: "8px"}}>
                <Button size="sm" color="success" outline onClick={addChapter}>
                  + Add Chapter
                </Button>
                <Button size="sm" color="primary" onClick={saveEditing}>
                  Save
                </Button>
                <Button size="sm" color="secondary" outline onClick={cancelEditing}>
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Media picker modal */}
      <Modal
        isOpen={!!mediaPickerChapter}
        toggle={() => setMediaPickerChapter(null)}
      >
        <ModalHeader toggle={() => setMediaPickerChapter(null)}>
          Select Training Media
        </ModalHeader>
        <ModalBody>
          <FileExplorer
            directory="/Training"
            selectedFiles={[]}
            onClick={(_evt: any, container: any) => {
              if (mediaPickerChapter) {
                const isLogin = mediaPickerChapter.startsWith("login:");
                const isCompletion = mediaPickerChapter.startsWith("completion:");
                if (isLogin) {
                  setEditingLoginChapter((prev: any) => ({
                    ...prev,
                    mediaAsset: container.fullPath,
                  }));
                } else if (isCompletion) {
                  setEditingCompletionChapter((prev: any) => ({
                    ...prev,
                    mediaAsset: container.fullPath,
                  }));
                } else {
                  updateChapter(mediaPickerChapter, {mediaAsset: container.fullPath});
                }
              }
              setMediaPickerChapter(null);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setMediaPickerChapter(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Record actions modal */}
      <RecordActionsModal
        isOpen={!!recordingSubChapter}
        chapter={recordingChapter}
        existingActions={recordingSubChapterData?.requiredActions || []}
        simulatorId={simulatorId || ""}
        stationSetId={stationSetId || ""}
        stationName={stationName}
        onSave={saveRecording}
        onCancel={cancelRecording}
      />
    </Container>
  );
};

export default AdvancedTrainingConfig;
