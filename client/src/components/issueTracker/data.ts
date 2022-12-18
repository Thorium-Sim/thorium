import {t} from "@server/newHelpers/liveQuery";
import {z} from "zod";
import fetch from "node-fetch";
import {capitalCase} from "change-case";
import pkg from "../../../../package.json";
const issuesUrl =
  "https://12usj3vwf1.execute-api.us-east-1.amazonaws.com/prod/issueTracker";
const version = pkg.version;

export const addGithubIssue = t.procedure
  .input(
    z.object({
      title: z.string(),
      body: z.string(),
      author: z.string(),
      priority: z.union([
        z.literal("high"),
        z.literal("medium"),
        z.literal("low"),
      ]),
      type: z.union([
        z.literal("type/bug"),
        z.literal("type/feature"),
        z.literal("type/card"),
        z.literal("type/question"),
        z.literal("type/enhancement"),
      ]),
    }),
  )
  .send(async ({input: {author, priority, body, title, type}}) => {
    // Create our body
    var postBody =
      `
       ### Requested By: ${author}
 
       ### Priority: ${capitalCase(priority)}
 
       ### Version: ${version}
     `
        .replace(/^\s+/gm, "")
        .replace(/\s+$/m, "\n\n") + body;

    var postOptions = {
      title,
      body: postBody,
      labels: [
        version.includes("beta") && "beta",
        `priority/${priority}`,
        type,
      ].filter(Boolean),
    };
    await fetch(issuesUrl, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(postOptions),
    });
  });
