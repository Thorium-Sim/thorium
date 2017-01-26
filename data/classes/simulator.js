import uuid from 'uuid';

export default class Simulator {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Simulator';
    this.layout = params.layout || 'LayoutDefault';
    this.alertlevel = params.alertlevel || '5';
    this.timeline = {};
    if (params.timeline) {
      params.timeline.forEach(t => {
        this.timeline[t.order] = new TimelineStep(t);
      });
    } else {
      this.timeline[0] = new TimelineStep({
        name: 'Initialize',
        description: 'Initializes the simulator',
        order: 0,
        timelineitems: [],
      });
    }
    this.class = 'Simulator';
  }
  rename(name) {
    this.name = name;
  }
  setAlertlevel(alertlevel) {
    if (['5', '4', '3', '2', '1', 'p'].indexOf(alertlevel) === -1) {
      throw "Invalid Alert Level. Must be one of '5','4','3','2','1','p'";
    }
    this.alertlevel = alertlevel;
  }
  setLayout(layout) {
    // TODO: Validate this layout against the available layouts
    // This would require the front-end modules being available
    // To the server
    this.layout = layout;
  }
  addTimelineStep({name, description, order}){

  }
  removeTimelineStep(timelineStepId){

  }
  reorderTimelineStep(timelineStepId, newOrder){

  }
  addTimelineStepItem(timelineStepId, timelineItem){

  }
  removeTimelineStepItem(timelineStepId, timelineItemName){

  }
  updateTimelineStepItem(timelineStepId, timelineItemName, timelineItem){

  }
  test(param) {
    this.digest('test', param);
    this.emit('tested', param, this);
  }

}

export class TimelineStep {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = 'TimelineStep';
    this.name = params.name || 'Step';
    this.description = params.description || 'A timeline step';
    this.order = params.order || 0;
    this.timelineItems = [];
    if (params.timelineItems) {
      params.timelineItems.forEach(t => {
        this.timelineItems.push(new TimelineItem(t));
      });
    }
  }
  addTimelineItem({name, type, mutation, args, delay}){

  }
  removeTimelineItem(name){

  }
  updateTimelineItem(timelineItemName, timelineItem){

  }
}

export class TimelineItem {
  constructor(params) {
    this.name = params.name || 'Item';
    this.type = params.type || null;
    this.mutation = params.mutation || null;
    this.args = params.args || null;
    this.delay = params.delay || 0;
  }
  update({name, type, mutation, delay, args}){
    
  }
}

/* {
    id = ,
    name = 'Voyager',
    layout = 'LayoutDefault',
    alertlevel = '5',
    timeline: [],
  }*/
