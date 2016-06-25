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

export function fetchSimulators(filter){
	return dispatch => {
    let filterString = "";
    //Set up my channelName with the filter params
    for (let key in filter) {
      if (filter.hasOwnProperty(key)){
        filterString += `${key}?${filter[key]};`;
      }
    }
    //Remove the trailing ;
    filterString = filterString.substr(0,filterString.length - 1)
    dispatch(fetchSimulatorsRequest());
    let channel;
    if (filterString.length > 0){
      channel = socket.channel(`generic:simulators:${filterString}`);
    } else {
      channel = socket.channel(`generic:simulators`);
    }
    channel.join()
    .receive('ok', simulator => {
      console.log('catching up', simulator);
      dispatch(fetchSimulatorsSuccess(simulator));
    })
    .receive('error', reason => {
      console.log('failed join', reason);
      dispatch(fetchSimulatorsFailure(reason));
    });
    channel.push("subscribe:simulators", {id: "voyager"});
    channel.on('new:simulators', simulator => {
      console.log('new:simulators', simulator);
      dispatch(fetchSimulatorsSuccess(simulator));
    });
    channel.on('remove:simulators', simulator => {
      console.log('remvoe:simulator', simulator);
      dispatch(removeSimulator(simulator));
    });
    channel.on('update:simulators', changes => {
      console.log('update:simulator', changes);
      dispatch(updateSimulator(changes));
    });
  };
}
