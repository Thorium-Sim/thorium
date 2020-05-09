export default class Assets {
  mesh: string;
  texture: string;
  side: string;
  top: string;
  logo: string;
  bridge: string;
  constructor(params: Partial<Assets> = {}) {
    this.mesh = params.mesh || "/Simulator/default/mesh.obj";
    this.texture = params.texture || "/Simulator/default/texture.jpg";
    this.side = params.side || "/Simulator/default/side.png";
    this.top = params.top || "/Simulator/default/top.png";
    this.logo = params.logo || "/Simulator/default/logo.svg";
    this.bridge = params.bridge || "/Simulator/default/bridge.svg";
  }
}
