import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, Label } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import ArgItem from './ArgItem';

class MacroConfig extends Component {
  constructor(props) {
    super(props);
    let args = {};
        // Parse the JSON prop
        try {
          args = JSON.parse(props.args);
        } catch(err) {
          console.error("Invalid Args:", props.args, err);
        }
        this.state = {
          mutationArgs: args ? args : {}
        };
      }
      componentWillReceiveProps(nextProps) {
        let args = {};
        try {
          args = JSON.parse(nextProps.args);
        } catch(err) {
          console.error("Invalid Args:", nextProps.args, err);
        }
        this.setState({
          mutationArgs: args ? args : {}
        })
      }
      _handleChange(e){
        this.props.updateMacro('event', e.target.value);
      }
      _handleArg(name, value){
        let {mutationArgs} = this.state;
        mutationArgs[name] = value;

        // Stringify it so it can be sent to the server
        this.props.updateMacro('args', JSON.stringify(mutationArgs))
      }
      /*runMacro(){
        const macroMutation = gql`mutation ExecuteMacro {
          ${this.state.selectedMutation}(${Object.keys(this.state.mutationArgs).map((arg) => {
            return `${arg}: "${this.state.mutationArgs[arg]}"`;
          })})
        }`;
        this.props.client.mutate({
          mutation: macroMutation
        });
      }*/
      render(){
        let data;
        if (!this.props.data.loading){
          data = this.props.data.__schema.mutationType.fields;
        }
        return <Row>
        <Col sm="12">
        {this.props.data.loading ? "Loading..." :
        <FormGroup>
        <Label>Item Event</Label>
        <select value={this.props.event} onChange={this._handleChange.bind(this)} name="mutations" className="c-select form-control">
        <option>Select an event</option>
        {
          data.filter((mutation) => {
            return mutation.description.substr(0,5) === 'Macro';
          }).map((type) => {
            return <option key={type.name} value={type.name}>{type.description}</option>;
          })
        }
        </select>
        </FormGroup>
      }
      {this.props.event && data && <div>
        {
          data.find(n => n.name  === this.props.event)
          .args.map((arg) => {
            let argData = {};
            try{
              if (arg.description){
                argData = JSON.parse(arg.description);
              }
            } catch(e){
              argData.content = arg.description;
            }
            argData.name = arg.name;
            if (this.state.mutationArgs[argData.name]) {
              argData.argument = this.state.mutationArgs[argData.name];
            }
            return <ArgItem key={arg.name} handleArg={this._handleArg.bind(this, arg.name)} arg={argData} client={this.props.client} />;
          })
        }
      {/*<Button color="primary" onClick={this.runMacro.bind(this)}>Run Macro</Button>*/}
      </div>
    }
    </Col>
    </Row>;
  }
}

const MacroConfigQuery = gql `
query IntrospectionQuery {
  __schema {
    mutationType {
      name
      description
      fields {
        name
        description
        isDeprecated
        deprecationReason
        args {
          name
          description
          defaultValue
        }
      }
    }
  }
}
`;

export default graphql(MacroConfigQuery, {})(withApollo(MacroConfig));
