#!/usr/bin/env python3
import argparse,csv,json,math,random
from pathlib import Path
from datetime import datetime,timedelta

SPECIALTIES=["GENERAL","TRAUMA","CARDIAC","STROKE"]
PRIORITIES=["P1","P2","P3","P4"]
SLA={"P1":8.0,"P2":15.0,"P3":30.0,"P4":45.0}

def write_csv(path, rows, fields):
    path.parent.mkdir(parents=True,exist_ok=True)
    with path.open("w",newline="",encoding="utf-8") as f:
        w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(rows)

def load_static(root):
    def read(name):
        with (root/"sample"/name).open(encoding="utf-8") as f:return list(csv.DictReader(f))
    return read("ambulances.csv"),read("hospitals.csv"),read("charging_stations.csv")

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--config",default="configs/experiment.json"); ap.add_argument("--out",default="data/generated"); a=ap.parse_args()
    root=Path(__file__).resolve().parents[1]; cfg=json.load(open(root/a.config,encoding="utf-8")); out=root/a.out
    ambulances,hospitals,chargers=load_static(root)
    write_csv(out/"ambulances.csv",ambulances,ambulances[0].keys()); write_csv(out/"hospitals.csv",hospitals,hospitals[0].keys()); write_csv(out/"chargers.csv",chargers,chargers[0].keys())
    scenario_rows=[]; rep_rows=[]; incident_rows=[]; fleet_rows=[]; hosp_state=[]; candidates=[]
    for sc in cfg["scenarios"]:
        scenario_rows.append(sc)
        for r in range(1,cfg["replications_per_scenario"]+1):
            seed=cfg["base_seed"]+10000*cfg["scenarios"].index(sc)+r
            rng=random.Random(seed); rid=f'{sc["scenario_id"]}_R{r:03d}'
            rep_rows.append({"replication_id":rid,"scenario_id":sc["scenario_id"],"random_seed":seed,"generator_version":cfg["generator_version"]})
            for v in ambulances:
                soc=max(5,min(100,rng.uniform(45,95)+sc["initial_soc_shift_pct"]))
                fleet_rows.append({"replication_id":rid,"vehicle_id":v["vehicle_id"],"status":"AVAILABLE","soc_pct":round(soc,2),"x_km":round(rng.uniform(0,15),3),"y_km":round(rng.uniform(0,15),3),"available_at_min":0})
            for h in hospitals:
                cap=max(0,round(int(h["base_modeled_receiving_capacity"])*sc["hospital_capacity_multiplier"]))
                hosp_state.append({"replication_id":rid,"time_min":0,"hospital_id":h["hospital_id"],"modeled_receiving_capacity":cap})
            t=0.0
            for i in range(1,cfg["incidents_per_replication"]+1):
                mean_gap=8.0/sc["demand_multiplier"]; t+=rng.expovariate(1/mean_gap)
                pr=rng.choices(PRIORITIES,weights=[0.18,0.30,0.35,0.17],k=1)[0]
                spec=rng.choices(SPECIALTIES,weights=[0.55,0.15,0.15,0.15],k=1)[0]
                iid=f'{rid}_I{i:04d}'
                incident_rows.append({"incident_id":iid,"replication_id":rid,"request_time_min":round(t,3),"priority":pr,"sla_min":SLA[pr],"x_km":round(rng.uniform(0,15),3),"y_km":round(rng.uniform(0,15),3),"required_specialty":spec})
                for v in ambulances:
                    for h in hospitals:
                        candidates.append({"candidate_id":f'{iid}_{v["vehicle_id"]}_{h["hospital_id"]}',"incident_id":iid,"vehicle_id":v["vehicle_id"],"hospital_id":h["hospital_id"]})
    write_csv(out/"scenarios.csv",scenario_rows,scenario_rows[0].keys())
    write_csv(out/"replications.csv",rep_rows,rep_rows[0].keys())
    write_csv(out/"incidents.csv",incident_rows,incident_rows[0].keys())
    write_csv(out/"fleet_initial.csv",fleet_rows,fleet_rows[0].keys())
    write_csv(out/"hospital_state_initial.csv",hosp_state,hosp_state[0].keys())
    write_csv(out/"candidate_index.csv",candidates,candidates[0].keys())
    print(json.dumps({"scenarios":len(scenario_rows),"replications":len(rep_rows),"incidents":len(incident_rows),"candidate_keys":len(candidates)},indent=2))
if __name__=="__main__": main()
