export default function PlanetaryScan(data) {
  const assets = [];
  assets.push(data.planet);
  assets.push(data.clouds);
  return assets;
}
