import socket from '../socket';


/*
 * action types
 */

export const ADD_SIMULATOR = "ADD_SIMULATOR";
export const REMOVE_SIMULATOR = "REMOVE_SIMULATOR";
export const UPDATE_SIMULATOR = "UPDATE_SIMULATOR";

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

function removeSimulator(simulator) {
	return { type: REMOVE_SIMULATOR, simulator };
}

function updateSimulator(simulator) {
	return { type: UPDATE_SIMULATOR, simulator };
}

export function fetchSimulators(id){
	return dispatch => {
    dispatch(fetchSimulatorsRequest());
    let channelName = "simulators:all";
    if (id){
    	channelName = `simulators:id:${id}`;
    }
    let channel = socket.channel(channelName, {});
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
    channel.on('remove:simulator', simulator => {
      console.log('remvoe:simulator', simulator);
      dispatch(removeSimulator(simulator));
    });
    channel.on('update:simulator', changes => {
      console.log('update:simulator', changes);
      dispatch(updateSimulator(changes));
    });
  };
}
