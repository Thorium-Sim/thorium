import uuid from "uuid";

interface Requirements {
  cards: string[];
  systems: string[];
}
export default class Mission {
  class: "Mission";
  id: string;
  name: string;
  description: string;
  category: string;
  aux: boolean;
  simulators: string[];
  timeline: TimelineStep[];
  extraRequirements: Requirements;
  constructor(params: Partial<Mission> = {}) {
    this.class = "Mission";
    this.id = params.id || uuid.v4();
    this.name = params.name || "Mission";
    this.description = params.description || "";
    this.category = params.category || "";
    this.aux = params.aux || false;
    this.simulators = params.simulators || [];
    this.timeline = [];
    this.extraRequirements = params.extraRequirements || {
      cards: [],
      systems: [],
    };
    if (params.timeline) {
      params.timeline.forEach(t => {
        this.timeline.push(new TimelineStep(t.id, t));
      });
    } else {
      this.timeline[0] = new TimelineStep(`${params.id}-initial`, {
        name: "Initialize",
        description: "Initializes the mission",
        order: 0,
        timelineitems: [],
      });
    }
  }
  update({name, description, aux, category, simulators}) {
    if (name || name === "") this.name = name;
    if (description || description === "") this.description = description;
    if (category || category === "") this.category = category;
    if (aux || aux === false) this.aux = aux;
    if (simulators) this.simulators = simulators;
  }
  addTimelineStep({name, description, order, timelineStepId, timelineItems}) {
    this.timeline.push(
      new TimelineStep(timelineStepId, {
        name,
        description,
        order,
        timelineItems,
      }),
    );
  }
  removeTimelineStep(timelineStepId) {
    this.timeline = this.timeline.filter(t => t.id !== timelineStepId);
  }
  duplicateTimelineStep(timelineStepId) {
    const timelineStep = this.timeline.find(t => t.id === timelineStepId);
    this.timeline.push(new TimelineStep(null, timelineStep));
  }
  duplicateTimelineItem(timelineStepId, timelineItemId) {
    const timelineStep = this.timeline.find(t => t.id === timelineStepId);
    return timelineStep.duplicateItem(timelineItemId);
  }
  reorderTimelineStep(timelineStepId, newOrder) {
    function move(array, old_index, new_index) {
      if (new_index >= array.length) {
        var k = new_index - array.length;
        while (k-- + 1) {
          array.push(undefined);
        }
      }
      array.splice(new_index, 0, array.splice(old_index, 1)[0]);
      return array; // for testing purposes
    }
    // Go through each timeline step in the timeline.
    // If it is less than newOrder, do nothing
    // If it is greater than newOrder, add 1 to the order.
    // Then sort it.
    this.timeline = move(
      this.timeline,
      this.timeline.findIndex(t => t.id === timelineStepId),
      newOrder,
    );
  }
  updateTimelineStep(timelineStepId, timelineStep) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    timeline.update(timelineStep);
  }
  addTimelineStepItem(timelineStepId, timelineItemId, timelineItem) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    return timeline.addTimelineItem(timelineItemId, timelineItem);
  }
  removeTimelineStepItem(timelineStepId, timelineItemId) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    timeline.removeTimelineItem(timelineItemId);
  }
  updateTimelineStepItem(timelineStepId, timelineItemId, timelineItem) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    timeline.updateTimelineItem(timelineItemId, timelineItem);
  }
  updateExtraRequirements(requirements: Requirements) {
    this.extraRequirements = requirements;
  }
}

export class TimelineStep {
  id: string;
  class: "TimelineStep";
  name: string;
  description: string;
  order: number;
  timelineItems: TimelineItem[];
  constructor(timelineStepId, params) {
    this.id = timelineStepId || uuid.v4();
    this.class = "TimelineStep";
    this.name = params.name || "Step";
    this.description = params.description || "";
    this.order = params.order || 0;
    this.timelineItems = [];
    if (params.timelineItems) {
      params.timelineItems.forEach(t => {
        if (!timelineStepId) t.id = uuid.v4();
        this.timelineItems.push(new TimelineItem(t.id, t));
      });
    }
  }
  update({name, description}) {
    if (name || name === "") this.name = name;
    if (description || description === "") this.description = description;
  }
  addTimelineItem(id, {name, type, event, args, delay}) {
    const item = new TimelineItem(id, {name, type, event, args, delay});
    this.timelineItems.push(item);
    return item.id;
  }
  removeTimelineItem(id) {
    this.timelineItems = this.timelineItems.filter(t => t.id !== id);
  }
  updateTimelineItem(id, timelineItem) {
    const timelineItemInst = this.timelineItems.find(t => t.id === id);
    timelineItemInst.update(timelineItem);
  }
  duplicateItem(timelineItemId) {
    const timelineItemInst = this.timelineItems.find(
      t => t.id === timelineItemId,
    );
    const id = uuid.v4();
    this.timelineItems.push(new TimelineItem(id, {...timelineItemInst}));
    return id;
  }
}

interface TimelineItemParams {
  id?: string;
  name?: string;
  type?: string;
  event?: string;
  args?: string;
  delay?: number;
  noCancelOnReset?: boolean;
}

export class TimelineItem {
  id: string;
  name: string;
  type: string;
  event: string;
  args: string;
  delay: number;
  noCancelOnReset: boolean;
  constructor(timelineItemId, params: TimelineItemParams = {}) {
    this.id = timelineItemId || uuid.v4();
    this.name = params.name || "Item";
    this.type = params.type || null;
    this.event = params.event || null;
    this.args = params.args || null;
    this.delay = params.delay || 0;
    this.noCancelOnReset = params.noCancelOnReset || false;
  }
  update({name, type, event, delay, args, noCancelOnReset}) {
    if (name) this.name = name;
    if (type) this.type = type;
    if (event) this.event = event;
    if (delay) this.delay = delay;
    if (args) this.args = args;
    if (noCancelOnReset || noCancelOnReset === false)
      this.noCancelOnReset = noCancelOnReset;
  }
}
