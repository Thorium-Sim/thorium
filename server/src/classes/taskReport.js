import App from "../app";
import uuid from "uuid";
import taskDefinitions from "../tasks";
import { titleCase } from "change-case";

function fullType(type) {
  if (type === "default" || type === "damage" || type === "repair")
    return "Damage";
  if (type === "rnd") return "Research & Development";
  if (type === "engineering") return "Engineering";
  return titleCase(type);
}

export default class TaskReport {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "TaskReport";
    this.simulatorId = params.simulatorId || null;
    this.systemId = params.systemId || null;
    this.type = params.type || "default";
    this.stepCount = params.stepCount || 8;
    this.name = params.name || `${fullType} Report`;
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

    const rooms = system
      ? App.rooms.filter(r => system.locations.indexOf(r.id) > -1)
      : [];

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
      .filter(t => t.reportTypes.indexOf(type) > -1)

      // Get the task definition, and filter out any that are
      // not currently active.
      .map(({ definition, ...rest }) => ({
        ...rest,
        definition: taskDefinitions.find(d => d.name === definition)
      }))
      .filter(({ definition }) => definition.active({ simulator }));

    console.log(simulator);
    console.log();
    console.log(system);
    console.log();
    console.log(taskTemplates);
    console.log();
    console.log();

    // Here, I'm writing out the current damage report generation process
    // so I can more or less replicate it using tasks.

    // Report steps should be unique. That is, it shouldn't have more than one task of
    // a single definition, except in certain circumstances such as if there are
    // multiple required damage tasks.

    // Remove power if the system has power
    // Add in any required damage steps at the start

    // Add in the optional steps

    // If there is a damage team task, add it first.

    // Add a 'wait for damage team' task as a generic task
    // later on in the report.

    // If there has already been a damage team task
    // (including the 'wait for damage team' task),
    // and another damage team task shows up, add a
    // cleanup task.

    // Add any required damage steps that specifically are assigned
    // to the end of the report.

    // Clear out any damage teams that don't have 'wait' tasks associated.

    // Add power if the system has power.

    // Add the finishing task, which is a reactivation code task.
    // that task has a macro associated with it which is performed when
    // the task is completed.
  }
}
