import React, { Component } from "react";
import uuid from "uuid";
import { Button } from "reactstrap";
import FormAdder from "./form-adder";
import FormContainer from "./form-container";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: props.form || {},
      edited: false
    };
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.form) !== JSON.stringify(this.props.form)) {
      this.setState({
        form: this.props.form,
        edited: false
      });
    }
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
    this.setState(state => ({
      form: state.form.map(f => {
        if (f.id === id) {
          return { ...f, [which]: value };
        }
        return f;
      }),
      edited: true
    }));
  };
  removeField = id => {
    this.setState(state => ({
      form: state.form.filter(f => f.id !== id)
    }));
  };
  reorder = (index, direction) => {
    function move(array, old_index, new_index) {
      if (new_index >= array.length) {
        var k = new_index - array.length;
        while (k-- + 1) {
          array.push(undefined);
        }
      }
      array.splice(new_index, 0, array.splice(old_index, 1)[0]);
      return array; // for testing purposes
    }
    let form = this.state.form.concat();
    move(form, index, index + direction);
    this.setState({ form, edited: true });
  };
  render() {
    const { form, edited } = this.state;
    const { saveForm } = this.props;
    return (
      <div style={{ height: "80vh", overflowY: "auto" }}>
        {form.map((f, i) => (
          <FormContainer
            {...f}
            key={f.id}
            i={i}
            length={form.length}
            updateForm={this.updateForm}
            removeField={this.removeField}
            reorder={sign => this.reorder(i, sign)}
          />
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
