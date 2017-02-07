import React, { Component } from 'react';
import LayoutList from '../../layouts';
import { FormGroup, Label, Input } from 'reactstrap';
import gql from 'graphql-tag';

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
          default:
          return <p key={arg.name}>{`${arg.name} - ${arg.content}`}</p>;
        }
      }
    }