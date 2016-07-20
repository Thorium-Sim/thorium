import {Socket} from 'phoenix';
import guid from '../helpers/guid';

//Set a clientId for the client
let clientId = localStorage.getItem('thorium_clientId');
if (!clientId) {
  clientId = guid();
  localStorage.setItem('thorium_clientId',clientId);
}

let socket = new Socket('/socket',  {params: {client_id: clientId}});
socket.connect();
let presence = socket.channel("session",{client_id: clientId});
presence.join();

/*
 * action types
 */

 export const PRESENCE_STATE = "PRESENCE_STATE";
 export const PRESENCE_DIFF = "PRESENCE_DIFF";

/*
 * action creators
 */

 function presenceState(state) {
  return { type: PRESENCE_STATE, state };
}

function presenceDiff(diff) {
  return { type: PRESENCE_DIFF, diff };
}

export function updatePresence(client){
  presence.push("updateClient",client);
}

export function fetchPresence(){
  return dispatch => {
    presence.on("presence_state", state => {
      dispatch(presenceState(state));
    });
    presence.on("presence_diff", diff => {
      dispatch(presenceDiff(diff));
    });
  };
}
