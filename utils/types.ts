type Sentiment = "positive" | "negative" | "neutral";
type WordResult = {
  word: string;
};
type GeneratorOptions = {
  minLength: number;
  maxLength: number;
  sentimentBounds: [number, number];
  freqBounds: [number, number];
  startsWith: string;
  endsWith: string;
  numWords: number;
};

export type { Sentiment, WordResult, GeneratorOptions };
