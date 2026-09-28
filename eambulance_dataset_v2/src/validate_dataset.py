#!/usr/bin/env python3
import argparse,csv,json
from pathlib import Path

def read(p):
    with p.open(encoding="utf-8") as f:return list(csv.DictReader(f))
def unique(rows,key): return len(rows)==len({r[key] for r in rows})
def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--data",default="data/generated"); a=ap.parse_args()
    root=Path(__file__).resolve().parents[1]; d=root/a.data
    inc=read(d/"incidents.csv"); amb=read(d/"ambulances.csv"); hos=read(d/"hospitals.csv"); fleet=read(d/"fleet_initial.csv"); hs=read(d/"hospital_state_initial.csv"); cand=read(d/"candidate_index.csv")
    checks={
      "incident_id_unique":unique(inc,"incident_id"),
      "vehicle_id_unique":unique(amb,"vehicle_id"),
      "hospital_id_unique":unique(hos,"hospital_id"),
      "candidate_id_unique":unique(cand,"candidate_id"),
      "soc_in_0_100":all(0<=float(r["soc_pct"])<=100 for r in fleet),
      "capacity_nonnegative":all(int(r["modeled_receiving_capacity"])>=0 for r in hs),
      "sla_positive":all(float(r["sla_min"])>0 for r in inc),
      "candidate_incident_fk":all(r["incident_id"] in {x["incident_id"] for x in inc} for r in cand),
      "candidate_vehicle_fk":all(r["vehicle_id"] in {x["vehicle_id"] for x in amb} for r in cand),
      "candidate_hospital_fk":all(r["hospital_id"] in {x["hospital_id"] for x in hos} for r in cand)
    }
    print(json.dumps(checks,indent=2)); raise SystemExit(0 if all(checks.values()) else 2)
if __name__=="__main__":main()
