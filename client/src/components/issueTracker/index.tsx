import {q} from "@client/context/AppContext";
import React, {FormEvent, useReducer} from "react";
import "./issueTracker.scss";

type IssueState = {
  type?:
    | "type/bug"
    | "type/feature"
    | "type/card"
    | "type/question"
    | "type/enhancement";
  priority?: "high" | "medium" | "low";
  title: string;
  body: string;
  author: string;
  reproduce?: string;
  uploading: boolean;
};
const defaultState: IssueState = {
  title: "",
  body: "",
  author: "",
  uploading: false,
};
type IssueActions =
  | {type: "reset"}
  | {type: "uploading"}
  | {type: "uploadComplete"; filename: string; url: string}
  | {type: "uploadFailed"}
  | {type: "value"; key: keyof IssueState; value: IssueState[keyof IssueState]};
function issueReducer(state: IssueState, action: IssueActions): IssueState {
  switch (action.type) {
    case "reset":
      return defaultState;
    case "value":
      return {...state, [action.key]: action.value};
    case "uploading":
      return {...state, uploading: true};
    case "uploadComplete":
      return {
        ...state,
        uploading: false,
        body: `${state.body || ""}
          
        ![${action.filename}](${action.url})`,
      };
    case "uploadFailed":
      return {...state, uploading: false};
    default:
      return state;
  }
}
const IssueTracker = ({close}: {close?: () => void}) => {
  const [state, dispatch] = useReducer(issueReducer, defaultState);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!state.type) return;
    if (!state.priority) return;
    if (state.uploading) return;

    const variables = {
      title: state.title,
      body:
        state.body +
        `
      
${
  state.reproduce
    ? `### Steps to Reproduce
${state.reproduce}`
    : ""
}`,
      author: state.author,
      type: state.type,
      priority: state.priority,
    };

    await q.addGithubIssue.netSend(variables);
    dispatch({type: "reset"});
    close?.();
  };

  return (
    <div id="issues-tracker">
      <div className="issues-body">
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Title</label>
            <input
              onChange={evt =>
                dispatch({type: "value", key: "title", value: evt.target.value})
              }
              required
              placeholder="Required"
              className="form-control form-control-sm"
            />
          </div>
          <div className="form-group">
            <label>Submitted By</label>
            <input
              onChange={evt =>
                dispatch({
                  type: "value",
                  key: "author",
                  value: evt.target.value,
                })
              }
              required
              placeholder="Your Name (email address optional) Eg. Alex (alex@fyreworks.us)"
              className="form-control form-control-sm"
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              onChange={evt =>
                dispatch({type: "value", key: "body", value: evt.target.value})
              }
              value={state.body}
              rows={5}
              placeholder={`Please be specific. Include as much detail as possible. ${
                state.type === "type/feature" ||
                state.type === "type/card" ||
                state.type === "type/enhancement"
                  ? "Can you tell me a story about a time that you wanted to do what your feature request outlines, and what you had to do instead?"
                  : ""
              } If you are filing a bug report, explain detailed steps to reproduce the bug. Include how you would want the bug to be fixed or the feature to be implemented. The more specific you are, the more likely the bug will be fixed or feature will be implemented. This field supports Markdown`}
              required
              className="form-control form-control-sm"
            />
          </div>
          {state.type === "type/bug" && (
            <div className="form-group">
              <label>Steps to Reproduce</label>
              <textarea
                onChange={evt =>
                  dispatch({
                    type: "value",
                    key: "reproduce",
                    value: evt.target.value,
                  })
                }
                rows={5}
                placeholder="Explain step-by-step what someone can do to reproduce this issue. If you can't provide step-by-step instructions, try recreating the bug yourself. Once you can reproduce the bug, submit an issue."
                required
                className="form-control form-control-sm"
              />
            </div>
          )}
          <div className="form-group">
            <label>Type</label>
            <select
              onChange={evt =>
                dispatch({type: "value", key: "type", value: evt.target.value})
              }
              required
              defaultValue={"select"}
              className="form-control form-control-sm"
            >
              <option disabled value="select">
                Select a Type
              </option>
              <option value="type/bug">Bug</option>
              <option value="type/feature">Feature Request</option>
              <option value="type/card">Card Request</option>
              <option value="type/question">Question</option>
              <option value="type/enhancement">Enhancement</option>
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              onChange={evt =>
                dispatch({
                  type: "value",
                  key: "priority",
                  value: evt.target.value,
                })
              }
              required
              defaultValue={"select"}
              className="form-control form-control-sm"
            >
              <option disabled value="select">
                Select a Priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="form-group submit-button">
            <button
              disabled={state.uploading}
              className="btn btn-sm btn-primary"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueTracker;
