import React from "react";
import {ApolloClient} from "@apollo/client";
import {StoreApi} from "zustand";
import {PatchData} from "helpers/hooks/usePatchedSubscriptions";
import {
  Entity as EntityInterface,
  LocationComponent,
  AppearanceComponent,
  EntitiesDocument,
  EntitiesQuery,
  StageChildComponent,
} from "generated/graphql";
import {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  MOUSE,
  Group,
  Vector3,
  TextureLoader,
  Sprite,
  SpriteMaterial,
  Color,
  Camera,
  OrthographicCamera,
  PerspectiveCamera,
} from "three";
import renderer from "./renderer";
import getPerspectiveCamera from "./perspectiveCamera";
import getOrthoCamera from "./orthoCamera";
import PanControls from "../PanControls";
import globals from "./globals";
import Grid from "./grid";
import loadImage from "./loadImage";

// import generateNebula from "./nebula";

// function* waitFrames(numFrames) {
//   while (numFrames > 0) {
//     --numFrames;
//     yield;
//   }
// }

// function* waitSeconds(duration) {
//   while (duration > 0) {
//     duration -= globals.deltaTime;
//     yield;
//   }
// }

class SafeArray<T> {
  array: T[];
  addQueue: T[];
  removeQueue: Set<T>;
  constructor() {
    this.array = [];
    this.addQueue = [];
    this.removeQueue = new Set();
  }
  get isEmpty() {
    return this.addQueue.length + this.array.length > 0;
  }
  add(element: T) {
    this.addQueue.push(element);
  }
  remove(element: T) {
    this.removeQueue.add(element);
  }
  forEach(fn: (item: T) => void) {
    this._addQueued();
    this._removeQueued();
    for (const element of this.array) {
      if (this.removeQueue.has(element)) {
        continue;
      }
      fn(element);
    }
    this._removeQueued();
  }
  _addQueued() {
    if (this.addQueue.length) {
      this.array.splice(this.array.length, 0, ...this.addQueue);
      this.addQueue = [];
    }
  }
  _removeQueued() {
    if (this.removeQueue.size) {
      this.array = this.array.filter(element => !this.removeQueue.has(element));
      this.removeQueue.clear();
    }
  }
}

type RenderState = {camera: PerspectiveCamera | OrthographicCamera};

class GameObjectManager {
  gameObjects: SafeArray<{update: (state: RenderState) => void}>;
  constructor() {
    this.gameObjects = new SafeArray();
  }
  addGameObject(object: {
    update: (state: RenderState) => void;
    [key: string]: any;
  }) {
    this.gameObjects.add(object);
  }
  removeGameObject(gameObject: {
    update: (state: RenderState) => void;
    [key: string]: any;
  }) {
    this.gameObjects.remove(gameObject);
  }
  update(state: RenderState) {
    this.gameObjects.forEach(gameObject => gameObject.update(state));
  }
}

class Entity extends Group {
  zoomScale: boolean = true;
  meshType: "sprite" = "sprite";
  appearance?: AppearanceComponent;
  constructor(entity: {
    location?: Partial<LocationComponent> | null;
    appearance?: Partial<AppearanceComponent> | null;
    stageChild?: Partial<StageChildComponent> | null;
  }) {
    super();
    if (!entity.location?.position || !entity.appearance) return;

    const {x, y, z} = entity.location?.position;
    this.position.set(x, y, z);

    this.appearance = entity.appearance;

    if (entity.stageChild?.parent?.stage?.childrenAsSprites) {
      this.loadSprite(entity.appearance);
    }
  }
  async loadSprite(appearance: Partial<AppearanceComponent>) {
    const texture = new TextureLoader().load(require("../star-sprite.svg"));
    const spriteMaterial = new SpriteMaterial();
    spriteMaterial.sizeAttenuation = false;
    spriteMaterial.color = new Color(appearance.color || undefined);
    spriteMaterial.map = texture;
    const sprite = new Sprite(spriteMaterial);
    this.add(sprite);
    console.log("added sprite");
  }
  update(state: RenderState) {
    const {zoom} = state.camera;
    let zoomedScale = 1 / zoom / 2;
    if (this.zoomScale || this.meshType === "sprite") {
      // zoomedScale *= 2;
      this.scale.set(zoomedScale, zoomedScale, zoomedScale);
    } else {
      this.appearance?.scale &&
        this.scale.set(
          this.appearance.scale,
          this.appearance.scale,
          this.appearance.scale,
        );
    }
  }
}
class Cube extends Mesh {
  constructor() {
    var geometry = new BoxGeometry(1, 1, 1);
    var material = new MeshBasicMaterial({color: 0x00ff00});
    super(geometry, material);
  }
  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}
async function renderRawThreeJS(
  ref: React.RefObject<HTMLDivElement>,
  client: ApolloClient<object>,
  storeApi: StoreApi<PatchData<EntityInterface[]>>,
) {
  const gameObjectManager = new GameObjectManager();
  const scene = new Scene();
  const dimensions = ref.current?.getBoundingClientRect();
  if (!dimensions) return;
  renderer.setSize(dimensions.width, dimensions.height);
  // document.body.appendChild( renderer.domElement );
  // use ref as a mount point of the Three.js scene instead of the document.body
  ref.current?.appendChild(renderer.domElement);

  const cube = new Cube();
  gameObjectManager.addGameObject(cube);

  scene.add(cube);

  const grid = new Grid(dimensions);
  gameObjectManager.addGameObject(grid);
  scene.add(grid);

  client
    .query({query: EntitiesDocument, variables: {flightId: "cool flight"}})
    .then(res => {
      const entities: EntitiesQuery = res.data;
      entities.entities.forEach(e => {
        if (!e) return;
        const entity = new Entity(e);
        gameObjectManager.addGameObject(entity);
        scene.add(entity);
      });
    });
  // generateNebula("alex").then(nebula => scene.add(nebula));

  const camera = getOrthoCamera(dimensions);
  const panControls = new PanControls(camera, ref.current);
  panControls.enableRotate = false;
  panControls.screenSpacePanning = true;
  panControls.maxZoom = 5;
  panControls.minZoom = 0.00000001;
  panControls.zoomSpeed = 1;
  panControls.zoom0 = 0.00000001;
  panControls.mouseButtons = {
    MIDDLE: MOUSE.DOLLY,
    LEFT: MOUSE.PAN,
    RIGHT: MOUSE.PAN,
  };
  let then = 0;
  let frame: number;
  const render = function (now: number) {
    globals.time = now;
    globals.delta = Math.min(globals.time - then, 1 / 20);
    then = globals.time;

    console.log(camera.position, camera.zoom);
    frame = requestAnimationFrame(render);
    try {
      gameObjectManager.update({camera});
    } catch (err) {
      console.error("There has been an error", err);
      cancelAnimationFrame(frame);
      throw err;
    }
    renderer.render(scene, camera);
  };
  frame = requestAnimationFrame(render);
}

export default renderRawThreeJS;
