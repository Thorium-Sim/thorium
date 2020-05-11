import Task from "./task";
import uuid from "uuid";
import App from "../app";

class TaskFlowStep {
  id: string;
  name: string;
  tasks: Task[];
  activeTaskIds: string[];
  completeAll: boolean;
  constructor(params: Partial<TaskFlowStep> = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Flow Step";
    this.tasks = params.tasks ? params.tasks.map(t => new Task(t)) : [];
    this.activeTaskIds = params.activeTaskIds || [];
    this.completeAll = params.completeAll ?? true;
  }
  get activeTasks() {
    return this.activeTaskIds.map(t => App.tasks.find(tt => tt.id === t));
  }
  get completed() {
    let completed = false;
    if (this.completeAll) {
      // If we can't find any non-verified tasks, the step is completed
      completed = !this.tasks.find(t => t.verified === false);
    } else {
      // If any task is verified, the step is completed
      completed = !!this.tasks.find(t => t.verified);
    }
    return completed;
  }
  rename(name: string) {
    this.name = name;
  }
  addTask(task: Task) {
    this.tasks.push(new Task(task));
  }
  editTask(id: string, task: Task) {
    // Tasks don't edit in place well, so we'll just replace the old one wholesale
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    this.tasks[taskIndex] = new Task({...task, id});
  }
  removeTask(id: string) {
    this.tasks = this.tasks.filter(s => s.id !== id);
  }
  setCompleteAll(completeAll: boolean) {
    this.completeAll = completeAll;
  }
}
export class TaskFlow {
  id: string;
  class: "TaskFlow" = "TaskFlow";
  simulatorId: string;
  name: string;
  currentStep: number;
  steps: TaskFlowStep[];
  constructor(params: Partial<TaskFlow> = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || "Task Flow";
    this.currentStep = params.currentStep || 0;
    this.steps = params.steps ? params.steps.map(s => new TaskFlowStep(s)) : [];
  }
  get completed() {
    return this.currentStep >= this.steps.length - 1;
  }
  advance() {
    // Check if all of the tasks have been completed.
    const currentStep = this.steps[this.currentStep];

    if (!currentStep.completed) return;

    // Increment the current step, assign the next task,
    // and then publish the results.
    this.currentStep++;
    const step = this.steps[this.currentStep];
    step.tasks.forEach(t => {
      App.handleEvent({simulatorId: this.simulatorId, taskInput: t}, "addTask");
    });
  }
  setName(name: string) {
    this.name = name;
  }
  addStep(name: string) {
    this.steps.push(new TaskFlowStep({name}));
  }
  removeStep(id: string) {
    this.steps = this.steps.filter(s => s.id !== id);
  }
  renameStep(id: string, name: string) {
    this.steps.find(s => s.id === id)?.rename(name);
  }
  addTask(id: string, task: Task) {
    this.steps.find(s => s.id === id)?.addTask(task);
  }
  removeTask(id: string, taskId: string) {
    this.steps.find(s => s.id === id)?.removeTask(taskId);
  }
  editTask(id: string, taskId: string, task: Task) {
    this.steps.find(s => s.id === id)?.editTask(taskId, task);
  }
  setCompleteAll(id: string, completeAll: boolean) {
    this.steps.find(s => s.id === id)?.setCompleteAll(completeAll);
  }
}
