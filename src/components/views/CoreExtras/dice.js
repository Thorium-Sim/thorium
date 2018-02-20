import React, { Component } from "react";

class Dice extends Component {
  state = {
    dice: [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]
  };
  rolling = false;
  shakeDice = () => {
    if (this.rolling) {
      this.setState(({ dice }) => {
        return { dice: dice.map(() => Math.ceil(Math.random() * 6)) };
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
    const { dice } = this.state;
    return (
      <div>
        {dice.map((d, i) => (
          <Die rollDice={this.rollDice} num={d} key={`dice-${i}`} />
        ))}
      </div>
    );
  }
}

const Die = ({ rollDice, num = Math.ceil(Math.random() * 6) }) => {
  return (
    <img
      style={{ width: "35px" }}
      onClick={rollDice}
      className="dice-of-doom"
      alt="dice"
      src={require(`./dice/die${num}.svg`)}
    />
  );
};

export default Dice;
