type SentimentClass = "positive" | "negative" | "neutral";
type WordResult = {
  word: string;
  partsOfSpeech: string[];
  percentile: number;
  sentiment: number;
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
  similarTo: string[];
};

export type { SentimentClass, WordResult, GeneratorOptions };
