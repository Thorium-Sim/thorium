import {
  Group,
  TextureLoader,
  SpriteMaterial,
  Color,
  Sprite,
  Object3D,
} from "three";
import {
  AppearanceComponent,
  LocationComponent,
  StageChildComponent,
} from "generated/graphql";
import {RenderState} from "./types";

export default class Entity extends Group {
  zoomScale: boolean = true;
  meshType: "sprite" = "sprite";
  appearance?: AppearanceComponent;
  childrenAsSprites: boolean = false;
  _isSelected: boolean = false;
  selection?: Object3D;
  constructor(entity: {
    id: string;
    location?: Partial<LocationComponent> | null;
    appearance?: Partial<AppearanceComponent> | null;
    stageChild?: Partial<StageChildComponent> | null;
  }) {
    super();
    if (!entity.location?.position || !entity.appearance) return;

    const {x, y, z} = entity.location?.position;
    this.position.set(x, y, z);

    this.uuid = entity.id;

    this.appearance = entity.appearance;
    this.childrenAsSprites =
      entity.stageChild?.parent?.stage?.childrenAsSprites || false;
    if (this.childrenAsSprites) {
      this.loadSprite(entity.id, entity.appearance);
    }
  }
  get selected() {
    return this._isSelected;
  }
  set selected(s: boolean) {
    this._isSelected = s;
    if (!this.selection) {
      if (this.childrenAsSprites) {
        const texture = new TextureLoader().load(require("../circle.svg"));
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
    const texture = new TextureLoader().load(require("../star-sprite.svg"));
    const spriteMaterial = new SpriteMaterial();
    spriteMaterial.sizeAttenuation = false;
    spriteMaterial.color = new Color(appearance.color || undefined);
    spriteMaterial.map = texture;
    const sprite = new Sprite(spriteMaterial);
    sprite.uuid = id;
    this.add(sprite);
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
