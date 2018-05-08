import React from "react";
import { Input } from "reactstrap";
import * as Components from "./components";

const style = {
  border: "solid 1px #333",
  minHeight: "50px",
  backgroundColor: "#030303",
  padding: "20px",
  margin: "20px"
};
export default class FormContainer extends React.Component {
  render() {
    const { type, title, description, id, updateForm } = this.props;
    const Comp = Components[type];
    if (!Comp) return null;
    return (
      <div style={style}>
        <Input
          value={title}
          placeholder="Title goes here"
          onChange={e => updateForm(id, "title", e.target.value)}
        />
        <Input
          type="textarea"
          value={description}
          placeholder="Description goes here"
          onChange={e => updateForm(id, "description", e.target.value)}
        />
        <Comp {...this.props} disabled />
      </div>
    );
  }
}
