import {useState, useCallback} from "react";
import {useMutation} from "react-apollo";
import {SET_STATION_ADVANCED_TRAINING} from "components/training/queries";
import {emptyChapter, serializeChapter} from "./ChapterEditor";

// Which collection a sub-chapter edit targets. `undefined` means a regular
// chapter in the main sequence.
type SpecialKind = "login" | "completion" | "inflight";

interface UseAdvancedTrainingConfigEditorParams {
  advancedTraining: any;
  chapters: any[];
  inFlightChapters: any[];
  sequentialChapters: boolean;
  enabled: boolean;
  stationCards: any[];
  stationSetId?: string;
  stationName: string;
}

// Owns the entire "edit chapters" state machine for the Advanced Training config
// page: the working copies of every chapter collection, expansion/recording UI
// state, and all the add/remove/update handlers. Kept out of the page component
// so the JSX stays readable. Editing works on deep clones; nothing is persisted
// until saveEditing fires the mutation.
export function useAdvancedTrainingConfigEditor({
  advancedTraining,
  chapters,
  inFlightChapters,
  sequentialChapters,
  enabled,
  stationCards,
  stationSetId,
  stationName,
}: UseAdvancedTrainingConfigEditorParams) {
  const [saveConfig] = useMutation(SET_STATION_ADVANCED_TRAINING);

  // Local editing state
  const [editingChapters, setEditingChapters] = useState<any[] | null>(null);
  const [editingInFlightChapters, setEditingInFlightChapters] = useState<
    any[] | null
  >(null);
  const [editingSequential, setEditingSequential] = useState<boolean | null>(
    null,
  );
  const [editingStripPosition, setEditingStripPosition] = useState<
    "top" | "bottom" | null
  >(null);
  const [editingLoginChapter, setEditingLoginChapter] = useState<
    any | null | undefined
  >(undefined);
  const [editingCompletionChapter, setEditingCompletionChapter] = useState<
    any | null | undefined
  >(undefined);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [recordingSubChapter, setRecordingSubChapter] = useState<string | null>(
    null,
  );
  const [mediaPickerChapter, setMediaPickerChapter] = useState<string | null>(
    null,
  );

  const isEditing = editingChapters !== null;
  const displayChapters = isEditing ? editingChapters : chapters;

  // undefined = not editing; null = editing with no special chapter; object = editing with chapter
  const editingLogin =
    editingLoginChapter !== undefined
      ? editingLoginChapter
      : advancedTraining?.loginChapter ?? null;
  const editingCompletion =
    editingCompletionChapter !== undefined
      ? editingCompletionChapter
      : advancedTraining?.completionChapter ?? null;

  // Expand the given chapter, or collapse it if it's already expanded.
  const toggleExpand = useCallback((chapterId: string) => {
    setExpandedChapter(prev => (prev === chapterId ? null : chapterId));
  }, []);

  const startEditing = () => {
    setEditingChapters(JSON.parse(JSON.stringify(chapters)));
    setEditingInFlightChapters(JSON.parse(JSON.stringify(inFlightChapters)));
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
    setEditingInFlightChapters(null);
    setEditingSequential(null);
    setEditingStripPosition(null);
    setEditingLoginChapter(undefined);
    setEditingCompletionChapter(undefined);
    setExpandedChapter(null);
  };

  const saveEditing = () => {
    if (!stationSetId || !stationName || !editingChapters) {
      return;
    }
    saveConfig({
      variables: {
        stationSetID: stationSetId,
        stationName,
        config: {
          enabled,
          sequentialChapters: editingSequential ?? sequentialChapters,
          stripPosition:
            editingStripPosition ?? advancedTraining?.stripPosition ?? "bottom",
          chapters: editingChapters.map(serializeChapter),
          inFlightChapters: (editingInFlightChapters || []).map(
            serializeChapter,
          ),
          loginChapter: editingLogin ? serializeChapter(editingLogin) : null,
          completionChapter: editingCompletion
            ? serializeChapter(editingCompletion)
            : null,
        },
      },
    });
    setEditingChapters(null);
    setEditingInFlightChapters(null);
    setEditingLoginChapter(undefined);
    setEditingCompletionChapter(undefined);
    setExpandedChapter(null);
  };

  // --- Regular chapter list handlers ---
  const addChapter = () => {
    if (!editingChapters) {
      return;
    }
    const newChapter = emptyChapter(`ch-${Date.now()}`, "New Chapter");
    (newChapter as any).cardComponent = stationCards[0]?.component || "";
    setEditingChapters([...editingChapters, newChapter]);
    setExpandedChapter(newChapter.id);
  };

  const removeChapter = (chapterId: string) => {
    if (!editingChapters) {
      return;
    }
    setEditingChapters(editingChapters.filter((c: any) => c.id !== chapterId));
    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    }
  };

  const updateChapter = useCallback(
    (chapterId: string, updates: any) => {
      if (!editingChapters) {
        return;
      }
      setEditingChapters(
        editingChapters.map((c: any) =>
          c.id === chapterId ? {...c, ...updates} : c,
        ),
      );
    },
    [editingChapters],
  );

  // --- In-flight help chapter list handlers ---
  const addInFlightChapter = () => {
    if (!editingInFlightChapters) {
      return;
    }
    const newChapter = emptyChapter(`if-${Date.now()}`, "New Help Chapter");
    (newChapter as any).cardComponent = stationCards[0]?.component || "";
    setEditingInFlightChapters([...editingInFlightChapters, newChapter]);
    setExpandedChapter(newChapter.id);
  };

  const removeInFlightChapter = (chapterId: string) => {
    if (!editingInFlightChapters) {
      return;
    }
    setEditingInFlightChapters(
      editingInFlightChapters.filter((c: any) => c.id !== chapterId),
    );
    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    }
  };

  const updateInFlightChapter = (chapterId: string, updates: any) => {
    if (!editingInFlightChapters) {
      return;
    }
    setEditingInFlightChapters(
      editingInFlightChapters.map((c: any) =>
        c.id === chapterId ? {...c, ...updates} : c,
      ),
    );
  };

  // Apply an updater to a chapter's subChapters within whichever collection the
  // chapter lives in. Centralizes the login/completion/inflight/regular routing
  // shared by the add/remove/update sub-chapter handlers below.
  const mutateSubChapters = (
    chapterId: string,
    isSpecial: SpecialKind | undefined,
    updateSubs: (subs: any[]) => any[],
  ) => {
    if (isSpecial === "login") {
      setEditingLoginChapter((prev: any) => ({
        ...prev,
        subChapters: updateSubs(prev?.subChapters || []),
      }));
      return;
    }
    if (isSpecial === "completion") {
      setEditingCompletionChapter((prev: any) => ({
        ...prev,
        subChapters: updateSubs(prev?.subChapters || []),
      }));
      return;
    }
    if (isSpecial === "inflight") {
      setEditingInFlightChapters(prev =>
        prev
          ? prev.map((c: any) =>
              c.id === chapterId
                ? {...c, subChapters: updateSubs(c.subChapters || [])}
                : c,
            )
          : prev,
      );
      return;
    }
    setEditingChapters(prev =>
      prev
        ? prev.map((c: any) =>
            c.id === chapterId
              ? {...c, subChapters: updateSubs(c.subChapters || [])}
              : c,
          )
        : prev,
    );
  };

  const addSubChapter = (chapterId: string, isSpecial?: SpecialKind) => {
    const newSub = {
      id: `sc-${Date.now()}`,
      name: "New Sub-Chapter",
      requiredActions: [],
    };
    mutateSubChapters(chapterId, isSpecial, subs => [...subs, newSub]);
  };

  const removeSubChapter = (
    chapterId: string,
    subChapterId: string,
    isSpecial?: SpecialKind,
  ) => {
    mutateSubChapters(chapterId, isSpecial, subs =>
      subs.filter((s: any) => s.id !== subChapterId),
    );
  };

  const updateSubChapter = (
    chapterId: string,
    subChapterId: string,
    updates: any,
    isSpecial?: SpecialKind,
  ) => {
    mutateSubChapters(chapterId, isSpecial, subs =>
      subs.map((s: any) => (s.id === subChapterId ? {...s, ...updates} : s)),
    );
  };

  // --- Record mode helpers ---
  const startRecording = (chapterId: string, subChapterId: string) => {
    setRecordingSubChapter(`${chapterId}:${subChapterId}`);
  };

  const cancelRecording = () => {
    setRecordingSubChapter(null);
  };

  const saveRecording = (actions: any[]) => {
    if (!recordingSubChapter) {
      return;
    }
    const [chapterId, subChapterId] = recordingSubChapter.split(":");
    const isInFlight = editingInFlightChapters?.some(
      (c: any) => c.id === chapterId,
    );
    updateSubChapter(
      chapterId,
      subChapterId,
      {requiredActions: actions},
      isInFlight ? "inflight" : undefined,
    );
    setRecordingSubChapter(null);
  };

  const recordingChapterId = recordingSubChapter?.split(":")[0];
  const recordingSubChapterId = recordingSubChapter?.split(":")[1];
  const recordingChapter =
    editingChapters?.find((c: any) => c.id === recordingChapterId) ||
    editingInFlightChapters?.find((c: any) => c.id === recordingChapterId);
  const recordingSubChapterData = recordingChapter?.subChapters?.find(
    (s: any) => s.id === recordingSubChapterId,
  );

  return {
    // State
    isEditing,
    displayChapters,
    editingInFlightChapters,
    editingSequential,
    setEditingSequential,
    editingStripPosition,
    setEditingStripPosition,
    editingLogin,
    setEditingLoginChapter,
    editingCompletion,
    setEditingCompletionChapter,
    expandedChapter,
    toggleExpand,
    setExpandedChapter,
    mediaPickerChapter,
    setMediaPickerChapter,
    // Lifecycle
    startEditing,
    cancelEditing,
    saveEditing,
    // Chapter handlers
    addChapter,
    removeChapter,
    updateChapter,
    addInFlightChapter,
    removeInFlightChapter,
    updateInFlightChapter,
    addSubChapter,
    removeSubChapter,
    updateSubChapter,
    // Recording
    recordingSubChapter,
    recordingChapter,
    recordingSubChapterData,
    startRecording,
    cancelRecording,
    saveRecording,
  };
}
