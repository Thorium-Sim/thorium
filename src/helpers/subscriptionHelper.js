import { Component } from "react";

class SubscriptionHelper extends Component {
  componentDidMount() {
    this.sub = this.props.subscribe();
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  render() {
    return this.props.children;
  }
}

export default SubscriptionHelper;
