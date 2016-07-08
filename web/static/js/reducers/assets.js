import actions from '../actions';
const {assets} = actions;
const { ADD_ASSET_FOLDER, REMOVE_ASSET_FOLDER, UPDATE_ASSET_FOLDER, ADD_ASSET_CONTAINER, REMOVE_ASSET_CONTAINER, UPDATE_ASSET_CONTAINER, ADD_ASSET_OBJECT, REMOVE_ASSET_OBJECT, UPDATE_ASSET_OBJECT  } = assets;

function assetsReducer(state = {folders:[], containers:[], objects:[]}, action){
	let newState = Object.assign({}, state);
	switch (action.type){
		case ADD_ASSET_FOLDER:
		if (action.folder.id){
			let filterRes = newState.folders.filter((folder) => {
				if (folder.id === action.folder.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				newState.folders = newState.folders.concat(action.folder);
			}
			return newState;
		}
		return newState;
		case REMOVE_ASSET_FOLDER:

		newState.folders = newState.folders.filter((folder) => {
			if (folder.id !== action.folder.id){
				return true;
			}
			return false;
		});
		return newState;
		case UPDATE_ASSET_FOLDER:

		newState.folders = newState.folders.map((folder) => {
			if  (folder.id === action.folder.old_val.id){
				return action.folder.new_val;
			}
			return folder;
		});
		return newState;

		case ADD_ASSET_CONTAINER:
		if (action.container.id){
			let filterRes = newState.containers.filter((container) => {
				if (container.id === action.container.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				newState.containers = newState.containers.concat(action.container);
			}
			return newState;
		}
		return newState;
		case REMOVE_ASSET_CONTAINER:

		newState.containers = newState.containers.filter((container) => {
			if (container.id !== action.container.id){
				return true;
			}
			return false;
		});
		return newState;
		case UPDATE_ASSET_CONTAINER:

		newState.containers = newState.containers.map((container) => {
			if (container.id === action.container.old_val.id){
				return action.container.new_val;
			}
			return container;
		});
		return newState;


		case ADD_ASSET_OBJECT:
		if (action.object.id){
			let filterRes = newState.objects.filter((object) => {
				if (object.id === action.object.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				newState.objects = newState.objects.concat(action.object);
			}
			return newState;
		}
		return newState;
		case REMOVE_ASSET_OBJECT:

		newState.objects = newState.objects.filter((object) => {
			if (object.id !== action.object.id){
				return true;
			}
			return false;
		});
		return newState;
		case UPDATE_ASSET_OBJECT:

		newState.objects = newState.objects.map((object) => {
			if (object.id === action.object.old_val.id){
				return action.object.new_val;
			}
			return object;
		});
		return newState;
		default:
		return state;
	}
}

export default assetsReducer;
