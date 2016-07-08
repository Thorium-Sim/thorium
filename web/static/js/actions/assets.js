import socket from '../socket';


/*
 * action types
 */

export const ADD_ASSET_FOLDER = "ADD_ASSET_FOLDER";
export const REMOVE_ASSET_FOLDER = "REMOVE_ASSET_FOLDER";
export const UPDATE_ASSET_FOLDER = "UPDATE_ASSET_FOLDER";
export const FLUSH_ASSET_FOLDER = "FLUSH_ASSET_FOLDER";

export const ADD_ASSET_CONTAINER = "ADD_ASSET_CONTAINER";
export const REMOVE_ASSET_CONTAINER = "REMOVE_ASSET_CONTAINER";
export const UPDATE_ASSET_CONTAINER = "UPDATE_ASSET_CONTAINER";
export const FLUSH_ASSET_CONTAINER = "FLUSH_ASSET_CONTAINER";

export const ADD_ASSET_OBJECT = "ADD_ASSET_OBJECT";
export const REMOVE_ASSET_OBJECT = "REMOVE_ASSET_OBJECT";
export const UPDATE_ASSET_OBJECT = "UPDATE_ASSET_OBJECT";
export const FLUSH_ASSET_OBJECT = "FLUSH_ASSET_OBJECT";

/*
 * action creators
 */

function addAssetFolder(folder){
  return { type: ADD_ASSET_FOLDER, folder};
}
function removeAssetFolder(folder){
  return { type: REMOVE_ASSET_FOLDER, folder};
}
function updateAssetFolder(folder){
  return { type: UPDATE_ASSET_FOLDER, folder};
}

function addAssetContainer(container){
  return { type: ADD_ASSET_CONTAINER, container};
}
function removeAssetContainer(container){
  return { type: REMOVE_ASSET_CONTAINER, container};
}
function updateAssetContainer(container){
  return { type: UPDATE_ASSET_CONTAINER, container};
}

function addAssetObject(object){
  return { type: ADD_ASSET_OBJECT, object};
}
function removeAssetObject(object){
  return { type: REMOVE_ASSET_OBJECT, object};
}
function updateAssetObject(object){
  return { type: UPDATE_ASSET_OBJECT, object};
}

export function fetchFolders(filter){
  return dispatch => {
    let filterString = "";
    //Set up my channelName with the filter params
    for (let key in filter) {
      if (filter.hasOwnProperty(key)){
        filterString += `${key}?${filter[key]};`;
      }
    }
    //Remove the trailing ;
    filterString = filterString.substr(0,filterString.length - 1);
    let channel;
    if (filterString.length > 0){
      channel = socket.channel(`generic:assetfolders:${filterString}`);
    } else {
      channel = socket.channel(`generic:assetfolders`);
    }
    channel.join()
    .receive('ok', folder => {
      console.log('catching up', folder);
      dispatch(addAssetFolder(folder));
    })
    .receive('error', reason => {
      console.log('Failed Join', reason);
    });

    channel.on('new:assetfolders', folder => {
      dispatch(addAssetFolder(folder));
    });
    channel.on('remove:assetfolders', folder => {
      dispatch(removeAssetFolder(folder));
    });
    channel.on('update:assetfolders', folder => {
      dispatch(updateAssetFolder(folder));
    });
  };
}
export function fetchContainers(filter){
  return dispatch => {
    let filterString = "";
    //Set up my channelName with the filter params
    for (let key in filter) {
      if (filter.hasOwnProperty(key)){
        filterString += `${key}?${filter[key]};`;
      }
    }
    //Remove the trailing ;
    filterString = filterString.substr(0,filterString.length - 1);
    let channel;
    if (filterString.length > 0){
      channel = socket.channel(`generic:assetcontainers:${filterString}`);
    } else {
      channel = socket.channel(`generic:assetcontainers`);
    }
    channel.join()
    .receive('ok', container => {
      console.log('catching up', container);
      dispatch(addAssetContainer(container));
    })
    .receive('error', reason => {
      console.log('Failed Join', reason);
    });

    channel.on('new:assetcontainers', container => {
      dispatch(addAssetContainer(container));
    });
    channel.on('remove:assetcontainers', container => {
      dispatch(removeAssetContainer(container));
    });
    channel.on('update:assetcontainers', container => {
      dispatch(updateAssetContainer(container));
    });
  };
}
export function fetchObjects(filter){
  return dispatch => {
    let filterString = "";
    //Set up my channelName with the filter params
    for (let key in filter) {
      if (filter.hasOwnProperty(key)){
        filterString += `${key}?${filter[key]};`;
      }
    }
    //Remove the trailing ;
    filterString = filterString.substr(0,filterString.length - 1);
    let channel;
    if (filterString.length > 0){
      channel = socket.channel(`generic:assetobjects:${filterString}`);
    } else {
      channel = socket.channel(`generic:assetobjects`);
    }
    channel.join()
    .receive('ok', object => {
      console.log('catching up', object);
      dispatch(addAssetObject(object));
    })
    .receive('error', reason => {
      console.log('Failed Join', reason);
    });

    channel.on('new:assetobjects', object => {
      dispatch(addAssetObject(object));
    });
    channel.on('remove:assetobjects', object => {
      dispatch(removeAssetObject(object));
    });
    channel.on('update:assetobjects', object => {
      dispatch(updateAssetObject(object));
    });
  };
}