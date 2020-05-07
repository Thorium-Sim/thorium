export default class Lighting {
  class: "Lighting";
  intensity: number;
  action:
    | "normal"
    | "darken"
    | "blackout"
    | "work"
    | "fade"
    | "shake"
    | "strobe"
    | "oscillate";
  actionStrength: number;
  transitionDuration: number;
  useAlertColor: boolean;
  color: string | null;
  dmxConfig?: string;
  constructor(params: Partial<Lighting> = {}) {
    this.class = "Lighting";
    this.intensity = params.intensity || 0;

    this.action = params.action || "normal";
    this.actionStrength = params.actionStrength || 1;
    this.transitionDuration = params.transitionDuration || 1000;
    this.dmxConfig = params.dmxConfig || null;
    // If it's null, use the alert color
    this.useAlertColor = params.useAlertColor ?? true;
    this.color = params.color || null;
  }
  update({
    intensity,
    action,
    actionStrength,
    transitionDuration,
    color,
    dmxConfig,
  }: Partial<Lighting>) {
    if (intensity || intensity === 0) this.intensity = intensity;
    if (action) this.action = action;
    if (actionStrength || actionStrength === 0)
      this.actionStrength = actionStrength;
    if (transitionDuration || transitionDuration === 0)
      this.transitionDuration = transitionDuration;
    if (color || color === null) {
      this.color = color;
      this.useAlertColor = color === null;
    }
    if (dmxConfig) this.dmxConfig = dmxConfig;
  }
}
