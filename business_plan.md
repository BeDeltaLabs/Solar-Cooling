# Solar Cooling - Business & Technical Plan

## 1. Executive Summary
**Objective:** Increase solar farm energy output by ~10% through active/passive panel cooling.
**Target Market:** Existing utility-scale solar farms.
**Stage:** Concept/Pre-Prototype.

## 2. Technical Opportunity
**Goal:** Leverage thermodynamics to improve solar asset performance.

### 2.1 Technical Background
Solar panels lose efficiency as they heat up (~0.4% loss per °C above 25°C). By maintaining lower operating temperatures, we can unlock suppressed potential energy. The core engineering challenge is achieving this cooling with a net-positive energy balance.

### 2.2 Subsystem Breakdown
To tackle this, we divide the solution into four major subsystems:

#### A. Thermal Interface (The "Collector")
*   **Concept:** How we extract heat from the existing panel without damaging it or voiding warranties.
*   **Options:** Rear-mounted water jackets, air-flow channeling, or direct evaporative surfaces.

#### B. Heat Rejection (The "Sink")
*   **Concept:** Where the heat goes. This is the most critical energy variable.
*   **Options:**
    *   *Active:* Vapor-compression (AC) - High energy cost.
    *   *Passive/Low-Energy:* Ground source, Night-sky radiative cooling, Evaporative cooling towers.

#### C. Fluid & Transport
*   **Concept:** Moving the thermal medium (water/glycol/air).
*   **Challenge:** Minimizing pumping power (parasitic load).

#### D. Control & Logic
*   **Concept:** Smart controllers to only run cooling when (Gain > Cost).

### 2.3 Validation Criteria
For any concept to proceed, it must meet these criteria:
1.  **Net Energy Positive:** Energy Gain (from $\Delta$Efficiency) > Energy Cost (Pumps/Fans).
2.  **LCOE Reduction:** The cost of the retrofit must not increase the Levelized Cost of Energy.
3.  **Non-Destructive:** Must not require drilling into or modifying the OEM panel laminate.

## 3. Business Model
**Value Proposition:** Higher yield from existing assets (Brownfield improvement).

### 3.1 Revenue Streams
- **Hardware Sales:** Sell the cooling unit as a retrofit.
- **Energy-as-a-Service / Gain Share:** We install for free, take 30-50% of the *extra* energy revenue generated. (Low risk for customer).

### 3.2 Cost Structure
- Manufacturing (Retrofit kits).
- Installation labor.
- Maintenance (pumps, films, fluids).

## 4. Go-to-Market: First Customer
**Target:** Solar farms (Utility scale).

### 4.1 Acquisition Strategy
- [ ] **Identify Prospects:**
    - Locate solar farms in high-heat areas (deserts, tropical). Heat degradation is highest there.
- [ ] **The "Pilot" Pitch:**
    - "Let us retrofit 1 string (10-20 panels) for free. Measure the difference for 3 months."
- [ ] **Partnerships:**
    - Solar O&M (Operations & Maintenance) companies. They already visit these sites.

## 5. Next Steps / Tasks
1.  **Technical Feasibility Study:** Run the math on the "Air Conditioner" vs. "Radiative" approaches. [View Energy Balance Report](reports/energy_power_balance.md)
2.  **Competitor Research:** Look for existing "PVT" (Photovoltaic Thermal) or Solar Cooling startups.
3.  **Draft One-Pager:** A simple PDF to show solar farm owners.
