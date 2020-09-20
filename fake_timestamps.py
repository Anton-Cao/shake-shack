import random

with open('client/public/unemployment.csv', 'r') as rf:
    with open('client/public/unemployment_timestamps.csv', 'w') as wf:
        title = rf.readline().strip()
        wf.write(title + ",timestamp\n")
        for row in rf.readlines():
            data = row.strip().split(',')[:-1]
            for ts in range(100, 600, 100):
                val = str(round(random.random() * 10, 1))
                newdata = data + [val, str(ts)]
                wf.write(",".join(newdata) + "\n")
