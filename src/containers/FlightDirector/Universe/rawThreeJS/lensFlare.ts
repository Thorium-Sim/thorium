import {PointLight, TextureLoader} from "three";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";

export class LensFlare extends PointLight {
  constructor(...params: ConstructorParameters<typeof PointLight>) {
    super(...params);

    const textureLoader = new TextureLoader();

    const textureFlare0 = textureLoader.load(
      require("./textures/lensflare/lensflare0.png"),
    );
    const textureFlare1 = textureLoader.load(
      require("./textures/lensflare/lensflare2.png"),
    );
    const textureFlare2 = textureLoader.load(
      require("./textures/lensflare/lensflare3.png"),
    );

    const lensflare = new Lensflare();

    lensflare.addElement(new LensflareElement(textureFlare0, 200, 0));
    lensflare.addElement(new LensflareElement(textureFlare1, 512, 0.01));
    lensflare.addElement(new LensflareElement(textureFlare2, 60, 0.4));
    lensflare.addElement(new LensflareElement(textureFlare2, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare2, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare2, 70, 1.0));

    this.add(lensflare);
  }
}
