import {ROOM_SEARCH_QUERY} from "components/views/RoomSearch";
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
