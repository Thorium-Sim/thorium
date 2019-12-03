import {message, danger, fail, warn, markdown} from "danger";

const modifiedMD = danger.git.modified_files.join("- ");
message("Changed Files in this PR: \n - " + modifiedMD);

var errorCount = 0;

var bigPRThreshold = 600;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(":exclamation: Big PR (" + ++errorCount + ")");
  markdown(
    "> (" +
      errorCount +
      ") : Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.",
  );
}

if (danger.github.pr.body.length < 10) {
  fail("This pull request needs a description.");
}

if (!danger.github.pr.assignee) {
  const method = danger.github.pr.title.includes("WIP") ? warn : fail;
  method(
    "This pull request needs an assignee, and optionally include any reviewers.",
  );
}
