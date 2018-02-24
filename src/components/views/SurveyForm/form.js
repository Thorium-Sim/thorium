import React, { Component } from "react";

class Form extends Component {
  render() {
    const { form } = this.props;
    return <div>{form.title}</div>;
  }
}

export default Form;
