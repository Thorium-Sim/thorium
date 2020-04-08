import React from "react";
import * as THREE from "three";
import nebulaGenerator from "./generateNebulaMap";
const radius = 1490000000000;

const imageCache: {[key: string]: any} = {};

const useImage = (url: string) => {
  if (!imageCache[url]) {
    const image = new Image();
    const promise = new Promise(resolve => {
      image.addEventListener("load", () => resolve(image));
      image.crossOrigin = "anonymous";
      image.src = url;
    }).then(res => {
      imageCache[url] = res;
    });
    imageCache[url] = promise;
  }
  if (imageCache[url].then) {
    throw imageCache[url];
  }
  return imageCache[url];
};

interface Textures {
  front: any;
  back: any;
  top: any;
  bottom: any;
  left: any;
  right: any;
}
const Nebula = React.memo<{skyboxKey: string}>(function Nebula({skyboxKey}) {
  const starsImage = useImage(require("./stars.jpg"));
  const mats = React.useMemo(() => {
    const textures = nebulaGenerator(skyboxKey || "c") as Textures;
    const maps: HTMLCanvasElement[] = [];

    function drawIndividual(source: any, targetid: string) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 2048;
      var ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.save();
      if (targetid === "texture-bottom") {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(source, -1024, -1024, 2048, 2048);
        ctx.globalCompositeOperation = "lighten";
        ctx.drawImage(starsImage, -1024, -1024, 2048, 2048);
      } else if (targetid === "texture-top") {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((-90 * Math.PI) / 180);
        ctx.drawImage(source, -1024, -1024, 2048, 2048);
        ctx.globalCompositeOperation = "lighten";
        ctx.drawImage(starsImage, -1024, -1024, 2048, 2048);
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(source, 0, 0, 2048, 2048);
        ctx.globalCompositeOperation = "lighten";
        ctx.drawImage(starsImage, 0, 0, 2048, 2048);
      }
      ctx.restore();
      maps.push(canvas);
    }

    drawIndividual(textures.front, "texture-front");
    drawIndividual(textures.back, "texture-back");
    drawIndividual(textures.top, "texture-top");
    drawIndividual(textures.bottom, "texture-bottom");
    drawIndividual(textures.left, "texture-left");
    drawIndividual(textures.right, "texture-right");

    const tx = maps.map(m => new THREE.CanvasTexture(m));
    const mats = tx.map(
      m =>
        new THREE.MeshBasicMaterial({
          map: m,
          side: THREE.BackSide,
          color: new THREE.Color("#333"),
        }),
    );
    return mats;
  }, [starsImage, skyboxKey]);

  const geo = React.useRef();
  return (
    <mesh scale={[radius, radius, radius]} material={mats}>
      <boxGeometry ref={geo} args={[1, 1, 1]} attach="geometry" />
    </mesh>
  );
});

export default Nebula;
