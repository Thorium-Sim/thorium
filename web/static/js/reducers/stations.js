import actions from '../actions';
const {stations} = actions;
const { REMOVE_STATION, UPDATE_STATION, FETCH_STATIONS_REQUEST, FETCH_STATIONS_SUCCESS, FETCH_STATIONS_ERROR } = stations;

function stationsReducer(state = [], action){
	switch (action.type){
		case REMOVE_STATION:
		return state.filter((station) => {
			if (station.id !== action.station.id){
				return true;
			}
			return false;
		});
		case UPDATE_STATION:
		return state.map((station) => {
			if (station.id === action.station.old_val.id){
				return action.station.new_val;
			}
			return station;
		});
		case FETCH_STATIONS_SUCCESS:
		if(action.station.id){
			//Make sure we don't have any duplicate stations
			let filterRes = state.filter((station) => {
				if (station.id === action.station.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				return state.concat(action.station);
			}
		}
		return state;
		default:
		return state;
	}
}

export default stationsReducer;
