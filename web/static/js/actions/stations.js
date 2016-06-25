import socket from '../socket';


/*
 * action types
 */

 export const ADD_STATION = "ADD_STATION";
 export const REMOVE_STATION = "REMOVE_STATION";
 export const UPDATE_STATION = "UPDATE_STATION";

 export const FETCH_STATIONS_REQUEST = "FETCH_STATIONS_REQUEST";
 export const FETCH_STATIONS_SUCCESS = "FETCH_STATIONS_SUCCESS";
 export const FETCH_STATIONS_FAILURE = "FETCH_STATIONS_FAILURE";

/*
 * action creators
 */

 function fetchStationsRequest() {
  return { type: FETCH_STATIONS_REQUEST };
}

function fetchStationsSuccess(station) {
  return { type: FETCH_STATIONS_SUCCESS, station };
}

function fetchStationsFailure(error) {
  return { type: FETCH_STATIONS_FAILURE, error };
}

function removeStation(station) {
	return { type: REMOVE_STATION, station };
}

function updateStation(station) {
	return { type: UPDATE_STATION, station };
}

export function fetchStations(filter){
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
    dispatch(fetchStationsRequest());
    let channel;
    if (filterString.length > 0){
      channel = socket.channel(`generic:stations:${filterString}`);
    } else {
      channel = socket.channel(`generic:stations`);
    }
    channel.join()
    .receive('ok', station => {
      console.log('catching up', station);
      dispatch(fetchStationsSuccess(station));
    })
    .receive('error', reason => {
      console.log('failed join', reason);
      dispatch(fetchStationsFailure(reason));
    });

    channel.on('new:stations', station => {
      console.log('new:station', station);
      dispatch(fetchStationsSuccess(station));
    });
    channel.on('remove:stations', station => {
      console.log('remvoe:station', station);
      dispatch(removeStation(station));
    });
    channel.on('update:stations', changes => {
      console.log('update:station', changes);
      dispatch(updateStation(changes));
    });
  };
}
