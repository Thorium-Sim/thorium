import actions from '../actions';
const {presence} = actions;
const { PRESENCE_STATE, PRESENCE_DIFF } = presence;

function presenceReducer(state = [], action){
	let newState = state.concat();
	switch (action.type){
		case PRESENCE_STATE:
		let key;
		for (key in action.state) {
			if( action.state.hasOwnProperty( key ) ) {
				let stateObj = action.state[key];
				stateObj.clientId = key;
				newState.push(stateObj);
			}
		}
		return state;
		case PRESENCE_DIFF:
		let joins = [];
		let leaves = action.diff.leaves;
		let tf;
		//Start by getting these bad boys in array form.
		console.log("State",state);
		for (key in action.diff.joins) {
			if (action.diff.joins.hasOwnProperty(key)){
				let stateObj = action.diff.joins[key];
				stateObj.clientId = key;
				console.log('stateObj',stateObj);
				tf = true;
				newState.forEach((client) => {
					if (key === client.clientId){
						//Combine the metas.
						joins.push(client.metas.concat(stateObj.metas));
						tf = false;
					}
				});
				if (tf){
					joins.push(stateObj);
				}
			}
		}
		console.log("newState ater joins",joins);
		//Now remove the leaves from the joins/newState
		newState = joins.map((client) => {
			if (leaves[client.clientId]){
				let newClient = client;
				let leave = leaves[client.clientId];
				newClient.metas = newClient.metas.filter((meta) => {
					myMeta = leave.metas.filter((leaveMeta) => {
						console.log(JSON.stringify(meta) === JSON.stringify(leaveMeta),JSON.stringify(meta),JSON.stringify(leaveMeta))
						if (JSON.stringify(meta) === JSON.stringify(leaveMeta)){
							//This means that the metas are the same, which means
							//meta needs to be removed.
							return true;
						}
						return false;
					});
					if (myMeta.length > 0){
						return false;
					}
					return true;
				});
			}
			if (client.metas.length === 0){
				return null;
			}
			return client;
		}).filter((client) => {
			return client;
		});
		console.log("newState after leaves",newState);
		return newState;
		default:
		return state;
	}
}

export default presenceReducer;
