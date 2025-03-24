import React, {Component} from "react";

import Die1 from "./dice/die1.svg";
import Die2 from "./dice/die2.svg";
import Die3 from "./dice/die3.svg";
import Die4 from "./dice/die4.svg";
import Die5 from "./dice/die5.svg";
import Die6 from "./dice/die6.svg";

const dice = [Die1, Die2, Die3, Die4, Die5, Die6];
class Dice extends Component {
  state = {
    dice: [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)],
  };
  rolling = false;
  shakeDice = () => {
    if (this.rolling) {
      this.setState(({dice}) => {
        return {dice: dice.map(() => Math.ceil(Math.random() * 6))};
      });
      requestAnimationFrame(this.shakeDice);
    }
  };
  rollDice = () => {
    setTimeout(() => {
      this.rolling = false;
    }, 3000);
    this.rolling = true;
    this.shakeDice();
  };
  componentWillUnmount() {
    this.rolling = false;
  }
  render() {
    const {dice} = this.state;
    return (
      <div className="core-dice pull-left">
        {dice.map((d, i) => (
          <Die rollDice={this.rollDice} num={d} key={`dice-${i}`} />
        ))}
      </div>
    );
  }
}

const Die = ({rollDice, num = Math.ceil(Math.random() * 6)}) => {
  return (
    <img
      style={{width: "35px"}}
      onClick={rollDice}
      className="dice-of-doom"
      alt="dice"
      src={dice[num - 1]}
    />
  );
};

export default Dice;
