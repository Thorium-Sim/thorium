import uuid from "uuid";

export default class TimelineInstance {
  id: string;
  missionId: string;
  currentTimelineStep: number;
  executedTimelineSteps: string[];
  constructor(params: Partial<TimelineInstance> = {}) {
    this.id = uuid.v4();
    this.missionId = params.missionId || null;
    this.currentTimelineStep = params.currentTimelineStep || 0;
    this.executedTimelineSteps = params.executedTimelineSteps || [];
  }
  setTimelineStep(step) {
    this.currentTimelineStep = step;
  }
}
