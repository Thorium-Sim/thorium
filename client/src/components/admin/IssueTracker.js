import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import "./issueTracker.scss";

class IssueTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _handleEvent(which, e) {
    const state = this.state;
    state[which] = e.target.value;
    this.setState(state);
  }

  _submit = e => {
    e.preventDefault();
    const mutation = gql`
      mutation IssueTracker(
        $title: String!
        $body: String!
        $person: String!
        $type: String!
        $priority: Int
      ) {
        addIssue(
          title: $title
          body: $body
          person: $person
          type: $type
          priority: $priority
        )
      }
    `;
    const variables = {
      title: this.state.title,
      body:
        this.state.body +
        `
      
${
  this.state.reproduce
    ? `### Steps to Reproduce
${this.state.reproduce}`
    : ""
}`,
      person: this.state.person,
      type: this.state.type,
      priority: this.state.priority
    };
    this.props.client.mutate({
      mutation,
      variables: { ...variables, priority: Number(variables.priority) }
    });
    this.setState({});
    this.props.close && this.props.close();
  };
  render() {
    return (
      <div id="issues-tracker">
        <div className="issues-body">
          <form onSubmit={this._submit}>
            <div className="form-group">
              <label>Title</label>
              <input
                onChange={this._handleEvent.bind(this, "title")}
                required
                placeholder="Required"
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group">
              <label>Submitted By</label>
              <input
                onChange={this._handleEvent.bind(this, "person")}
                required
                placeholder="Your Name (email address optional) Eg. Alex (alex@fyreworks.us)"
                className="form-control form-control-sm"
              />
            </div>
            <div className="form-group">
              <label>Body</label>
              <textarea
                onChange={this._handleEvent.bind(this, "body")}
                rows="5"
                placeholder="Please be specific. Include as much detail as possible. If you are filing a bug report, explain detailed steps to reproduce the bug. Include how you would want the bug to be fixed or the feature to be implemented. The more specific you are, the more likely the bug will be fixed or feature will be implemented. This field supports Markdown"
                required
                className="form-control form-control-sm"
              />
            </div>
            {this.state.type === "type/bug" && (
              <div className="form-group">
                <label>Steps to Reproduce</label>
                <textarea
                  onChange={this._handleEvent.bind(this, "reproduce")}
                  rows="5"
                  placeholder="Explain step-by-step what someone can do to reproduce this issue. If you can't provide step-by-step instructions, try recreating the bug yourself. Once you can reproduce the bug, submit an issue."
                  required
                  className="form-control form-control-sm"
                />
              </div>
            )}
            <div className="form-group">
              <label>Type</label>
              <select
                onChange={this._handleEvent.bind(this, "type")}
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
                onChange={this._handleEvent.bind(this, "priority")}
                required
                defaultValue={"select"}
                className="form-control form-control-sm"
              >
                <option disabled value="select">
                  Select a Priority
                </option>
                <option value="3">High</option>
                <option value="2">Medium</option>
                <option value="1">Low</option>
              </select>
            </div>
            <div className="form-group submit-button">
              <button className="btn btn-sm btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        <p>
          What can you do to get your issue report addressed sooner? If you have
          an urgent need or want to prioritize something, submit a{" "}
          <a
            href="https://thoriumsim.com/service/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Service Request Form
          </a>
          . If you know of developers who are capable of working on Thorium, you
          can point them at the{" "}
          <a
            href="https://github.com/thorium-sim/thorium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repository
          </a>
          . And if you have further questions, feel free to reach out on the{" "}
          <a
            href="https://discord.gg/UvxTQZz"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord Server
          </a>
          .
        </p>
      </div>
    );
  }
}

export default withApollo(IssueTracker);
