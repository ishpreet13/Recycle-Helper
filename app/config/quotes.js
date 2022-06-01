var quotes = [
  [
    "The greatest threat to our planet is the belief that someone else will save it.",
    "Robert Swan",
  ],
  [
    "When you put the whole picture together, recycling is the right thing to do.",
    "Pam Shoemaker",
  ],
  [
    "We do not inherit the Earth from our ancestors; we borrow it from our children.",
    "Native American Proverb",
  ],
  ["We never know the worth of water till the well is dry.", "Thomas Fuller"],
  [
    "At its core, the issue of a clean environment is a matter of public health.",
    "Gina McCarthy",
  ],
  ["When you refuse to reuse it is our Earth you abuse.", "ANONYMOUS"],
  ["Recycle today for a better tomorrow.", "ANONYMOUS"],
  [
    "Never doubt that a small group of thoughtful, committed citizens can change the world; indeed, it is the only thing that ever has.",
    "Margaret Mead",
  ],
  [
    "Environment is no one’s property to destroy; it’s everyone’s responsibility to protect.",
    "Mohith Agadi",
  ],
  [
    "Waste does not exist in nature because ecosystems reuse everything that grows in a never-ending cycle of efficiency and purpose.",
    "Frans van Houten",
  ],
  [
    "Our planet’s alarm is going off, and it is time to wake up and take action!",
    "Leonardo DiCaprio",
  ],
];
let min = 0;
let max = 10;

function getRandomNumberBetween() {
  var index = Math.floor(Math.random() * (max - min + 1) + min);
  var randomQuote = new Object();
  randomQuote.quote = quotes[index][0];
  randomQuote.author = quotes[index][1];
  return randomQuote;
}
export default getRandomNumberBetween;
