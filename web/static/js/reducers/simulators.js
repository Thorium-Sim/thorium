import actions from '../actions';
const {simulators} = actions;
const { REMOVE_SIMULATOR, UPDATE_SIMULATOR, FETCH_SIMULATORS_REQUEST, FETCH_SIMULATORS_SUCCESS, FETCH_SIMULATORS_ERROR } = simulators;

function simulatorsReducer(state = [], action){
	switch (action.type){
		case REMOVE_SIMULATOR:
		return state.filter((simulator) => {
			if (simulator.id !== action.simulator.id){
				return true;
			}
			return false;
		});
		case UPDATE_SIMULATOR:
		return state.map((simulator) => {
			if (simulator.id === action.simulator.old_val.id){
				return action.simulator.new_val;
			}
			return simulator;
		});
		case FETCH_SIMULATORS_SUCCESS:
		if(action.simulator.id){
			//Make sure we don't have any duplicate simulators
			let filterRes = state.filter((simulator) => {
				if (simulator.id === action.simulator.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				return state.concat(action.simulator);
			}
		}
		return state;
		default:
		return state;
	}
}

export default simulatorsReducer;
