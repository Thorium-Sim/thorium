import uuid from "uuid";
// TODO: Extend this with different types of sensor contacts
// Ex: Ship has crew count, weapons, etc.

function distance3d(coord2, coord1) {
  const { x: x1 = 0, y: y1 = 0, z: z1 = 0 } = coord1;
  let { x: x2 = 0, y: y2 = 0, z: z2 = 0 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

function calculateRotatedPoint({ x, y }, angle) {
  const rad = degreeToRadian(angle);
  return {
    x: x * Math.cos(rad) - y * Math.sin(rad),
    y: x * Math.sin(rad) + y * Math.cos(rad)
  };
}

function degreeToRadian(deg) {
  return (deg * Math.PI) / 180;
}

export default class SensorContact {
  constructor(params) {
    if (!params) return;
    this.id = params.id || uuid.v4();
    this.sensorId = params.sensorId || null;
    this.class = "SensorContact";
    this.name = params.name || "Contact";
    this.size = params.size || 1; // Float - Scale percentage
    this.type = params.type || "contact";
    this.rotation = params.rotation || 0;
    this.icon = params.icon || "/Sensor Contacts/Icons/Default"; // Added to '/Sensor Contacts/'
    this.color = params.color || "#0f0";
    this.picture = params.picture || null;
    this.speed = params.speed || 0; // Float
    this.location = params.location || {
      x: 0,
      y: 0,
      z: 0
    };
    this.destination = params.destination || {
      x: 0,
      y: 0,
      z: 0
    };
    this.position = params.position || this.location;
    this.infrared = params.infrared || false;
    this.cloaked = params.cloaked || false;
    this.locked = params.locked || false;
    this.disabled = params.disabled || false;
    this.destroyed = false;
    this.startTime = 0;
    this.endTime = 0;

    // For Railguns
    this.hitpoints = params.hitpoints || 5;
    this.hostile = params.hostile || false;
    this.autoFire = params.autoFire || false;
  }
  move(coordinates, speed, stop) {
    this.speed = stop ? 0 : speed;
    this.destination = coordinates;
    this.location = this.position;
    if (stop) {
      this.destination = this.position;
    }
    this.startTime = Date.now();
    const movementTime = Math.ceil(
      (distance3d(this.destination, this.location) / (this.speed / 10)) * 1000
    );
    this.endTime = this.startTime + movementTime;
  }
  nudge(coordinates, speed, yaw) {
    if (this.locked) return;

    this.speed = speed;
    const maxDistance = this.type === "planet" ? 1 + this.size / 2 : 1.1;
    if (yaw) {
      // Rotate the contact about the center
      const destinationPoints = calculateRotatedPoint(this.destination, yaw);
      const locationPoints = calculateRotatedPoint(this.location, yaw);
      const positionPoints = calculateRotatedPoint(this.position, yaw);

      this.destination.x = destinationPoints.x;
      this.destination.y = destinationPoints.y;
      this.location.x = locationPoints.x;
      this.location.y = locationPoints.y;
      this.position.x = positionPoints.x;
      this.position.y = positionPoints.y;
      this.rotation += yaw;
    } else {
      this.destination = {
        x: Math.max(
          -1 * maxDistance,
          Math.min(maxDistance, this.destination.x + coordinates.x)
        ),
        y: Math.max(
          -1 * maxDistance,
          Math.min(maxDistance, this.destination.y + coordinates.y)
        ),
        z: Math.max(
          -1 * maxDistance,
          Math.min(maxDistance, this.destination.z + coordinates.z)
        )
      };
      this.location = this.position;
      this.startTime = Date.now();
      const movementTime = Math.ceil(
        (distance3d(this.destination, this.location) / (speed / 10)) * 1000
      );
      this.endTime = this.startTime + movementTime;
    }
  }
  stop() {
    this.destination = this.position;
    this.location = this.position;
    this.speed = 0;
  }
  updateInfrared(tf) {
    this.infrared = tf;
  }
  updateIcon(icon) {
    this.icon = icon;
  }
  updateName(name) {
    this.name = name;
  }
  updateSize(size) {
    this.size = size;
  }
  updatePicture(picture) {
    this.picture = picture;
  }
  updateColor(color) {
    this.color = color;
  }
  updateLocked(locked) {
    this.locked = locked;
  }
  updateDisabled(disabled) {
    this.disabled = disabled;
  }
  updateHitpoints(hit) {
    if (hit) this.hitpoints = hit;
    else this.hitpoints = this.hitpoints - 1;
  }
  updateHostile(h) {
    this.hostile = h;
  }
  updateAutofire(tf) {
    this.autoFire = tf;
  }
}
