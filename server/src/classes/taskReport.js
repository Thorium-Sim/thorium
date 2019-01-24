import App from "../app";
import uuid from "uuid";
import Task from "./task";
import taskDefinitions from "../tasks";
import { titleCase } from "change-case";
import { randomFromList } from "./generic/damageReports/constants";

function fullType(type) {
  if (type === "default" || type === "damage" || type === "repair")
    return "Damage";
  if (type === "rnd") return "Research & Development";
  if (type === "engineering") return "Engineering";
  return titleCase(type);
}

function colloquialType(type) {
  if (type === "default" || type === "damage" || type === "repair")
    return "repair";
  if (type === "rnd") return "research and development";
  if (type === "engineering") return "engineering";
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
    this.tasks = params.tasks
      ? params.tasks.map(t => new Task(t))
      : TaskReport.generateReport(params);
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
      .filter(t => t.reportTypes.indexOf(type) > -1)

      // Get the task definition, and filter out any that are
      // not currently active.
      .map(({ definition, ...rest }) => ({
        ...rest,
        definition: taskDefinitions.find(d => d.name === definition)
      }))
      .filter(({ definition }) => definition.active({ simulator }));

    const requiredTemplates = taskTemplates.filter(s => s.required);
    const optionalTemplates = taskTemplates.filter(s => !s.required);
    let definitionTemplates = optionalTemplates.reduce((prev, next) => {
      prev[next.definition.name] = prev[next.definition.name]
        ? prev[next.definition.name].concat(next)
        : [next];
      return prev;
    }, {});

    const rooms = system
      ? App.rooms
          .filter(r => system.locations.indexOf(r.id) > -1)
          .map(r => r.id)
      : [];

    function createTask(template) {
      const { values, definition } = template;
      return new Task({
        definition: definition.name,
        simulatorId: simulator.id,
        // station,
        systemId: system && system.id,
        values: {
          ...values,
          system: system && system.id,
          room: randomFromList(rooms)
        }
      });
    }

    let tasks = [];

    // Here, I'm writing out the current damage report generation process
    // so I can more or less replicate it using tasks.

    // Report steps should be unique. That is, it shouldn't have more than one task of
    // a single definition, except in certain circumstances such as if there are
    // multiple required damage tasks.
    let existingSteps = requiredTemplates.length;

    // Remove power if the system has power
    if (
      system &&
      system.power &&
      system.power.powerLevels &&
      system.power.powerLevels.length > 0
    ) {
      tasks = tasks.concat(
        createTask({
          definition: { name: "Remove Power" },
          values: {
            preamble: `To properly complete the ${colloquialType(
              type
            )} of the #SYSTEMNAME system, power must be removed from the system.`,
            system: system && system.id
          }
        })
      );
      existingSteps += 1;
    }

    // Add in any required damage steps at the start
    tasks = tasks.concat(requiredTemplates.filter(s => !s.end).map(createTask));
    // Add in the optional steps

    // If there is a damage team task, add it first,
    // but only if there isn't already one from the required steps.
    if (
      !tasks.find(t => t.definition === "Send Damage Team") &&
      definitionTemplates["Send Damage Team"]
    ) {
      const template = randomFromList(definitionTemplates["Send Damage Team"]);
      tasks = tasks.concat(createTask(template));
      existingSteps += 1;
    }

    // Loop until we have the correct number of steps or run out of optional steps.
    const taskCount =
      (stepCount > Object.keys(definitionTemplates).length
        ? Object.keys(definitionTemplates).length
        : stepCount) - existingSteps;

    tasks = tasks.concat(
      Array(taskCount)
        .fill(0)
        .map(() => {
          const definition = randomFromList(Object.keys(definitionTemplates));
          const template = randomFromList(definitionTemplates[definition]);
          delete definitionTemplates[definition];
          // If it's another "Send Damage Team", add a step to clear the other team first.
          const otherTeam = tasks.find(
            t => t.definition === "Send Damage Team"
          );
          if (!otherTeam) return template;
          return [
            {
              definition: { name: "Wait For Team To Clear" },
              values: {
                preamble:
                  "The team that was sent needs time to complete their work.",
                teamName: otherTeam.values.teamName
              }
            },
            template
          ];
        })
        .reduce((prev, next) => prev.concat(next), [])
        .map(createTask)
    );

    // Add any required damage steps that specifically are assigned
    // to the end of the report.
    tasks = tasks.concat(requiredTemplates.filter(s => s.end).map(createTask));

    // Clear out any damage teams that don't have 'wait' tasks associated.
    tasks = tasks.concat(
      tasks
        .filter((t, i, arr) => {
          // Get the damage team tasks.
          if (t.definition !== "Send Damage Team") return false;

          // Get the tasks that don't have "Wait" tasks associated
          if (
            arr.find(
              tt =>
                tt.definition === "Wait For Team To Clear" &&
                tt.values.teamName === t.values.teamName
            )
          )
            return false;
          return true;
        })
        .map(t => ({
          definition: { name: "Wait For Team To Clear" },
          values: {
            preamble:
              "The team that was sent needs time to complete their work.",
            teamName: t.values.teamName
          }
        }))
        .map(createTask)
    );

    // Add power if the system has power.
    if (
      system &&
      system.power &&
      system.power.powerLevels &&
      system.power.powerLevels.length > 0
    ) {
      tasks = tasks.concat(
        createTask({
          definition: { name: "Restore Power" },
          values: {
            preamble: `To properly complete the ${colloquialType(
              type
            )} of the #SYSTEMNAME system, power must be restored to the system.`,
            system: system && system.id
          }
        })
      );
    }

    // Add the finishing task.
    // It is a reactivation code task if the report applies to a system, or
    // a generic task which says it's completed.
    // that task has a macro associated with it which is performed when
    // the task is completed.
    if (system) {
      tasks = tasks.concat(
        createTask({
          definition: { name: "Reactivation Code" },
          values: {
            preamble: `To complete this ${colloquialType(
              type
            )} report, a reactivation code must be accepted.`,
            system: system.id
          }
        })
      );
    } else {
      tasks = tasks.concat(
        createTask({
          definition: { name: "Generic" },
          values: {
            name: "Report Complete",
            message: `This ${colloquialType(type)} report is complete.`
          }
        })
      );
    }

    return tasks;
  }
}
