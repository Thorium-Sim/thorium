import actions from '../actions';
const {missions} = actions;
const { REMOVE_MISSION, UPDATE_MISSION, FETCH_MISSIONS_REQUEST, FETCH_MISSIONS_SUCCESS, FETCH_MISSIONS_ERROR } = missions;

function missionsReducer(state = [], action){
	switch (action.type){
		case REMOVE_MISSION:
		return state.filter((mission) => {
			if (mission.id !== action.missions.id){
				return true;
			}
			return false;
		});
		case UPDATE_MISSION:
		return state.map((mission) => {
			if (mission.id === action.missions.old_val.id){
				return action.missions.new_val;
			}
			return mission;
		});
		case FETCH_MISSIONS_SUCCESS:
		if(action.missions.id){
			//Make sure we don't have any duplicate missions
			let filterRes = state.filter((mission) => {
				if (mission.id === action.missions.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				return state.concat(action.missions);
			}
		}
		return state;
		default:
		return state;
	}
}

export default missionsReducer;
