import actions from '../actions';
const {simulators} = actions;
const { ADD_SIMULATOR, REMOVE_SIMULATOR, RENAME_SIMULATOR, FETCH_SIMULATORS_REQUEST, FETCH_SIMULATORS_SUCCESS, FETCH_SIMULATORS_ERROR } = simulators;

function simulatorsReducer(state = [], action){
	switch (action.type){
		case ADD_SIMULATOR:
		debugger;
		return [].concat(action.simulators);
		case REMOVE_SIMULATOR:
		return;
		case RENAME_SIMULATOR:
		return;
		case FETCH_SIMULATORS_SUCCESS:
		if(action.simulator.id){
			return state.concat(action.simulator);
		}
		return state;
		default:
		return state;
	}
}

export default simulatorsReducer;