import * as THREE from "three";

export default class ParsedModel {
  constructor(settings) {
    this._parseSettings(settings || {});
  }

  _parseSettings(settings) {
    this.quaternion = settings.quaternion || new THREE.Quaternion();
    this.scale = settings.scale;
    if (typeof this.scale !== "number") {
      this.scale = 1;
    }
  }

  parse(model, settings) {
    if (typeof settings !== "undefined") {
      this._parseSettings(settings);
    }
    if (typeof model.traverse === "undefined") {
      console.error("not an instance of THREE.Object3D");
      return;
    }
    this.model = model;
    this.name = model.name;
    this.geometries = new Map();
    this.materialIndices = new Map();
    this.materialsArray = [];

    // adjust the rotation of the model according to the rotation of the world
    this.model.quaternion.copy(this.quaternion);
    this.model.updateMatrix();

    let index = 0;
    this.model.traverse(child => {
      if (child instanceof THREE.Mesh) {
        // set initial scale of model by scaling its geometries
        child.geometry.scale(this.scale, this.scale, this.scale);
        // create an array of the use materials
        let uuid = child.material.uuid;
        this.materialIndices.set(uuid, index++);
        this.materialsArray.push(child.material);
        this.geometries.set(uuid, child.geometry);
      }
    });

    // create multimaterial
    this.material = new THREE.MeshFaceMaterial(this.materialsArray);

    let merged = new THREE.Geometry();
    // merge the geometry and apply the matrix of the new position
    this.geometries.forEach((g, uuid) => {
      merged.merge(g, this.model.matrix, this.materialIndices.get(uuid));
    });

    return merged;
  }
}
