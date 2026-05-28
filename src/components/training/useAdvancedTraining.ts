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
} from "./queries";

interface AdvancedTrainingConfig {
  enabled: boolean;
  sequentialChapters?: boolean;
  stripPosition?: string;
  chapters: any[];
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

  // Record an action (mutation or click) to the server
  const recordAction = useCallback(
    (eventName: string, args?: any) => {
      if (!isActive.current) return;
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
    if (!isInAdvancedTraining || !advancedTrainingConfig?.enabled) return;

    // Ignore training system mutations to prevent infinite loops:
    // recordAction sends clientAdvancedTrainingAction, which would fire
    // another mutation-event, triggering recordAction again.
    const ignoredMutations = new Set([
      "clockSync",
      "clientAdvancedTrainingAction",
      "clientStartAdvancedTraining",
      "clientStopAdvancedTraining",
      "advancedTrainingSetActiveChapter",
      "advancedTrainingToggleMediaViewer",
      "advancedTrainingToggleChapterList",
      "fdCompleteTrainingSubChapter",
      "fdResetTrainingProgress",
      "clientSetTraining",
      "clientSetCard",
    ]);

    const unsubscribe = subscribe(
      "mutation-event",
      ({event, args}: {event: string; args: any}) => {
        if (ignoredMutations.has(event)) return;
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
  };
}
