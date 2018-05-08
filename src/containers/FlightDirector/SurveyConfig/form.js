import React, { Component } from "react";
import uuid from "uuid";
import { Button } from "reactstrap";
import FormAdder from "./form-adder";
import FormContainer from "./form-container";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.form,
      edited: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      form: nextProps.form,
      edited: false
    });
  }
  addForm = type => {
    this.setState({
      form: this.state.form.concat({
        id: uuid.v4(),
        type,
        title: `Form ${type}`,
        description: "",
        options: [{ id: uuid.v4(), label: "Option 1" }],
        min: 1,
        max: 5
      }),
      edited: true
    });
  };
  updateForm = (id, which, value) => {
    this.setState({
      form: this.state.form.map(f => {
        if (f.id === id) {
          return { ...f, [which]: value };
        }
        return f;
      }),
      edited: true
    });
  };
  render() {
    const { form, edited } = this.state;
    const { saveForm } = this.props;
    return (
      <div style={{ height: "80vh", overflowY: "auto" }}>
        {form.map(f => (
          <FormContainer {...f} key={f.id} updateForm={this.updateForm} />
        ))}
        <Button
          color={edited ? "warning" : "success"}
          disabled={!edited}
          outline
          onClick={() => saveForm(form)}
        >
          {edited ? "Save Form" : "Saved!"}
        </Button>
        <FormAdder addForm={this.addForm} />
      </div>
    );
  }
}

export default Form;
