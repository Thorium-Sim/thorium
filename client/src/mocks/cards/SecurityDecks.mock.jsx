import {
  DECK_QUERY,
  DECK_SUB,
  DECK_TASK_SUB,
} from "../../components/cards/SecurityDecks";
import {
  DECK_CORE_QUERY,
  DECK_CORE_SUB,
} from "../../components/cards/SecurityDecks/core";
import decks from "../data/decks";
import tasks from "../data/tasks";
export default [
  {
    request: {
      query: DECK_QUERY,
      variables: {simulatorId: "test", definitions: ["Send Security Team"]},
    },
    result: {
      data: {
        decks,
        tasks,
      },
    },
  },
  {
    request: {
      query: DECK_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        decksUpdate: decks,
      },
    },
  },
  {
    request: {
      query: DECK_TASK_SUB,
      variables: {simulatorId: "test", definitions: ["Send Security Team"]},
    },
    result: {
      data: {
        tasksUpdate: tasks,
      },
    },
  },
  {
    request: {
      query: DECK_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        decks,
      },
    },
  },
  {
    request: {
      query: DECK_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        decksUpdate: decks,
      },
    },
  },
];
