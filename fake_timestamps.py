import random

with open('client/public/unemployment.csv', 'r') as rf:
    #with open('client/public/unemployment_timestamps.csv', 'w') as wf:
    with open('client/public/unemployment_timestamps_2.csv', 'w') as wf:
        title = rf.readline().strip()
        wf.write(title + ",timestamp\n")
        for row in rf.readlines():
            data = row.strip().split(',')
            value = float(data[-1])
            data = data[:-1]
            # for ts in range(100, 600, 100):
            #     val = str(round(random.random() * 10, 1))
            #     newdata = data + [val, str(ts)]
            #     wf.write(",".join(newdata) + "\n")
            values = []
            for ts in range(1850, 2020, 20):
                values.insert(0, (ts, value))
                value += 3 * (random.random() - 0.6)
            for (ts, val) in values:
                newdata = data + [str(round(val, 1)), str(ts)]
                wf.write(",".join(newdata) + "\n")
