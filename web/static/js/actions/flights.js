import socket from '../socket';


/*
 * action types
 */

 export const ADD_FLIGHT = "ADD_FLIGHT";
 export const REMOVE_FLIGHT = "REMOVE_FLIGHT";
 export const UPDATE_FLIGHT = "UPDATE_FLIGHT";

 export const FETCH_FLIGHTS_REQUEST = "FETCH_FLIGHTS_REQUEST";
 export const FETCH_FLIGHTS_SUCCESS = "FETCH_FLIGHTS_SUCCESS";
 export const FETCH_FLIGHTS_FAILURE = "FETCH_FLIGHTS_FAILURE";

/*
 * action creators
 */

 function fetchFlightsRequest() {
  return { type: FETCH_FLIGHTS_REQUEST };
}

function fetchFlightsSuccess(flight) {
  return { type: FETCH_FLIGHTS_SUCCESS, flight };
}

function fetchFlightsFailure(error) {
  return { type: FETCH_FLIGHTS_FAILURE, error };
}

function removeFlight(flight) {
	return { type: REMOVE_FLIGHT, flight };
}

function updateFlight(flight) {
	return { type: UPDATE_FLIGHT, flight };
}

export function fetchFlights(filter){
	return dispatch => {
    dispatch(fetchFlightsRequest());
    let channel;
    if (filter){
      channel = socket.channel(`flights`,filter);
    } else {
      channel = socket.channel(`flights`);
    }
    channel.join()
    .receive('ok', flight => {
      console.log('catching up', flight);
      dispatch(fetchFlightsSuccess(flight));
    })
    .receive('error', reason => {
      console.log('failed join', reason);
      dispatch(fetchFlightsFailure(reason));
    });
    channel.on('init:flights', flight => {
      console.log('init:flights', flight);
      dispatch(fetchFlightsSuccess(flight));
    });
    channel.on('new:flights', flight => {
      console.log('new:flights', flight);
      dispatch(fetchFlightsSuccess(flight));
    });
    channel.on('remove:flights', flight => {
      console.log('remvoe:flight', flight);
      dispatch(removeFlight(flight));
    });
    channel.on('update:flights', changes => {
      console.log('update:flight', changes);
      dispatch(updateFlight(changes));
    });
  };
}
