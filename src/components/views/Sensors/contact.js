import { Component } from 'react';
import { parse as parsePath } from 'extract-svg-path';
import assetPath from '../../../helpers/assets';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: null
    };
  }
  componentDidMount() {
    this.refreshContact(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.refreshContact(nextProps);
  }
  refreshContact(propsContact) {
    const { icon, destination } = propsContact;
    const iconUrl = assetPath(icon, 'default', 'svg', false);
    Promise.resolve()
      .then(() => {
        const { contact } = this.state;
        if (contact) {
          //Transfer over the information necessary.
          if (icon === contact.icon) {
            return Promise.resolve({
              ...propsContact,
              data: contact.data,
              destination: this.props.core ? contact.destination : destination,
              selected: contact.selected
            });
          } else {
            return fetch(iconUrl)
              .then(res => res.text())
              .then(svg => parsePath(svg))
              .then(data => {
                return Promise.resolve({
                  ...propsContact,
                  data,
                  selected: contact.selected
                });
              });
          }
        } else {
          //Get the SVG data
          return fetch(iconUrl)
            .then(res => res.text())
            .then(svg => parsePath(svg))
            .then(data => {
              return Promise.resolve({
                ...propsContact,
                data,
                selected: false
              });
            });
        }
      })
      .then(contact => {
        this.setState({
          contact
        });
      });
  }
}
