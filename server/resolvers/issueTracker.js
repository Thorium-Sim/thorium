import request from 'request';

const issuesUrl = 'https://12usj3vwf1.execute-api.us-east-1.amazonaws.com/prod/issueTracker';

export const IssueTrackerMutations = {
  addIssue(rootValue, {title, body, person, priority, type}) {
    // Create our body
    var postBody = `${body}

### Requested By: ${person}

### Priority: ${priority}`;

    var postOptions = {
      title,
      body: postBody,
      type
    }
    request.post({url: issuesUrl, body: postOptions, json: true}, function(){})
  }
};