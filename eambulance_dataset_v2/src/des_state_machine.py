from dataclasses import dataclass

@dataclass
class VehicleState:
    vehicle_id:str; x_km:float; y_km:float; soc_pct:float; available_at_min:float=0.0; status:str="AVAILABLE"

@dataclass
class HospitalState:
    hospital_id:str; modeled_receiving_capacity:int

def consume_soc(state:VehicleState, distance_km:float, battery_kwh:float=33.0, rate_kwh_per_km:float=0.2538, buffer:float=0.15):
    used=distance_km*rate_kwh_per_km*(1+buffer)
    state.soc_pct -= 100*used/battery_kwh
    if state.soc_pct < -1e-9: raise ValueError("Physical inconsistency: SOC below 0")
    state.soc_pct=max(0.0,state.soc_pct)
    return used

def charge(state:VehicleState, minutes:float, power_kw:float=7.0, battery_kwh:float=33.0):
    before=state.soc_pct
    state.soc_pct=min(100.0,state.soc_pct+100*(power_kw*minutes/60)/battery_kwh)
    if state.soc_pct+1e-9<before: raise ValueError("charging_completed cannot reduce SOC")
    return state.soc_pct-before
