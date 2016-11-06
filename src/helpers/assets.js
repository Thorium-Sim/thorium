export default function(assetKey){
	return fetch('/assets?asset_key=' + assetKey);
}
