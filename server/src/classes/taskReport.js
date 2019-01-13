import App from "../app";
import uuid from "uuid";

export default class TaskReport {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "TaskReport";
    this.simulatorId = params.simulatorId || null;
    this.systemId = params.systemId || null;
    this.type = params.type || "default";
    this.stepCount = params.stepCount || 8;
    this.name = params.name || "Task Report";
    // Generate the report from the task templates when the task report is created
    // Tasks is a list of task IDs for tasks that are stored in App.tasks
    this.tasks = params.tasks || TaskReport.generateReport(params);
  }
  static generateReport({
    simulatorId,
    systemId,
    stepCount = 8,
    type = "default"
  }) {
    const simulator = App.simulators.find(s => s.id === simulatorId);
    if (!simulator) return [];

    const system = App.systems.find(s => s.id === systemId);
    const taskTemplates = simulator.damageTasks
      .concat(system ? system.damageTasks : [])
      .map(t => ({
        ...t,
        ...App.taskTemplates.find(tt => t.id === tt.id),
        nextSteps: t.nextSteps.map(n =>
          App.taskTemplates.find(tt => n === tt.id)
        )
      }))
      // Filter out the templates that don't correspond with this report
      .filter(t => t.reportTypes.indexOf(type) > -1);
  }
}
