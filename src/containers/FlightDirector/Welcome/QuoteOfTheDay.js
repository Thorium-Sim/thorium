import React, {useRef} from "react";

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
  "The work is done, as it always will be. I am inevitable.",
  "It's better to look good than to feel good.",
  "Some of us have to work for a living!",
  "Educating minds with the discipline of wonder.",
  "While others sleep, you dream.",
  "Time is an illusion. Lunchtime doubly so.",
  "I may not have gone where I intended to go, but I think I have ended up where I needed to be.",
  "Don't Panic.",
  "I'd far rather be happy than right any day.",
  "For a moment, nothing happened. Then, after a second or so, nothing continued to happen.",
  "Reality is frequently inaccurate.",
  "It is a mistake to think you can solve any major problems just with potatoes.",
  "Dangerous But Not Unbearably So",
  "So much for subtlety",
  "Just as likely to still be an intergalactic jellyfish.",
  "And the world will fall with ignorance...",
  "You don't know I'm not crazy.",
  "If you cannot do great things, do small things in a great way.",
  "This is the way. I have spoken.",
  "Suffering exists. It has a cause. It has an end. And there is a noble path to ending it.",
  "We are what they grow beyond. That is the true burden of all masters.",
  "We grow small trying to be great.",
  "The whole point of getting things done is knowing what to leave undone.",
  "The days are long, but the years are short.",
  "I preferred to be called Nobody.",
  "He who least needs tomorrow, will most gladly greet tomorrow",
  /* Banksy */
  "They say you die twice; Once when you stop breathing and again when someone says your name for the last time.",
  "There's nothing more dangerous than someone who wants to make the world a better place.",
  "There are three kinds of people in this world: those who like you, those who hate you, and those who don't care about you.",
  "I need someone to protect me from all the measures they take in order to protect me.",
  "If you get tired, learn to rest, not to quit.",
  "Be positive, patient and persistent.",
  "This revolution is for display purposes only.",
  /* Back to regularly scheduled programming */
  "Nobody knows what their story is until the end.",
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
