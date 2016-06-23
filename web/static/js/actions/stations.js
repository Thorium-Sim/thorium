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

export function fetchStations(id){
	return dispatch => {
    dispatch(fetchStationsRequest());
    let channelName = "stations:all";
    if (id){
      if (typeof id === "number" || typeof id === "string"){
        channelName = `stations:id:${id}`;
      } if (typeof id === "object"){
        channelName = `stations:simulatorId:${id.simulatorId}`;
      }
    }
    let channel = socket.channel(channelName, {});
    channel.join()
    .receive('ok', station => {
      console.log('catching up', station);
      dispatch(fetchStationsSuccess(station));
    })
    .receive('error', reason => {
      console.log('failed join', reason);
      dispatch(fetchStationsFailure(reason));
    });

    channel.on('new:station', station => {
      console.log('new:station', station);
      dispatch(fetchStationsSuccess(station));
    });
    channel.on('remove:station', station => {
      console.log('remvoe:station', station);
      dispatch(removeStation(station));
    });
    channel.on('update:station', changes => {
      console.log('update:station', changes);
      dispatch(updateStation(changes));
    });
  };
}
