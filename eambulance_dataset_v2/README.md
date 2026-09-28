# E-Ambulance Dataset Builder V2

Reproducible synthetic-data builder for the research topic: multi-objective electric-ambulance dispatch considering urgency, travel time, modeled hospital receiving capability/capacity, and EV state of charge (SOC).

## Scientific scope
This package generates **synthetic simulation data**. It is not real HCMC/115 operational data and must not be described as actual hospital capacity or clinical outcomes.

Experimental unit:
```
scenario_id × replication_id/random_seed × algorithm_id
```

Recommended comparison uses common random numbers: the same scenario/replication/incident stream is replayed for B0/B3/B4/B6.

## Structure
- configs/experiment.json — experiment design
- data_dictionary.csv — schema/data roles
- parameter_registry.csv — assumptions and calibration status
- provenance/provenance_manifest.json — provenance/versioning
- sample/ — static example entities
- src/generate_dataset.py — exogenous dataset generator
- src/validate_dataset.py — QA/semantic checks
- src/des_state_machine.py — vehicle/hospital dynamic state
- src/baselines.py — B0/B3/B4/B6 reference policies
- src/run_experiment.py — paired experiment runner skeleton

## Quick start
```bash
python src/generate_dataset.py --config configs/experiment.json --out data/generated
python src/validate_dataset.py --data data/generated
python src/run_experiment.py --data data/generated --out results
```

Default design: 6 scenarios × 30 independent replications × 500 incidents/run. Adjust in experiment.json.

## Decision-time anti-leakage rule
Policies may use only information available at decision time: current incident/triage, current vehicle state/SOC/availability, current modeled hospital state, and contemporaneous travel-time estimates. Realized future travel time, future incidents, future capacity, and realized future energy consumption are evaluation outputs, not policy inputs.

## Core relational flow
incident -> decision-time snapshot -> Incident × Ambulance × Hospital candidates -> hard feasibility -> policy -> dispatch decision -> mission events -> SOC/hospital updates -> next decision epoch.

## Important terminology
Use **modeled_receiving_capacity** unless calibrated against an operational source. Urgency is a dispatch/triage input; it is not a patient outcome. Synthetic feasibility is not evidence of patient safety.
