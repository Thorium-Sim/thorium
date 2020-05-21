import {WebGLRenderer, sRGBEncoding} from "three";

const renderer = new WebGLRenderer({
  alpha: true,
  antialias: true,
  logarithmicDepthBuffer: true,
});

renderer.outputEncoding = sRGBEncoding;

export default renderer;
