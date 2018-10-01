import uuid from "uuid";

class TaskTemplate {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
  }
}
class Task {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || "";
    this.systemId = params.systemId || "";
    this.deck = params.deck || "";
    this.room = params.room || "";

    // The static object which defines the values and
    // methods for the task
    this.generator = params.generator || "Generic";

    // The task template
    this.taskTemplate = params.taskTemplate || "";

    // Task parameters
    this.verified = params.verified || false;
  }
}
