import uuid from "uuid";

export class TimelineObject {
  constructor(params) {
    this.timeline = [];
    if (params.timeline) {
      params.timeline.forEach(t => {
        this.timeline.push(new TimelineStep(t.id, t));
      });
    } else {
      this.timeline[0] = new TimelineStep(`${params.id}-initial`, {
        name: "Initialize",
        description: "Initializes the mission",
        order: 0,
        timelineitems: []
      });
    }
  }

  addTimelineStep({ name, description, order, timelineStepId, timelineItems }) {
    this.timeline.push(
      new TimelineStep(timelineStepId, {
        name,
        description,
        order,
        timelineItems
      })
    );
  }
  removeTimelineStep(timelineStepId) {
    this.timeline = this.timeline.filter(t => t.id !== timelineStepId);
  }
  duplicateTimelineStep(timelineStepId) {
    const timelineStep = this.timeline.find(t => t.id === timelineStepId);
    this.timeline.push(new TimelineStep(null, timelineStep));
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
      newOrder
    );
  }
  updateTimelineStep(timelineStepId, timelineStep) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    timeline.update(timelineStep);
  }
  addTimelineStepItem(timelineStepId, timelineItemId, timelineItem) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    timeline.addTimelineItem(timelineItemId, timelineItem);
  }
  removeTimelineStepItem(timelineStepId, timelineItemId) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    timeline.removeTimelineItem(timelineItemId);
  }
  updateTimelineStepItem(timelineStepId, timelineItemId, timelineItem) {
    const timeline = this.timeline.find(t => t.id === timelineStepId);
    timeline.updateTimelineItem(timelineItemId, timelineItem);
  }
}

export class TimelineStep {
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
  update({ name, description }) {
    if (name || name === "") this.name = name;
    if (description || description === "") this.description = description;
  }
  addTimelineItem(id, { name, type, event, args, delay }) {
    this.timelineItems.push(
      new TimelineItem(id, { name, type, event, args, delay })
    );
  }
  removeTimelineItem(id) {
    this.timelineItems = this.timelineItems.filter(t => t.id !== id);
  }
  updateTimelineItem(id, timelineItem) {
    const timelineItemInst = this.timelineItems.find(t => t.id === id);
    timelineItemInst.update(timelineItem);
  }
}

export class TimelineItem {
  constructor(timelineItemId, params = {}) {
    this.id = timelineItemId || uuid.v4();
    this.name = params.name || "Item";
    this.type = params.type || null;
    this.event = params.event || null;
    this.args = params.args || null;
    this.delay = params.delay || 0;
  }
  update({ name, type, event, delay, args }) {
    if (name) this.name = name;
    if (type) this.type = type;
    if (event) this.event = event;
    if (delay) this.delay = delay;
    if (args) this.args = args;
  }
}
