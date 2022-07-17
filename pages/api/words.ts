// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GeneratorOptions, WordResult } from "../../utils/types";
import { readFileSync } from "fs";
import path from "path";
import Sentiment from "sentiment";
const sentiment = new Sentiment();

type WordsResponse = {
  words: WordResult[];
};

type WordFrequencyList = {
  [key: string]: number;
};

function getSentiment(word: string): number {
  const { comparative } = sentiment.analyze(word);
  return comparative / 5;
}

function bisectLeft(array: number[], target: number) {
  // Use binary search to find index of first element greater than target
  let low = 0;
  let high = array.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

function getPercentile(
  word: string,
  freq: WordFrequencyList,
  counts: number[]
) {
  const index = bisectLeft(counts, freq[word]);
  const percentile = (index / counts.length) * 100;
  return percentile;
}

function tryGenerateWord(
  wordChoices: string[],
  existing: WordResult[]
): WordResult | null {
  const word = wordChoices[Math.floor(Math.random() * wordChoices.length)];
  if (existing.find((w) => w.word === word)) {
    return null;
  }

  return { word };
}

function generateWords(
  args: GeneratorOptions,
  freq: { [key: string]: number }
) {
  const words: WordResult[] = [];
  const counts = Object.values(freq).sort((a, b) => a - b);
  const wordList = Object.keys(freq)
    .filter((w) => w.length >= args.minLength && w.length <= args.maxLength)
    .filter((w) => w.startsWith(args.startsWith) && w.endsWith(args.endsWith))
    .filter(
      (w) =>
        getSentiment(w) >= args.sentimentBounds[0] &&
        getSentiment(w) <= args.sentimentBounds[1]
    )
    .filter(
      (w) =>
        getPercentile(w, freq, counts) >= args.freqBounds[0] &&
        getPercentile(w, freq, counts) <= args.freqBounds[1]
    );
  console.log("# words:", wordList.length);

  let tries = 0;
  while (words.length < args.numWords) {
    const attempt = tryGenerateWord(wordList, words);
    if (attempt) {
      words.push(attempt);
    }
    tries += 1;

    if (tries > args.numWords + 1000) {
      break;
    }
  }

  return words;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordsResponse>
) {
  const args: GeneratorOptions = req.body;
  const file = path.join(process.cwd(), "files", "wordfreq.json");
  const freq = JSON.parse(readFileSync(file, "utf8"));
  const words = generateWords(args, freq);

  res.status(200).json({ words });
}
