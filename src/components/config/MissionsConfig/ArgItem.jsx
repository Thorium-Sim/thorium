import React, { Component } from 'react';
import { Button, FormGroup, Label, Input, Card, CardBlock } from 'reactstrap';
import gql from 'graphql-tag';
import FontAwesome from 'react-fontawesome';
import LayoutList from '../../layouts';

export default class ArgItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {}
    };
    this.Layouts = Object.keys(LayoutList);
  }
  componentWillMount(){
    if (this.props.arg){
      if (this.props.arg.query){
        this.props.client.query({
          query: gql`
          query ArgQuery {
            ${this.props.arg.query}
          }
          `
        }).then((res) => {
          this.setState({
            data: res.data,
          });
        });
      }
    }
  }
  _handleArg(e){
    this.props.handleArg(e.target.value);
  }
  _handleArrayObj(key, i, e){
    const arr = [].concat(this.props.arg.argument);
    arr[i][key] = e.target.value;
    this.props.handleArg(arr);
  }
  _removeArgItem(i){
    const arr = [].concat(this.props.arg.argument);
    arr.splice(0,i);
    this.props.handleArg(arr);
  }
  _addArgItem(){
    const arr = [].concat(this.props.arg.argument);
    arr.push(this.props.arg.object);
    this.props.handleArg(arr);
  }
  render(){
    const arg = this.props.arg;
    if (!arg.type) return null;
    switch(arg.type){
      case "select":
      if (arg.enum){
        return (
          <FormGroup>
          <Label>{arg.content}</Label>
          <Input type="select" value={arg.argument} onChange={this._handleArg.bind(this)} className="c-select form-control">
          <option value={null}>Select An Option</option>
          {
            arg.enum.map((data) => {
              return <option key={data} value={data}>{data}</option>;
            })
          }
          </Input>
          </FormGroup>
          );
      }
      if (arg.varName){
        return ( <FormGroup>
          <Label>{arg.content}</Label>
          <Input type="select" value={arg.argument} onChange={this._handleArg.bind(this)} className="c-select form-control">
          <option value={null}>Select An Option</option>
          {
            this[arg.varName].map((data) => {
              return <option key={data} value={data}>{data}</option>;
            })
          }
          </Input>
          </FormGroup>
          );
      }
      return (
        <FormGroup>
        <Label>{arg.content}</Label>
        <Input type="select" value={arg.argument} onChange={this._handleArg.bind(this)} className="c-select form-control">
        <option value={null}>Select An Option</option>
        {
          this.state.data[arg.queryName] && this.state.data[arg.queryName].map((data) => {
            return <option key={data[arg.key]} value={data[arg.key]}>{data[arg.value]}</option>;
          })
        }
        </Input>
        </FormGroup>
        );
      case "text":
      return (
        <FormGroup>
        <Label>{arg.content}</Label>
        <Input type="text" value={arg.argument} onChange={this._handleArg.bind(this)} />
        </FormGroup>
        );
      case "number":
      return (
        <FormGroup>
        <Label>{arg.content}</Label>
        <Input type="number" value={arg.argument} onChange={this._handleArg.bind(this)} />
        </FormGroup>
        );
      case "objectarray":
      arg.argument = arg.argument || [];
      return (
        <div>
        <label>{arg.content}</label>
        {arg.argument.map((a, i) => 
          <Card>
          <CardBlock>
          <FontAwesome name="ban" className="text-danger" onClick={this._removeArgItem.bind(this, i)} />
          {Object.keys(arg.object).map((key) => (
            <FormGroup>
            <Label>{key}</Label>
            <Input type="text" value={a[key]} onChange={this._handleArrayObj.bind(this, key, i)} />
            </FormGroup>
            ))}
          </CardBlock>
          </Card>)}
        <Button color="success" onClick={this._addArgItem.bind(this)}>Add Item</Button>
        </div>
        );
      default:
      return <p key={arg.name}>{`${arg.name} - ${arg.content}`}</p>;
    }
  }
}