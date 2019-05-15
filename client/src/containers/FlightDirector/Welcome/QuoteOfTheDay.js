import React, { useRef } from "react";

const quotes = [
  "Not all who wander are lost",
  "If you don’t know where your destination is, you don’t know how long you have to wander",
  "Its origin and purpose are still a total mystery...",
  "For everything, there is a first time",
  "I like to believe that there are always possibilities",
  "Sometimes a feeling is all we humans have to go on.",
  "Failure is the mark of a life well lived. In turn, the only way to live without failure is to be of no use to anyone.",
  "History has its eyes on you.",
  "We take one step at a time. In doing so we reach toward the unknown.",
  "Where does this lead us? Where do we go?",
  "If you listen carefully, the silence is beautiful.",
  "The man who has no imagination has no wings.",
  "Life before death. Strength before weakness. Journey before destination.",
  "We are the ones we have been waiting for.",
  "I am burdened with glorious purpose.",
  "While you live, shine; have no grief at all. Life exists only for a short while and Time demands his due.",
  "The hardest choices require the strongest wills.",
  "Like a snowflake in a blizzard...",
  "Fun isn’t something one considers when balancing the universe. But this… does put a smile on my face.",
  "The work is done, as it always will be. I am inevitable."
];

const QuoteOfTheDay = () => {
  const quote = useRef(quotes[Math.floor(Math.random() * quotes.length)]);
  return (
    <h3 className="text-center">
      <small>{quote.current}</small>
    </h3>
  );
};

export default QuoteOfTheDay;
