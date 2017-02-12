import uuid from 'uuid';
import { TimelineObject } from './timeline';
export default class Mission extends TimelineObject {
  constructor(params) {
    super(params);
    const simulators = params.simulators || [];
    this.class = 'Mission';
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Mission';
    this.description = params.description || '';
    // These are ID references to the
    // template simulator objects.
    this.simulators = [];
    simulators.forEach((s) => {
      this.addSimulator(s, true);
    });
  }
  addSimulator(simulatorId, name) {
    this.simulators.push(simulatorId);
    // Add it to the timeline for the mission.
    // Get the initialize timeline step item
    if (name !== true) {
      const timelineStep = this.timeline[0];
      this.addTimelineStepItem(timelineStep.id, {
        id: simulatorId,
        name: `Create Simulator: ${simulatorId}`,
        type: 'event', // No idea what this field is for.
        event: 'createSimulator',
        args: JSON.stringify({
          // The rest of the parameters will be set by the
          // Template simulator
          name,
        }),
        delay: 0,
      });
    }
  }
  removeSimulator(simulatorId) {
    this.simulators = this.simulators.filter(s => s !== simulatorId);
  }
  update({ name, description, simulators }) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (simulators) this.simulators = simulators;
  }
}

