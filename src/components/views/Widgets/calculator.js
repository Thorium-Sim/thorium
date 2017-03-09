import React from 'react';
import './calculator.scss';

export default class Calculator extends React.Component{
  constructor(){
    super();
    this.state={
      displayVal: "0",
      calcVals: []
    };
  }
  _displayNum(num){
    if(this.state.displayVal.length > 19) { // Where var too long for display
      return;
    } else if(this.state.displayVal === "0" || this.state.displayVal === "Undefined! 😫") { // Where var is 0, or where result is undefined
      this.setState({
        displayVal: num
      });
    } else if(this.state.displayVal.charAt(0) === "-" && this.state.displayVal.charAt(1) === "0") { // Fix to allow user to add - sign while displayed value is still 0
      this.setState({
        displayVal: `-${num}`
      });
    } 
    else {
      this.setState({
        displayVal: this.state.displayVal + num
      });
    }
  }
  _clearVals(){
    this.setState({
      displayVal: "0",
      calcVals: []
    });
  }
  _insDecimal(){
    if (this.state.displayVal.length > 19) {
      return;
    } else if (this.state.displayVal.indexOf(".") === -1) {
      this.setState({
        displayVal: this.state.displayVal + "."
      })
    } else {
      return;
    }
  }
  _swapSign(){
    const char = this.state.displayVal.charAt(0);
    if(char === "-") {
      this.setState({
        displayVal: this.state.displayVal.slice(1)
      });
    } else {
      this.setState({
        displayVal: "-" + this.state.displayVal
      });
    }
  }
  _addToCalc(oper){
    const currentVal = parseFloat(this.state.displayVal),
        calc = {
          val: currentVal,
          sign: oper
        },
        vals = [...this.state.calcVals];
    vals.push(calc);
    this.setState({
      displayVal: "0",
      calcVals: vals
    });
  }
  _calcResult(oper){
    const valsToCalc = [...this.state.calcVals],
        currentVal = parseFloat(this.state.displayVal);
    let result = 0;
    // Add current value to array
    valsToCalc.push({val: currentVal, sign: oper});
    for(let i = 0, x = valsToCalc.length; i < x; i++){
      // For first iteration, set result = to first value
      // This is so we can do sums between current and previous loop iteration
      if(i === 0) {
        result = valsToCalc[i].val;
      } else {
        // Referencing the previous iteration's sign
        switch(valsToCalc[i - 1].sign){
          case "+":
            result += valsToCalc[i].val;
            break;
          case "-":
            result -= valsToCalc[i].val;
            break;
          case "*":
            result *= valsToCalc[i].val;
            break;
          case "/":
            result /= valsToCalc[i].val;
            break;
          default:
            console.log("Something went wrong...");
        }
      }
    }
    // Catch if user divides by 0
    if(isNaN(result) || result === Infinity) {
      result = "Undefined! 😫";
    } else {
      result = result.toString();
    }
    // Set result on state
    this.setState({
      displayVal: result,
      calcVals: []
    });
  }
  render(){
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
          operations = ['+', '-', '*', '/', '='],
          functions = ['c', '±', '.'];
    return(
      <div className="calculator">
        <Display
          displayVal={this.state.displayVal}
        />
        <Functions 
          functions={functions}
          _clearVals={this._clearVals.bind(this)}
          _insDecimal={this._insDecimal.bind(this)}
          _swapSign={this._swapSign.bind(this)}
        />
        <Numbers 
          numbers={numbers}
          _displayNum={this._displayNum.bind(this)}
        />
        <Operations
          operations={operations}
          _addToCalc={this._addToCalc.bind(this)}
          _calcResult={this._calcResult.bind(this)}
        />
      </div>
    );
  }
};

class Operations extends React.Component{
  _handleOper(oper){
    switch (oper){
      case "+":
      case "-":
      case "*":
      case "/":
        this.props._addToCalc(oper);
        break;
      case "=":
        this.props._calcResult(oper);
        break;
      default:
        console.log("Something went wrong...");
    }
  }
  render(){
    return(
      <div className="calc-operations">
        {this.props.operations.map((operation) => {
          return <Button 
                   button={operation}
                   _handleOper={this._handleOper.bind(this)}
                  />;
        })}
      </div>
    );
  }
};

class Functions extends React.Component{
  _handleFunct(funct){
    // Conditional to call appropriate function
    switch (funct){
      case "c":
        this.props._clearVals();
        break;
      case "±":
        this.props._swapSign();
        break;
      case ".":
        this.props._insDecimal();
        break;
      default:
        console.log("Something went wrong...");
    }
  }
  render(){
    return(
      <div className="calc-functions">
        {this.props.functions.map((funct) => {
          return <Button
                   button={funct}
                   _handleFunct={this._handleFunct.bind(this)}
                  />;
        })}
      </div>
    );
  }
};

class Numbers extends React.Component{
  _handleNum(num){
    const parsedNum = num.toString();
    this.props._displayNum(parsedNum);
  }
  render(){
    return(
      <div className="calc-numbers">
        {this.props.numbers.map((number) => {
          return <Button 
                   button={number}
                   _handleNum={this._handleNum.bind(this)}
                  />;
        })}
      </div>
    );
  }
};

class Display extends React.Component{
  render(){
    return(
      <div className="calc-display">
        {this.props.displayVal}
      </div>
    );
  }
};

class Button extends React.Component{
  _handleClick(e){
    // Conditional to handle different types of buttons
    switch (this.props.button){
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        this.props._handleNum(this.props.button);
        break;
      case "c":
      case "±":
      case ".":
        this.props._handleFunct(this.props.button);
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "=":
        this.props._handleOper(this.props.button);
        break;
      default:
        break;
    }
  }
  render(){
    return(
      <button name={this.props.button} onClick={this._handleClick.bind(this)}>
        {this.props.button}
      </button>
    );
  }
};

