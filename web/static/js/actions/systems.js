import socket from '../socket';

 export const FETCH_SYSTEMS_REQUEST = "FETCH_SYSTEMS_REQUEST";
 export const FETCH_SYSTEMS_SUCCESS = "FETCH_SYSTEMS_SUCCESS";
 export const FETCH_SYSTEMS_FAILURE = "FETCH_SYSTEMS_FAILURE";

 export const UPDATE_SYSTEMS = "UPDATE_SYSTEMS";
 export const REMOVE_SYSTEMS = "REMOVE_SYSTEMS";

/*
 * action creators
 */

 function fetchSystemsRequest() {
  return { type: FETCH_SYSTEMS_REQUEST };
}

function fetchSystemsSuccess(systems) {
  return { type: FETCH_SYSTEMS_SUCCESS, systems };
}

function fetchSystemsFailure(error) {
  return { type: FETCH_SYSTEMS_FAILURE, error };
}

function removeSystem(systems) {
	return { type: REMOVE_SYSTEMS, systems };
}

function updateSystem(systems) {
	return { type: UPDATE_SYSTEMS, systems };
}

export function fetchSystems(filter){
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
    dispatch(fetchSystemsRequest());
    let channel;
    if (filterString.length > 0){
      channel = socket.channel(`generic:systems:${filterString}`);
    } else {
      channel = socket.channel(`generic:systems`);
    }
    channel.join()
    .receive('ok', systems => {
      console.log('catching up', systems);
      dispatch(fetchSystemsSuccess(systems));
    })
    .receive('error', reason => {
      console.log('failed join', reason);
      dispatch(fetchSystemsFailure(reason));
    });

    channel.on('new:systems', systems => {
      console.log('new:systems', systems);
      dispatch(fetchSystemsSuccess(systems));
    });
    channel.on('remove:systems', systems => {
      console.log('remvoe:systems', systems);
      dispatch(removeSystem(systems));
    });
    channel.on('update:systems', changes => {
      console.log('update:systems', changes);
      dispatch(updateSystem(changes));
    });
  };
}
