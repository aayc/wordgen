import pandas as pd
from tqdm import tqdm
import json

df = pd.read_csv("unigram_freq.csv")
d = {}
for i in tqdm(range(len(df))):
    d[df.iloc[i]["word"]] =int(df.iloc[i]["count"])
print("# words before percentile filtering:", len(d))

avg_count = sum(d.values()) / len(d.values())
for k in list(d.keys()):
    if d[k] < avg_count:
        del d[k]

print("# words after percentile filtering:", len(d))
with open("wordfreq.json", "w") as f:
    json.dump(d, f)