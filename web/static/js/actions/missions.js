import socket from '../socket';

 export const FETCH_MISSIONS_REQUEST = "FETCH_MISSIONS_REQUEST";
 export const FETCH_MISSIONS_SUCCESS = "FETCH_MISSIONS_SUCCESS";
 export const FETCH_MISSIONS_FAILURE = "FETCH_MISSIONS_FAILURE";

 export const UPDATE_MISSIONS = "UPDATE_MISSIONS";
 export const REMOVE_MISSIONS = "REMOVE_MISSIONS";

/*
 * action creators
 */

 function fetchMissionsRequest() {
  return { type: FETCH_MISSIONS_REQUEST };
}

function fetchMissionsSuccess(missions) {
  return { type: FETCH_MISSIONS_SUCCESS, missions };
}

function fetchMissionsFailure(error) {
  return { type: FETCH_MISSIONS_FAILURE, error };
}

function removeMission(missions) {
	return { type: REMOVE_MISSIONS, missions };
}

function updateMission(missions) {
	return { type: UPDATE_MISSIONS, missions };
}

export function fetchMissions(filter){
	return dispatch => {
    let filterString = "";
    //Set up my channelName with the filter params
    for (let key in filter) {
      if (filter.hasOwnProperty(key)){
        filterString += `${key}?${filter[key]};`;
      }
    }
    //Remove the trailing ;
    filterString = filterString.substr(0,filterString.length - 1);
    dispatch(fetchMissionsRequest());
    let channel;
    if (filterString.length > 0){
      channel = socket.channel(`generic:missions:${filterString}`);
    } else {
      channel = socket.channel(`generic:missions`);
    }
    channel.join()
    .receive('ok', missions => {
      console.log('catching up', missions);
      dispatch(fetchMissionsSuccess(missions));
    })
    .receive('error', reason => {
      console.log('failed join', reason);
      dispatch(fetchMissionsFailure(reason));
    });

    channel.on('new:missions', missions => {
      console.log('new:missions', missions);
      dispatch(fetchMissionsSuccess(missions));
    });
    channel.on('remove:missions', missions => {
      console.log('remvoe:missions', missions);
      dispatch(removeMission(missions));
    });
    channel.on('update:missions', changes => {
      console.log('update:missions', changes);
      dispatch(updateMission(changes));
    });
  };
}
