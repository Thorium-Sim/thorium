import React, {Component} from "react";
import ReactDOM from "react-dom";
import Lottie from 'react-lottie-player'

import animationData from "./data.json";

export default function YellowAlert() {
   return <Lottie
      loop
      animationData={animationData}
      play
    />
}
