import uuid from 'uuid';
import { TimelineObject } from './timeline';

export default class Simulator extends TimelineObject {
  constructor(params) {
    super(params);
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Simulator';
    this.layout = params.layout || 'LayoutDefault';
    this.alertlevel = params.alertlevel || '5';
    this.template = params.template || false;
    this.class = 'Simulator';
    this.crewCount = params.crewCount || 50;
    // Initialize the simulator async
    setTimeout(() => {this.nextTimeline();}, 100);
  }
  rename(name) {
    this.name = name;
  }
  setAlertLevel(alertlevel) {
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
  setCrewCount(count) {
    this.crewCount = count;
  }
}
