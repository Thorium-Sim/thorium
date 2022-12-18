import {ROOM_SEARCH_QUERY} from "@client/cards/RoomSearch";
import decks from "../data/decks";
export default [
  {
    request: {
      query: ROOM_SEARCH_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        decks,
      },
    },
  },
];
