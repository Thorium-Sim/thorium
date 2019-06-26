import React from "react";
import { Input, Button } from "helpers/reactstrap";
import * as Components from "./components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const style = {
  display: "flex",
  border: "solid 1px #333",
  minHeight: "50px",
  backgroundColor: "#030303",
  padding: "20px",
  margin: "20px"
};
export default class FormContainer extends React.Component {
  render() {
    const {
      type,
      title,
      description,
      id,
      i,
      length,
      updateForm,
      removeField,
      reorder
    } = this.props;
    const Comp = Components[type];
    if (!Comp) return null;
    return (
      <div style={style}>
        <div style={{ flex: 1 }}>
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
          <Button color={"danger"} outline onClick={() => removeField(id)}>
            Remove Field
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "0 5px"
          }}
        >
          {i !== 0 && <FaArrowUp onClick={() => reorder(-1)} />}
          {i + 1 !== length && <FaArrowDown onClick={() => reorder(1)} />}
        </div>
      </div>
    );
  }
}
