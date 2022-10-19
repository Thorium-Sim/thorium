import uuid from "uuid";

export class PanelCable {
  id: string;
  color: string;
  components: string[];
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.color = params.color || "red";
    this.components = params.components;
  }
}

export class PanelComponent {
  id: string;
  component: string;
  level: number;
  color: string;
  label: string;
  x: number;
  y: number;
  scale: number;
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.component = params.component || "Buffer";
    this.level = params.level || 0;
    this.color = params.color || "#0f0";
    this.label = params.label || "";
    this.x = params.x || 0;
    this.y = params.y || 0;
    this.scale = params.scale || 1;
  }
}

class PanelConnection {
  id: string;
  to: string;
  from: string;
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.to = params.to || uuid.v4();
    this.from = params.from || uuid.v4();
  }
}

export default class SoftwarePanel {
  id: string;
  class: string;
  simulatorId: string | null;
  templateId: string | null;
  name: string;
  cables: PanelCable[];
  components: PanelComponent[];
  connections: PanelConnection[];
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "SoftwarePanel";
    this.simulatorId = params.simulatorId || null;
    this.templateId = params.templateId || null;
    this.name = params.name || "Panel";
    this.cables = [];
    this.components = [];
    this.connections = [];
    this.update(params);
  }
  update(panel) {
    if (panel.name) this.name = panel.name;
    if (panel.cables) {
      this.cables = [];
      (panel.cables || []).forEach(c => this.cables.push(new PanelCable(c)));
    }
    if (panel.components) {
      this.components = [];
      (panel.components || []).forEach(c =>
        this.components.push(new PanelComponent(c)),
      );
    }
    if (panel.connections) {
      this.connections = [];

      (panel.connections || []).forEach(c =>
        this.connections.push(new PanelConnection(c)),
      );
    }
  }
}
