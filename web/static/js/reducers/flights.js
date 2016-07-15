import actions from '../actions';
const {flights} = actions;
const { REMOVE_FLIGHT, UPDATE_FLIGHT, FETCH_FLIGHTS_REQUEST, FETCH_FLIGHTS_SUCCESS, FETCH_FLIGHTS_ERROR } = flights;

function flightsReducer(state = [], action){
	let keys = [];
	if (action.flight){
		keys = Object.keys(action.flight);
	}
	switch (action.type){
		case REMOVE_FLIGHT:
		return state.filter((flight) => {
			if (flight.id !== action.flight.id){
				return true;
			}
			return false;
		});
		case UPDATE_FLIGHT:
		return state.map((flight) => {
			if (flight.id === action.flight.old_val.id){
				return action.flight.new_val;
			}
			return flight;
		});
		case FETCH_FLIGHTS_SUCCESS:
		keys.forEach((flightId) => {
			if(flightId){
				//Make sure we don't have any duplicate flights
				let filterRes = state.filter((flight) => {
					if (flight.id === flightId){
						return true;
					}
					return false;
				});
				if (filterRes.length === 0){
					return state.push(action.flight[flightId]);
				}
			}
		});
		return state;
		default:
		return state;
	}
}

export default flightsReducer;
