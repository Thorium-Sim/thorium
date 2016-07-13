import actions from '../actions';
const {presence} = actions;
const { PRESENCE_STATE, PRESENCE_DIFF } = presence;

function presenceReducer(state = [], action){
	let newState = state.concat();
	switch (action.type){
		case PRESENCE_STATE:
		let actionState = action.state;
		newState = Object.keys(actionState);
		//I'm not going to worry about multiple connections.		
		return newState;
		case PRESENCE_DIFF:
		//Handle joins.
		let joinsKeys = Object.keys(action.diff.joins);
		joinsKeys.forEach((e) => {
			if (newState.indexOf(e) < 0){
				newState.push(e);
			}
		});
		//Handle leaves.
		let leavesKeys = Object.keys(action.diff.leaves);
		newState = newState.filter((e) => {
			if (leavesKeys.indexOf(e) >= 0){
				return false;
			}
			return true;
		});
		return newState;
		default:
		return state;
	}
}

export default presenceReducer;
