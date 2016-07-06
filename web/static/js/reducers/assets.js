import actions from '../actions';
const {assets} = actions;
const { ADD_ASSET_FOLDER, REMOVE_ASSET_FOLDER, UPDATE_ASSET_FOLDER, ADD_ASSET_CONTAINER, REMOVE_ASSET_CONTAINER, UPDATE_ASSET_CONTAINER, ADD_ASSET_OBJECT, REMOVE_ASSET_OBJECT, UPDATE_ASSET_OBJECT  } = assets;

function cardsReducer(state = [], action){
	switch (action.type){
		case ADD_ASSET_FOLDER:
		if (action.___.id){
			let newState = Object.assign({}, state);
			let filterRes = newState.___.filter((___) => {
				if (___.id === action.___.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				newState.___ = newState.___.push(action.___);
			}
		}
		return newState;
		case REMOVE_ASSET_FOLDER:
		let newState = Object.assign({}, state);
		newState.___ = newState.___.filter((___) => {
			if (___.id !== action.___.id){
				return true;
			}
			return false;
		});
		return newState;
		case UPDATE_ASSET_FOLDER:
		let newState = Object.assign({}, state);
		newState.___ = newState.___.map((___) => {
			if (___.id === action.___.old_val.id){
				return action.___.new_val;
			}
			return ___;
		});
		return newState;


		case ADD_ASSET_CONTAINER:
		if (action.___.id){
			let newState = Object.assign({}, state);
			let filterRes = newState.___.filter((___) => {
				if (___.id === action.___.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				newState.___ = newState.___.push(action.___);
			}
		}
		return newState;
		case REMOVE_ASSET_CONTAINER:
		let newState = Object.assign({}, state);
		newState.___ = newState.___.filter((___) => {
			if (___.id !== action.___.id){
				return true;
			}
			return false;
		});
		return newState;
		case UPDATE_ASSET_CONTAINER:
		let newState = Object.assign({}, state);
		newState.___ = newState.___.map((___) => {
			if (___.id === action.___.old_val.id){
				return action.___.new_val;
			}
			return ___;
		});
		return newState;


		case ADD_ASSET_OBJECT:
		if (action.___.id){
			let newState = Object.assign({}, state);
			let filterRes = newState.___.filter((___) => {
				if (___.id === action.___.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				newState.___ = newState.___.push(action.___);
			}
		}
		return newState;
		case REMOVE_ASSET_OBJECT:
		let newState = Object.assign({}, state);
		newState.___ = newState.___.filter((___) => {
			if (___.id !== action.___.id){
				return true;
			}
			return false;
		});
		return newState;
		case UPDATE_ASSET_OBJECT:
		let newState = Object.assign({}, state);
		newState.___ = newState.___.map((___) => {
			if (___.id === action.___.old_val.id){
				return action.___.new_val;
			}
			return ___;
		});
		return newState;
	}
}

export default cardsReducer;
