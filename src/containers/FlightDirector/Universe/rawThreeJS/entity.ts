import {
  Group,
  TextureLoader,
  SpriteMaterial,
  Color,
  Sprite,
  Object3D,
  SphereGeometry,
  BoxBufferGeometry,
  MeshStandardMaterial,
  FrontSide,
  Mesh,
} from "three";
import {
  AppearanceComponent,
  StageChildComponent,
  StageComponent,
  MeshTypeEnum,
  Entity as EntityI,
  IdentityComponent,
} from "generated/graphql";
import {RenderState} from "./types";

const textureLoader = new TextureLoader();
export default class Entity extends Group {
  zoomScale: boolean = true;
  meshType: MeshTypeEnum = MeshTypeEnum.Sprite;
  flightId?: string | null;
  appearance?: AppearanceComponent;
  identity?: IdentityComponent | null;
  stage?: StageComponent;
  stageChild?: Partial<StageChildComponent>;
  location?: {x: number; y: number; z: number};
  childrenAsSprites: boolean = false;
  _isSelected: boolean = false;
  selection?: Object3D;
  forceZoomScale: boolean = false;
  constructor(entity: EntityI, config?: {forceZoomScale?: boolean}) {
    super();
    if (!entity.location?.position || !entity.appearance) return;

    this.location = entity.location.position;

    const {x, y, z} = entity.location?.position;
    this.position.set(x, y, z);

    this.uuid = entity.id;
    this.flightId = entity.flightId;

    this.identity = entity.identity;
    this.appearance = entity.appearance;
    this.meshType = this.appearance.meshType || this.meshType;
    this.stage = entity.stage || undefined;
    this.stageChild = entity.stageChild || undefined;
    this.forceZoomScale = Boolean(config?.forceZoomScale);
    this.childrenAsSprites =
      entity.stageChild?.parent?.stage?.childrenAsSprites || false;
    if (this.childrenAsSprites) {
      this.loadSprite(entity.id, entity.appearance);
      return;
    }
    if (this.meshType === MeshTypeEnum.Model) {
      this.loadModel(entity);
      return;
    }
    this.loadShape(entity);
  }
  get selected() {
    return this._isSelected;
  }
  set selected(s: boolean) {
    this._isSelected = s;
    if (!this.selection) {
      if (this.childrenAsSprites) {
        const texture = textureLoader.load(require("../circle.svg"));
        const spriteMaterial = new SpriteMaterial();
        spriteMaterial.sizeAttenuation = false;
        spriteMaterial.color = new Color("orange");
        spriteMaterial.map = texture;
        const sprite = new Sprite(spriteMaterial);
        this.add(sprite);
        this.selection = sprite;
      }
    }
    if (this.selection) {
      if (s) {
        this.selection.visible = true;
      } else {
        this.selection.visible = false;
      }
    }
  }

  loadSprite(id: string, appearance: Partial<AppearanceComponent>) {
    const texture = textureLoader.load(require("../star-sprite.svg"));
    const spriteMaterial = new SpriteMaterial();
    spriteMaterial.sizeAttenuation = false;
    spriteMaterial.color = new Color(appearance.color || undefined);
    spriteMaterial.map = texture;
    const sprite = new Sprite(spriteMaterial);
    sprite.uuid = id;
    this.add(sprite);
  }
  loadModel(entity: EntityI) {}
  getGeometry(meshType: MeshTypeEnum, size: number = 1) {
    switch (meshType) {
      case "sphere":
        return new SphereGeometry(size, 32, 32);
      case "cube":
        return new BoxBufferGeometry(size, size, size);
      default:
        break;
    }
  }
  loadShape(entity: EntityI) {
    const {appearance} = entity;
    const geometry = this.getGeometry(this.meshType);
    const texture = appearance?.materialMapAsset
      ? textureLoader.load(`/assets${appearance.materialMapAsset}`)
      : null;
    const material = new MeshStandardMaterial({
      map: texture,
      color: appearance?.color ? new Color(appearance.color) : undefined,
      emissive: appearance?.emissiveColor
        ? new Color(appearance?.emissiveColor)
        : undefined,
      emissiveIntensity: appearance?.emissiveIntensity ?? 0,
      side: FrontSide,
    });
    const mesh = new Mesh(geometry, material);
    mesh.uuid = entity.id;
    this.add(mesh);
  }
  update(state: RenderState) {
    const {zoom} = state.camera;
    let zoomedScale = 1 / zoom / 2;
    if (
      this.zoomScale ||
      this.forceZoomScale ||
      this.meshType === MeshTypeEnum.Sprite
    ) {
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

    if (this.stageChild?.parentId === state.currentStage) {
      this.visible = true;
    } else {
      this.visible = false;
    }
    if (this.uuid === state.currentStage) {
      this.visible = true;
      this.position.set(0, 0, 0);
    } else {
      if (
        this.location &&
        this.position.x === 0 &&
        this.position.y === 0 &&
        this.position.z === 0
      ) {
        const {x, y, z} = this.location;
        this.position.set(x, y, z);
      }
    }
  }
}
