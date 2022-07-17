type Sentiment = "positive" | "negative" | "neutral";
type WordResult = {
  word: string;
  partsOfSpeech: string[];
  percentile: number;
};

type GeneratorOptions = {
  minLength: number;
  maxLength: number;
  sentimentBounds: [number, number];
  freqBounds: [number, number];
  startsWith: string;
  endsWith: string;
  numWords: number;
  partsOfSpeech: string[];
};

export type { Sentiment, WordResult, GeneratorOptions };
