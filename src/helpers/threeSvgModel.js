import loadSvg from 'load-svg';
import {parse as parsePath} from 'extract-svg-path';
import svgMesh3d from 'svg-mesh-3d';

export default function (url, scale = 4){
  return new Promise(function(resolve, reject){
    loadSvg(url, function (err, svg) {
      if (err) {
        reject(err);
      }
      const svgPath = parsePath(svg);
      const mesh = svgMesh3d(svgPath, {
        delaunay: false,
        scale: scale
      })
      resolve(mesh);
    })
  })
}

