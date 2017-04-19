import App from '../../app.js';

export default function getAsset(assetKey, simulatorId) {
  let returnObj = App.assetObjects.find(obj => {
    return (obj.simulatorId === simulatorId && obj.fullPath === assetKey);
  });
  if (returnObj) {
    return returnObj.url;
  }
  returnObj = App.assetObjects.find(obj => {
    return (obj.simulatorId === 'default' && obj.fullPath === assetKey);
  });
  if (returnObj) {
    return returnObj.url;
  }
  return '';
};
