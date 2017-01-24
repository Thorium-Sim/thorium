const assetPath = 'http://apple.local:3001/assets';
const amazonPath = 'https://s3.amazonaws.com/thorium-assets';
export default (assetKey, simulatorId, extension, CORS) => {
  if (CORS){
    return `${assetPath}${assetKey}/${simulatorId}.${extension}`
  }
  return `${amazonPath}${assetKey}/${simulatorId}.${extension}`;
}
