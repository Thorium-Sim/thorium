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
  PointLight,
} from "three";
import {
  MeshTypeEnum,
  Entity as EntityI,
  LightComponent,
} from "generated/graphql";
import {RenderState} from "./types";

const textureLoader = new TextureLoader();
export default class Entity extends Group {
  zoomScale: boolean = true;
  entity: EntityI;
  light: PointLight | null = null;
  childrenAsSprites: boolean = false;
  _isSelected: boolean = false;
  selection?: Object3D;
  forceZoomScale: boolean = false;
  constructor(entity: EntityI, config?: {forceZoomScale?: boolean}) {
    super();
    this.entity = entity;
    if (!entity.location?.position || !entity.appearance) return;

    const {x, y, z} = entity.location?.position;
    this.position.set(x, y, z);

    this.uuid = entity.id;

    this.forceZoomScale = Boolean(config?.forceZoomScale);
    this.childrenAsSprites =
      entity.stageChild?.parent?.stage?.childrenAsSprites || false;
    if (this.childrenAsSprites) {
      this.loadSprite(entity);
      return;
    }
    if (this.meshType === MeshTypeEnum.Model) {
      this.loadModel(entity);
      return;
    }
    this.loadShape(entity);
  }
  // Getters for entity values
  get flightId() {
    return this.entity.flightId;
  }
  get meshType() {
    return this.appearance?.meshType || MeshTypeEnum.Sprite;
  }
  get appearance() {
    return this.entity.appearance;
  }
  get location() {
    return this.entity.location;
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

  loadSprite(entity: EntityI) {
    const texture = textureLoader.load(require("../star-sprite.svg"));
    const spriteMaterial = new SpriteMaterial();
    spriteMaterial.sizeAttenuation = false;
    spriteMaterial.color = new Color(entity.appearance?.color || undefined);
    spriteMaterial.map = texture;
    const sprite = new Sprite(spriteMaterial);
    sprite.uuid = entity.id;
    this.add(sprite);
  }
  loadModel(entity: EntityI) {
    if (entity.light) {
      this.loadLight(entity.light);
    }
  }
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
      emissive: new Color(appearance?.emissiveColor || 0xffffff),
      emissiveIntensity: appearance?.emissiveIntensity ?? 0,
      side: FrontSide,
    });
    const mesh = new Mesh(geometry, material);
    mesh.uuid = entity.id;
    this.add(mesh);
    if (entity.light) {
      this.loadLight(entity.light);
    }
  }
  loadLight(config: LightComponent) {
    if (this.light) return;
    this.light = new PointLight();
    this.light.intensity = config.intensity ?? 1;
    this.light.decay = config.decay ?? 2;
    this.light.color = new Color(config.color || 0xffffff);
    this.add(this.light);
  }
  updateObject(entity: EntityI) {
    // Updates when there are changes
  }
  update(state: RenderState) {
    // Updates every frame
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

    if (this.entity.stageChild?.parentId === state.currentStage) {
      this.visible = true;
    } else {
      this.visible = false;
    }
    if (this.uuid === state.currentStage) {
      this.visible = true;
      this.position.set(0, 0, 0);
      const sprite = this.children.find(e => e instanceof Sprite) as Sprite;
      if (sprite) {
        // Change from sprite to the regular mesh
        this.remove(sprite);
        sprite.material.dispose();
        if (this.meshType === MeshTypeEnum.Model) {
          this.loadModel(this.entity);
        } else {
          this.loadShape(this.entity);
        }
      }
    } else {
      const object = this.children.find(e => !(e instanceof Sprite)) as Mesh;
      if (object && this.entity.stageChild?.parent?.stage?.childrenAsSprites) {
        this.remove(object);
        if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose());
        } else {
          object.material.dispose();
        }
        this.loadSprite(this.entity);
        if (this.light) {
          this.remove(this.light);
          this.light = null;
        }
      }
      if (
        this.location &&
        this.position.x === 0 &&
        this.position.y === 0 &&
        this.position.z === 0
      ) {
        const {x, y, z} = this.location.position;
        this.position.set(x, y, z);
      }
    }
  }
}
