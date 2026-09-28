import math

def dist(a,b): return math.hypot(float(a["x_km"])-float(b["x_km"]),float(a["y_km"])-float(b["y_km"]))

def capability_ok(incident,hospital):
    return incident["required_specialty"] in hospital["specialties"].split("|") or incident["required_specialty"]=="GENERAL"

def energy_ok(vehicle, incident, hospital, reserve_pct=20.0, rate=0.2538, battery_kwh=33.0, buffer=0.15):
    km=dist(vehicle,incident)+dist(incident,hospital)
    post=float(vehicle["soc_pct"])-100*(km*rate*(1+buffer))/battery_kwh
    return post>=reserve_pct,post

def feasible_candidates(incident,vehicles,hospitals,hospital_capacity):
    out=[]
    for v in vehicles:
        if v.get("status")!="AVAILABLE": continue
        for h in hospitals:
            if not capability_ok(incident,h): continue
            if hospital_capacity.get(h["hospital_id"],0)<=0: continue
            ok,post=energy_ok(v,incident,h)
            out.append((v,h,post,ok))
    return out

def choose(policy,incident,vehicles,hospitals,hospital_capacity):
    c=feasible_candidates(incident,vehicles,hospitals,hospital_capacity)
    if policy=="B0": c=[x for x in c if x[3]]; key=lambda x:dist(x[0],incident)+dist(incident,x[1])
    elif policy=="B3": c=[x for x in c if x[3]]; key=lambda x:dist(x[0],incident)+dist(incident,x[1])+2/(1+hospital_capacity[x[1]["hospital_id"]])
    elif policy=="B4": c=[x for x in c if x[3]]; key=lambda x:dist(x[0],incident)+dist(incident,x[1])+0.25*(100-x[2])
    elif policy=="B6":
        c=[x for x in c if x[3]]
        urgency={"P1":4,"P2":3,"P3":2,"P4":1}[incident["priority"]]
        key=lambda x:urgency*(dist(x[0],incident))+dist(incident,x[1])+0.25*(100-x[2])+2/(1+hospital_capacity[x[1]["hospital_id"]])
    else: raise ValueError("policy must be B0/B3/B4/B6")
    return min(c,key=key) if c else None
