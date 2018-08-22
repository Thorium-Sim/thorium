import React, { Component } from "react";
import gql from "graphql-tag";
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

  _submit() {
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
    const variables = this.state;
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({});
    this.props.close && this.props.close();
  }
  render() {
    return (
      <div id="issues-tracker">
        <div className="issues-body">
          <form>
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
                placeholder="Please be specific. Include as much detail as possible. The more specific you are, the more likely the bug will be fixed or feature will be implemented. This field supports Markdown"
                required
                className="form-control form-control-sm"
              />
            </div>
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
                <option value="bug">Bug</option>
                <option value="feature">Feature Request</option>
                <option value="card">Card Request</option>
                <option value="question">Question</option>
                <option value="enhancement">Enhancement</option>
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
              <button
                onClick={this._submit.bind(this)}
                className="btn btn-sm btn-primary"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withApollo(IssueTracker);
