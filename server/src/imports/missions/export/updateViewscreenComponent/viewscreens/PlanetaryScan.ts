export default function PlanetaryScan(data) {
  const assets: {planet: string; clouds: string}[] = [];
  assets.push(data.planet);
  assets.push(data.clouds);
  return assets;
}
