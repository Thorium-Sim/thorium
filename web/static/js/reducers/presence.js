import actions from '../actions';
const {presence} = actions;
const { PRESENCE_STATE, PRESENCE_DIFF } = presence;

function presenceReducer(state = {}, action){
	let newState = Object.assign({}, state);
	switch (action.type){
		case PRESENCE_STATE:
		let actionState = action.state;
		//I'm not going to worry about multiple connections.
		return actionState;
		case PRESENCE_DIFF:
		//Handle joins.
		let joinsKeys = Object.keys(action.diff.joins);
		joinsKeys.forEach((e) => {
			if (newState[e] < 0){
				newState[e] = action.diff.joins[e];
			}
		});
		//Handle leaves.
		let leavesKeys = Object.keys(action.diff.leaves);
		leavesKeys.forEach((e) => {
			delete newState[e];
		});
		return newState;
		default:
		return state;
	}
}

export default presenceReducer;
