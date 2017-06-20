import uuid from 'uuid';
import { mutationMap } from '../resolvers';


export class TimelineObject {
  constructor(params) {
    this.timeline = [];
    this.timelineStep = params.timelineStep || -1; // 0 is the init step, so -1 is before that.
    if (params.timeline) {
      params.timeline.forEach(t => {
        this.timeline.push(new TimelineStep(t.id, t));
      });
    } else {
      console.log(params)
      this.timeline[0] = new TimelineStep(`${params.id}-initial`, {
        name: 'Initialize',
        description: 'Initializes the mission',
        order: 0,
        timelineitems: [],
      });
    }
  }

  addTimelineStep({ name, description, order, timelineStepId, timelineItems }) {
    this.timeline.push(new TimelineStep(timelineStepId, { name, description, order, timelineItems }));
  }
  removeTimelineStep(timelineStepId) {
    this.timeline = this.timeline.filter(t => t.id !== timelineStepId);
  }
  reorderTimelineStep(timelineStepId, newOrder) {
    // Go through each timeline step in the timeline.
    // If it is less than newOrder, do nothing
    // If it is greater than newOrder, add 1 to the order.
    // Then sort it.
    this.timeline = this.timeline.map(t => {
      const newT = t;
      if (newT.order >= newOrder) newT.order += 1;
      if (newT.id === timelineStepId) newT.order = newOrder;
      return newT;
    }).sort((a, b) => {
      if (a.order > b.order) return 1;
      if (b.order > a.order) return -1;
      return 0;
    });
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
  nextTimeline(noExecute) {
    this.timelineStep += 1;
    if (!noExecute) {
      if (this.timeline[this.timelineStep]) {
        this.triggerTimelineStep(this.timeline[this.timelineStep].id);
      }
    }
  }
  triggerTimelineStep(timelineStepId) {
    // Trigger the event for the timeline step id.
    // We'll use the resolver functions for this.
    const timelineStep = this.timeline.find(t => t.id === timelineStepId);
    timelineStep.timelineItems.forEach(i => {
      // Execute the timeline item.
      const args = JSON.parse(i.args) || {};
      if (this.class === 'Simulator') {
        args.simulatorId = this.id;
      }
      if (this.class === 'Mission') {
        args.missionId = this.id;
      }
      if (this.class === 'Flight') {
        args.flightId = this.id;
      }
      mutationMap[i.event]({}, args, {clientId: 'timeline'});
    });
  }
}

export class TimelineStep {
  constructor(timelineStepId, params) {
    this.id = timelineStepId || uuid.v4();
    this.class = 'TimelineStep';
    this.name = params.name || 'Step';
    this.description = params.description || 'A timeline step';
    this.order = params.order || 0;
    this.timelineItems = [];
    if (params.timelineItems) {
      params.timelineItems.forEach(t => {
        this.timelineItems.push(new TimelineItem(t.id, t));
      });
    }
  }
  update({ name, description }) {
    if (name) this.name = name;
    if (description) this.description = description;
  }
  addTimelineItem(id, { name, type, event, args, delay }) {
    this.timelineItems.push(new TimelineItem(id, { name, type, event, args, delay }));
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
  constructor(timelineItemId, params) {
    this.id = timelineItemId || uuid.v4();
    this.name = params.name || 'Item';
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
