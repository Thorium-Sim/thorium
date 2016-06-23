import socket from '../socket';


/*
 * action types
 */

export const ADD_SIMULATOR = "ADD_SIMULATOR";
export const REMOVE_SIMULATOR = "REMOVE_SIMULATOR";
export const RENAME_SIMULATOR = "RENAME_SIMULATOR";

export const FETCH_SIMULATORS_REQUEST = "FETCH_SIMULATORS_REQUEST";
export const FETCH_SIMULATORS_SUCCESS = "FETCH_SIMULATORS_SUCCESS";
export const FETCH_SIMULATORS_FAILURE = "FETCH_SIMULATORS_FAILURE";

/*
 * action creators
 */

function fetchSimulatorsRequest() {
  return { type: FETCH_SIMULATORS_REQUEST };
}

function fetchSimulatorsSuccess(simulator) {
  return { type: FETCH_SIMULATORS_SUCCESS, simulator };
}

function fetchSimulatorsFailure(error) {
  return { type: FETCH_SIMULATORS_FAILURE, error };
}


export function addSimulator(simulator) {
 	return { type: ADD_SIMULATOR, simulator };
}

export function removeSimulator(simulator) {
	return { type: REMOVE_SIMULATOR, simulator };
}

export function renameSimulator(simulator) {
	return { type: RENAME_SIMULATOR, simulator };
}

export function fetchSimulators(){
	return dispatch => {
    dispatch(fetchSimulatorsRequest());
    let channel = socket.channel("simulators:all", {});
    channel.join()
      .receive('ok', simulator => {
        console.log('catching up', simulator);
        dispatch(fetchSimulatorsSuccess(simulator));
      })
      .receive('error', reason => {
        console.log('failed join', reason);
        dispatch(fetchSimulatorsFailure(reason));
      });

    channel.on('new:simulator', simulator => {
      console.log('new:simulator', simulator);
      dispatch(fetchSimulatorsSuccess(simulator));
    });
  };
}
