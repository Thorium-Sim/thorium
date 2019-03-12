import React, { Component } from "react";
import { Button } from "reactstrap";
import { Query } from "react-apollo";
import gql from "graphql-tag.macro";
import { randomFromList } from "helpers/randomFromList";
import FontAwesome from "react-fontawesome";

class PartsPicker extends Component {
  state = { parts: this.props.value || [] };
  componentDidUpdate(prevProps, prevState) {
    if (prevState && prevState.parts.join("") !== this.state.parts.join("")) {
      this.props.onChange(this.state.parts);
    }
  }
  setParts = (part, i) =>
    this.setState(state => ({
      parts: state.parts.map((p, ii) => (i === ii ? part : p))
    }));
  render() {
    const { parts } = this.state;
    return (
      <Query
        query={gql`
          query ExocompParts {
            exocompParts
          }
        `}
      >
        {({ loading, data: { exocompParts } }) =>
          loading ? null : (
            <div>
              {parts.map((p, i) => (
                <div key={`${p}-${i}`}>
                  <select
                    value={p}
                    onChange={e => this.setParts(e.target.value, i)}
                  >
                    {exocompParts.map(e => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  <FontAwesome
                    name="ban"
                    className="text-danger"
                    onClick={() =>
                      this.setState(state => ({
                        parts: state.parts.filter((_, ii) => i !== ii)
                      }))
                    }
                  />
                </div>
              ))}
              <Button
                color="success"
                size="sm"
                onClick={() =>
                  this.setState(state => ({
                    parts: state.parts.concat(randomFromList(exocompParts))
                  }))
                }
              >
                Add Part
              </Button>
            </div>
          )
        }
      </Query>
    );
  }
}

export default PartsPicker;
