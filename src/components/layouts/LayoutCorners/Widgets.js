import React, {Component} from 'react';
import { Tooltip, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Widgets } from '../../views';
import FontAwesome from 'react-fontawesome';

const WidgetsContainer = (props) => {
  return (
    <div className="widgets">
    {Object.keys(Widgets).map(key => {
      const widget = Widgets[key];
      return <Widget simulator={props.simulator} station={props.station}  widget={widget} wkey={key} key={key} />
    })}
    </div>
    );
}

class Widget extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      tooltipOpen: false,
      modal: false

    };
  }
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    const {widget, wkey} = this.props;
    const Component = widget.widget;
    return <div className="widget-item" onClick={this.toggleModal}>
    <FontAwesome size='lg' fixedWidth name={widget.icon} className="widget-icon" id={`widget-${wkey}`} style={{color: widget.color || 'rgb(200,150,255)'}} />
    <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={`widget-${wkey}`} toggle={this.toggle}>
    {widget.name}
    </Tooltip>
    { this.state.modal && <Modal className="modal-themed" isOpen={this.state.modal} toggle={this.toggleModal}>
    <ModalHeader toggle={this.toggleModal}>{widget.name}</ModalHeader>
    <ModalBody>
    <Component toggle={this.toggleModal} simulator={this.props.simulator} station={this.props.station} />
    </ModalBody>
    </Modal>
  }
  </div>
}
}


export default WidgetsContainer;