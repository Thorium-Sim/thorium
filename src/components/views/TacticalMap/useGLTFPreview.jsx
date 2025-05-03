import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  HemisphereLight,
  DirectionalLight,
  Vector3,
  Group,
  sRGBEncoding,
} from "three";
import GLTFLoader from "containers/FlightDirector/Universe/GLTFLoader";

const width = 200;
const height = 200;

const cache = {};
let renderer;
if (process.env.JEST_WORKER_ID === undefined) {
  renderer = new WebGLRenderer({alpha: true});
  renderer.setSize(width, height);
  renderer.outputEncoding = sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
}

export default function useGLTFPreview(assetPath) {
  if (process.env.JEST_WORKER_ID !== undefined) return "";
  if (cache[assetPath] && cache[assetPath].then) throw cache[assetPath];
  if (!cache[assetPath]) {
    const promise = new Promise(resolve => {
      const scene = new Scene();
      // scene.background = new Color(0x666666);
      const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);

      camera.position.y = -2;
      camera.position.z = 2;
      camera.lookAt(new Vector3(0, 0, 0));

      const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
      hemiLight.position.set(0, 500, 0);
      scene.add(hemiLight);

      const dirLight = new DirectionalLight(0xffffff, 0.5);
      dirLight.position.set(-1, 0.75, 1);
      dirLight.name = "dirlight";
      scene.add(dirLight);

      const objectGroup = new Group();

      scene.add(objectGroup);

      const loader = new GLTFLoader();
      loader.load(assetPath, gltf => {
        const obj = gltf.scene;
        obj.rotation.set(0, 0, (-3 * Math.PI) / 4);
        scene.add(obj);
        renderer.render(scene, camera);
        resolve(renderer.domElement.toDataURL("image/png"));
      });
    }).then(res => (cache[assetPath] = res));
    cache[assetPath] = promise;
    throw promise;
  }

  return cache[assetPath];
}
