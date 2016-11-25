import uuid from 'uuid';

export default class Simulator {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name;
    this.layout = params.layout;
    this.alertlevel = params.alertlevel;
    this.timeline = params.timeline;
    this.class = 'Simulator';
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
  test(param) {
    this.digest('test', param);
    this.emit('tested', param, this);
  }

}


/* {
    id = ,
    name = 'Voyager',
    layout = 'LayoutDefault',
    alertlevel = '5',
    timeline: [],
  }*/
