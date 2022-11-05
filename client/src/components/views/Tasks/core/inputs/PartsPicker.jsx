import React, {Component} from "react";
import {Button} from "helpers/reactstrap";
import {Query} from "@apollo/client/react/components";
import gql from "graphql-tag";
import {randomFromList} from "helpers/randomFromList";
import {FaBan} from "react-icons/fa";

class PartsPicker extends Component {
  state = {parts: this.props.value || []};
  componentDidUpdate(prevProps, prevState) {
    if (prevState && prevState.parts.join("") !== this.state.parts.join("")) {
      this.props.onChange(this.state.parts);
    }
  }
  setParts = (part, i) =>
    this.setState(state => ({
      parts: state.parts.map((p, ii) => (i === ii ? part : p)),
    }));
  render() {
    const {parts} = this.state;
    return (
      <Query
        query={gql`
          query ExocompParts {
            exocompParts
          }
        `}
      >
        {({loading, data}) => {
          if (!data || loading) return null;
          const {exocompParts} = data;
          return (
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
                  <FaBan
                    className="text-danger"
                    onClick={() =>
                      this.setState(state => ({
                        parts: state.parts.filter((_, ii) => i !== ii),
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
                    parts: state.parts.concat(randomFromList(exocompParts)),
                  }))
                }
              >
                Add Part
              </Button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default PartsPicker;
