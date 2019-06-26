import React from "react";
import PropTypes from "prop-types";
import RemoveLibraryEntry from "components/macros/removeLibraryEntry";

class LibraryEntry extends React.Component {
  render() {
    const { value = {}, updateValue = () => {} } = this.props;
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        onMouseDown={e => e.stopPropagation()}
      >
        <RemoveLibraryEntry
          updateArgs={(key, val) => updateValue({ ...value, [key]: val })}
          args={value}
        />
        <small>
          Library Entry Slug can be identified through the connection.
        </small>
      </div>
    );
  }
}

LibraryEntry.propTypes = {
  value: PropTypes.any,
  updateValue: PropTypes.func
};

export default {
  name: "removeLibraryEntry",
  category: "Actions",
  component: LibraryEntry,
  outputs: [],
  inputs: [
    {
      id: "trigger",
      color: "orange",
      title: "Triggers the action",
      type: "Trigger"
    },
    {
      id: "slug",
      color: "rebeccapurple",
      title: "The library entry slug",
      type: "Any"
    }
  ],
  config: []
};
