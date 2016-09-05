import actions from '../actions';
const {presence} = actions;
const { CLIENT_STATE } = presence;

function clientReducer(state = {}, action){
	switch (action.type){
		case CLIENT_STATE:
		return action.clients;
		default:
		return state;
	}
}

export default clientReducer;
