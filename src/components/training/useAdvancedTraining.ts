import {useEffect, useCallback, useRef} from "react";
import {useMutation, useSubscription, useQuery} from "react-apollo";
import {subscribe} from "helpers/pubsub";
import {
  ADVANCED_TRAINING_ACTION,
  ADVANCED_TRAINING_PROGRESS_SUB,
  ADVANCED_TRAINING_PROGRESS_QUERY,
  START_ADVANCED_TRAINING,
  STOP_ADVANCED_TRAINING,
  SET_ACTIVE_CHAPTER,
  TOGGLE_MEDIA_VIEWER,
  TOGGLE_CHAPTER_LIST,
  TOGGLE_TACTICAL_MAP_VIEWER,
} from "./queries";

interface AdvancedTrainingConfig {
  enabled: boolean;
  sequentialChapters?: boolean;
  stripPosition?: string;
  chapters: any[];
  inFlightChapters?: any[];
  loginChapter?: any;
  completionChapter?: any;
}

interface UseAdvancedTrainingParams {
  clientId: string;
  simulatorId: string;
  advancedTrainingConfig: AdvancedTrainingConfig | null;
}

export function useAdvancedTraining({
  clientId,
  simulatorId,
  advancedTrainingConfig,
}: UseAdvancedTrainingParams) {
  const isActive = useRef(false);

  // Mutations
  const [recordActionMutation] = useMutation(ADVANCED_TRAINING_ACTION);
  const [startTrainingMutation] = useMutation(START_ADVANCED_TRAINING);
  const [stopTrainingMutation] = useMutation(STOP_ADVANCED_TRAINING);
  const [setActiveChapterMutation] = useMutation(SET_ACTIVE_CHAPTER);
  const [toggleMediaMutation] = useMutation(TOGGLE_MEDIA_VIEWER);
  const [toggleChapterListMutation] = useMutation(TOGGLE_CHAPTER_LIST);
  const [toggleTacticalMapMutation] = useMutation(TOGGLE_TACTICAL_MAP_VIEWER);

  // Query for initial state
  const {data: queryData} = useQuery(ADVANCED_TRAINING_PROGRESS_QUERY, {
    variables: {clientId},
    fetchPolicy: "network-only",
  });

  // Subscription for real-time updates
  const {data: subData} = useSubscription(ADVANCED_TRAINING_PROGRESS_SUB, {
    variables: {simulatorId},
  });

  // Prefer subscription data only once it contains a non-empty list, so an
  // early empty subscription event doesn't wipe valid initial query data.
  const progressList =
    (subData?.advancedTrainingProgressUpdate?.length
      ? subData.advancedTrainingProgressUpdate
      : null) ??
    queryData?.advancedTrainingProgress ??
    [];
  const progress = progressList.find((p: any) => p.clientId === clientId);
  const isInAdvancedTraining = !!progress;

  isActive.current = isInAdvancedTraining;

  // Per-eventName timestamp of the last mutation-event recorded to the
  // server, used to throttle the recorder below (see the `mutation-event`
  // effect). Keyed by eventName rather than a single shared timer so a burst
  // on one mutation (e.g. dragging the Thrusters direction pad) doesn't
  // delay an unrelated one (e.g. a click) that happens to land in the same
  // window.
  const lastRecordedRef = useRef<Map<string, number>>(new Map());

  // Record an action (mutation or click) to the server
  const recordAction = useCallback(
    (eventName: string, args?: any) => {
      if (!isActive.current) {
        return;
      }
      recordActionMutation({
        variables: {
          clientId,
          eventName,
          args: args || null,
        },
      });
    },
    [clientId, recordActionMutation],
  );

  // Observe mutations from the Apollo client middleware pub/sub
  useEffect(() => {
    if (!isInAdvancedTraining || !advancedTrainingConfig?.enabled) {
      return;
    }

    // Ignore training system mutations to prevent infinite loops:
    // recordAction sends clientAdvancedTrainingAction, which would fire
    // another mutation-event, triggering recordAction again.
    const ignoredMutations = new Set([
      "clockSync",
      "clientAdvancedTrainingAction",
      "clientStartAdvancedTraining",
      "clientStopAdvancedTraining",
      "clientRequestTrainingHelp",
      "advancedTrainingSetActiveChapter",
      "advancedTrainingToggleMediaViewer",
      "advancedTrainingToggleChapterList",
      "advancedTrainingToggleTacticalMapViewer",
      "fdCompleteTrainingSubChapter",
      "fdResetTrainingProgress",
      "clientSetTraining",
      "clientSetCard",
    ]);

    // Some mutations fire far faster than a human "did the thing" signal
    // needs — the Thrusters card throttles directionUpdate/rotationUpdate to
    // just 15ms while dragging, which would otherwise mean ~66
    // clientAdvancedTrainingAction round-trips (and progress broadcasts) per
    // second for a single drag. Matching is by eventName alone and repeats
    // are no-ops server-side once a required action is already observed, so
    // throttling here loses nothing — it just stops resending what the
    // server would ignore anyway.
    const RECORD_THROTTLE_MS = 500;

    const unsubscribe = subscribe(
      "mutation-event",
      ({event, args}: {event: string; args: any}) => {
        if (ignoredMutations.has(event)) {
          return;
        }
        const now = Date.now();
        const last = lastRecordedRef.current.get(event) || 0;
        if (now - last < RECORD_THROTTLE_MS) {
          return;
        }
        lastRecordedRef.current.set(event, now);
        recordAction(event, args);
      },
    );

    return unsubscribe;
  }, [isInAdvancedTraining, advancedTrainingConfig?.enabled, recordAction]);

  // Actions
  const startTraining = useCallback(() => {
    startTrainingMutation({variables: {clientId}});
  }, [clientId, startTrainingMutation]);

  const stopTraining = useCallback(() => {
    stopTrainingMutation({variables: {clientId}});
  }, [clientId, stopTrainingMutation]);

  const setActiveChapter = useCallback(
    (chapterId: string) => {
      setActiveChapterMutation({variables: {clientId, chapterId}});
    },
    [clientId, setActiveChapterMutation],
  );

  const toggleMediaViewer = useCallback(
    (open: boolean) => {
      toggleMediaMutation({variables: {clientId, open}});
    },
    [clientId, toggleMediaMutation],
  );

  const toggleChapterList = useCallback(
    (open: boolean) => {
      toggleChapterListMutation({variables: {clientId, open}});
    },
    [clientId, toggleChapterListMutation],
  );

  const toggleTacticalMapViewer = useCallback(
    (open: boolean) => {
      toggleTacticalMapMutation({variables: {clientId, open}});
    },
    [clientId, toggleTacticalMapMutation],
  );

  return {
    progress,
    config: advancedTrainingConfig,
    isInAdvancedTraining,
    recordAction,
    startTraining,
    stopTraining,
    setActiveChapter,
    toggleMediaViewer,
    toggleChapterList,
    toggleTacticalMapViewer,
  };
}
