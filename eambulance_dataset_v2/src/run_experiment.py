#!/usr/bin/env python3
"""Reference paired-run skeleton. Extend with full event queue, travel-time uncertainty,
handover duration, charging/redeployment and KPI logging before paper experiments."""
import argparse,csv,json
from pathlib import Path

def read(p):
    with p.open(encoding="utf-8") as f:return list(csv.DictReader(f))
def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--data",default="data/generated"); ap.add_argument("--out",default="results"); a=ap.parse_args()
    root=Path(__file__).resolve().parents[1]; d=root/a.data; out=root/a.out; out.mkdir(parents=True,exist_ok=True)
    reps=read(d/"replications.csv"); inc=read(d/"incidents.csv")
    policies=["B0","B3","B4","B6"]
    rows=[]
    for rep in reps:
        n=sum(x["replication_id"]==rep["replication_id"] for x in inc)
        for p in policies:
            rows.append({"replication_id":rep["replication_id"],"scenario_id":rep["scenario_id"],"random_seed":rep["random_seed"],"policy_id":p,"incident_count":n,"status":"READY_FOR_DES_IMPLEMENTATION"})
    with (out/"experiment_runs.csv").open("w",newline="",encoding="utf-8") as f:
        w=csv.DictWriter(f,fieldnames=rows[0].keys());w.writeheader();w.writerows(rows)
    print(json.dumps({"paired_runs":len(rows),"note":"same replication/seed replayed across policies"},indent=2))
if __name__=="__main__":main()
