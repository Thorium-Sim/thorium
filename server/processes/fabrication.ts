import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import {deliverFabricationJob} from "../events/fabrication";

// Finished and cancelled jobs stay visible for a while so the crew can see
// what was delivered, then get swept away automatically.
const FINISHED_JOB_RETENTION = 1000 * 60 * 10;

function processFabrication() {
  const runningSimulators = App.flights
    .filter(f => f.running === true)
    .reduce((prev: string[], f) => prev.concat(f.simulators), []);

  let ticked = false;
  App.fabricationJobs.forEach(job => {
    if (job.status !== "active") return;
    if (!runningSimulators.includes(job.simulatorId)) return;
    job.tick(1);
    ticked = true;
    if (job.elapsed >= job.duration) {
      // Publishes job and inventory updates itself
      deliverFabricationJob(job);
    }
  });

  const now = Date.now();
  const swept = App.fabricationJobs.filter(
    j =>
      j.status === "active" ||
      !j.completedTime ||
      now - j.completedTime < FINISHED_JOB_RETENTION,
  );
  const sweptAny = swept.length !== App.fabricationJobs.length;
  App.fabricationJobs = swept;

  if (ticked || sweptAny) {
    pubsub.publish("fabricationJobsUpdate", App.fabricationJobs);
  }
  setTimeout(processFabrication, 1000);
}

processFabrication();
