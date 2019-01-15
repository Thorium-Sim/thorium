import React from "react";
import Konami from "react-konami";
const synth = window.speechSynthesis;

/** A tribute to my dad **/
const song = `The thunder god a riding went upon his favorite filly.
I’m Thor he cried, His horse replied “You forgot your thaddle thilly”`;

export default () => {
  return (
    <Konami
      easterEgg={() => {
        synth && synth.cancel();
        synth && synth.speak(new SpeechSynthesisUtterance(song));
      }}
    />
  );
};
