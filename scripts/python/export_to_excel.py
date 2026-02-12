import pandas as pd
import sys
import os;

title = sys.argv[1]
platform = sys.argv[2]
date = sys.argv[3]

filePath = "posts.xlsx"

newRow = {
    "Title": title,
    "Platform": platform,
    "Date": date
}

if os.path.exists(filePath):   
    df = pd.read_excel(filePath)
    df = pd.concat([df, pd.DataFrame([newRow])], ignore_index=True)
else:
    df = pd.DataFrame([newRow])

df.to_excel(filePath, index=False)
print("Excel updated successfully")