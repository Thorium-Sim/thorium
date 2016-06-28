import actions from '../actions';
const {systems} = actions;
const { REMOVE_SYSTEMS, UPDATE_SYSTEMS, FETCH_SYSTEMS_REQUEST, FETCH_SYSTEMS_SUCCESS, FETCH_SYSTEMS_ERROR } = systems;

function systemsReducer(state = [], action){
	switch (action.type){
		case REMOVE_SYSTEMS:
		return state.filter((system) => {
			if (system.id !== action.systems.id){
				return true;
			}
			return false;
		});
		case UPDATE_SYSTEMS:
		return state.map((system) => {
			if (system.id === action.systems.old_val.id){
				return action.systems.new_val;
			}
			return system;
		});
		case FETCH_SYSTEMS_SUCCESS:
		if(action.systems.id){
			//Make sure we don't have any duplicate systems
			let filterRes = state.filter((system) => {
				if (system.id === action.systems.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				return state.concat(action.systems);
			}
		}
		return state;
		default:
		return state;
	}
}

export default systemsReducer;
