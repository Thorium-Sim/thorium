import React, {Component} from "react";
import Frame1 from "./frame1.png";
import Frame2 from "./frame2.png";
import Frame3 from "./frame3.png";
import Frame4 from "./frame4.png";
import Frame5 from "./frame5.png";
import Frame6 from "./frame6.png";
import Frame7 from "./frame7.png";
import Frame8 from "./frame8.png";
import Frame9 from "./frame9.png";
import Frame10 from "./frame10.png";
import Frame11 from "./frame11.png";
import Frame12 from "./frame12.png";
import Frame13 from "./frame13.png";
import Frame14 from "./frame14.png";
import Frame15 from "./frame15.png";
import Frame16 from "./frame16.png";


const frames = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6, Frame7, Frame8, Frame9, Frame10, Frame11, Frame12, Frame13, Frame14, Frame15, Frame16, Frame16];
export default class Explosion extends Component {
  state = {frame: 0};
  componentDidMount() {
    this.looping = true;
    this.loop();
  }
  componentWillUnmount() {
    clearTimeout(this.looping);
    this.looping = false;
  }
  loop = () => {
    const {frame} = this.state;
    if (!this.looping) return;
    if (frame === 16) return;

    this.setState({
      frame: frame + 1,
    });
    this.looping = setTimeout(this.loop, 50);
  };
  render() {
    const {width = 100, style = {}} = this.props;
    const {frame} = this.state;
    return (
      <img
        width={width}
        className="explosion-effect"
        alt="explosion"
        draggable={false}
        style={style}
        src={frames[frame]}
      />
    );
  }
}
