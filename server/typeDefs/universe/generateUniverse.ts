import Prando from "prando";
import {Entity} from "../../classes";
import {
  Identity,
  Stage,
  StageChild,
  Appearance,
  Location,
  Light,
  Physical,
} from "../../classes/universe/components";
import {MeshTypeEnum} from "../../classes/universe/components/appearance";
import systemNames from "../../classes/universe/systemNames";
import planetNames from "../../classes/universe/planetNames";

export default function generateUniverse(flightId, procGenKey) {
  const rng = new Prando(procGenKey);
  const entities: Entity[] = [];
  // We'll only generate three levels
  // - The root stage
  // - The stars on the root stage
  // - The planets within those stars.

  const systemsList = systemNames.concat();
  const planetsList = planetNames.concat();
  // Generate the root stage first.
  const rootStage = new Entity({
    flightId,
    id: rng.nextString(),
    identity: new Identity({name: "Base Universe", type: ""}),
    stage: new Stage({
      rootStage: true,
      scaleLabel: "Milli-Lightyears",
      scaleLabelShort: "M LY",
      skyboxKey: rng.nextString(),
      childrenAsSprites: true,
    }),
  });

  entities.push(rootStage);

  // Generate all of the star systems
  // http://www.astronomytrek.com/list-of-different-star-types/
  Array.from({length: 512}).forEach(() => {
    const systemEntity = generateStarSystem(
      rng,
      flightId,
      rootStage.id,
      systemsList,
    );
    entities.push(systemEntity);

    // Generate all of the planets
  });
  return entities;
}

type range = {min: number; max: number};

const starTypes: {
  spectralType: "O" | "B" | "G" | "K" | "A" | "F" | "M" | "D";
  prevalence: number;
  temperatureRange: range;
  solarMassRange: range;
  ageRange: range;
  radiusRange: range;
  hueRange: range;
  white?: boolean;
}[] = [
  {
    // Blue Stars
    spectralType: "O",
    prevalence: 0.015,
    temperatureRange: {min: 28000, max: 33000},
    solarMassRange: {min: 2.5, max: 90},
    ageRange: {min: 38000000, max: 42000000},
    radiusRange: {min: 2.7, max: 10},
    hueRange: {min: 195, max: 250},
  },
  {
    // Blue Giant
    spectralType: "B",
    prevalence: 0.015,
    temperatureRange: {min: 10000, max: 50000},
    solarMassRange: {min: 20, max: 1000},
    ageRange: {min: 8000000, max: 12000000},
    radiusRange: {min: 18, max: 22},
    hueRange: {min: 220, max: 270},
  },
  {
    // Red Giant
    spectralType: "M",
    prevalence: 0.04,
    temperatureRange: {min: 3300, max: 5300},
    solarMassRange: {min: 0.3, max: 10},
    ageRange: {min: 100000000, max: 2000000000},
    radiusRange: {min: 20, max: 100},
    hueRange: {min: 0, max: 20},
  },
  {
    // Yellow Dwarf
    spectralType: "G",
    prevalence: 0.1,
    temperatureRange: {min: 5200, max: 7500},
    solarMassRange: {min: 0.8, max: 1.4},
    ageRange: {min: 4000000000, max: 17000000000},
    radiusRange: {min: 0.9, max: 1.4},
    hueRange: {min: 40, max: 60},
  },
  {
    // Orange Dwarf
    spectralType: "K",
    prevalence: 0.1,
    temperatureRange: {min: 3700, max: 5200},
    solarMassRange: {min: 0.45, max: 0.8},
    ageRange: {min: 15000000000, max: 30000000000},
    radiusRange: {min: 0.7, max: 0.9},
    hueRange: {min: 20, max: 40},
  },
  {
    // White Dwarf
    spectralType: "D",
    prevalence: 0.4,
    temperatureRange: {min: 3300, max: 5300},
    solarMassRange: {min: 0.3, max: 10},
    ageRange: {min: 100000000, max: 2000000000},
    radiusRange: {min: 20, max: 100},
    hueRange: {min: 0, max: 20},
  },
  {
    // Red Dwarf
    spectralType: "M",
    prevalence: 1,
    temperatureRange: {min: 8000, max: 40000},
    solarMassRange: {min: 0.1, max: 1.4},
    ageRange: {min: 100000, max: 10000000000},
    radiusRange: {min: 0.008, max: 0.2},
    hueRange: {min: 180, max: 181},
    white: true,
  },
];
function getRange(rng: Prando, range: range) {
  return rng.nextInt(range.min, range.max);
}
function randomOnPlane(rng: Prando, maxRadius = 50000, z = 0) {
  const angle = rng.next() * Math.PI * 2;
  const radius = rng.next() * maxRadius;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return {x, y, z};
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateStarSystem(
  rng: Prando,
  flightId: string,
  stageId: string,
  systemNames: string[],
) {
  // Generating a new PRNG allows me to add additional properties
  // to the start in the future without messing up the random numbers
  // for other stars that get generated
  const starRng = new Prando(rng.nextString());
  const typeNum = starRng.next();
  const starType = starTypes.find(t => t.prevalence >= typeNum);

  const sunRadius = 3481.7;
  const hue = getRange(starRng, starType.hueRange);

  const systemName = shuffle(systemNames).pop();

  const scale =
    starRng.next(starType.radiusRange.min, starType.radiusRange.max) *
    sunRadius;

  return new Entity({
    flightId,
    stage: new Stage({
      scaleLabelShort: "M",
      scaleLabel: "Meters",
      skyboxKey: rng.nextString(),
    }),
    stageChild: new StageChild({
      parentId: stageId,
    }),
    identity: new Identity({
      name: systemName,
      type: "",
    }),
    physical: new Physical({
      solarMass: starRng.next(
        starType.solarMassRange.min,
        starType.solarMassRange.max,
      ),
      age: getRange(starRng, starType.ageRange),
      temperature: getRange(starRng, starType.temperatureRange),
    }),
    appearance: new Appearance({
      meshType: MeshTypeEnum.sphere,
      materialMapAsset: "/3D/Texture/Planets/2k_sun_white.jpg",
      color: `hsl(${hue}, 50%, ${starType.white ? 100 : 50}%)`,
      scale,
      emissiveColor: `hsl(${hue}, 70%, ${starType.white ? 100 : 50}%)`,
      emissiveIntensity: 1,
    }),
    location: new Location({
      inert: true,
      position: randomOnPlane(
        starRng,
        500000000,
        getRange(starRng, {min: -5000, max: 5000}),
      ),
    }),
    light: new Light({
      decay: 2,
      intensity: 1,
      color: `hsl(${hue}, 100%, ${starType.white ? 100 : 90}%)`,
    }),
  });
}
