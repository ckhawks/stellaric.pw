/**
 * Generate a random pseudonym by combining adjectives, nouns, and numbers
 * Examples: "SilverEagle42", "GoldenPhoenix88", "SwiftTiger15"
 */

const adjectives = [
  "Silver",
  "Golden",
  "Swift",
  "Brave",
  "Calm",
  "Dark",
  "Bright",
  "Fierce",
  "Gentle",
  "Happy",
  "Lazy",
  "Mighty",
  "Quiet",
  "Radiant",
  "Sneaky",
  "Brave",
  "Clever",
  "Daring",
  "Eager",
  "Fair",
  "Grand",
  "Hidden",
  "Icy",
  "Jolly",
  "Kind",
  "Lively",
  "Merry",
  "Noble",
  "Proud",
  "Rapid",
  "Serene",
  "Timid",
  "Vivid",
  "Wise",
];

const nouns = [
  "Eagle",
  "Phoenix",
  "Tiger",
  "Wolf",
  "Dragon",
  "Falcon",
  "Raven",
  "Panda",
  "Lion",
  "Bear",
  "Fox",
  "Owl",
  "Snake",
  "Shark",
  "Whale",
  "Penguin",
  "Cheetah",
  "Deer",
  "Otter",
  "Lynx",
  "Cobra",
  "Viper",
  "Badger",
  "Meerkat",
  "Raccoon",
  "Beaver",
  "Lynx",
  "Mongoose",
  "Puma",
  "Cougar",
  "Jaguar",
  "Panther",
  "Leopard",
  "Ocelot",
];

export function generatePseudonym(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);

  return `${adjective}${noun}${number}`;
}
