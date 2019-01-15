export const sensorsFireProjectile = {
  name: "sensorsFireProjectile",
  category: "Triggers",
  component: () => "Event: Battle Projectile Fired",
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: []
};

export const sensorsProjectileHit = {
  name: "sensorsProjectileHit",
  category: "Triggers",
  component: () => "Event: Battle Projectile Hit",
  outputs: [
    {
      id: "triggerOut",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    }
  ],
  inputs: [],
  config: []
};
