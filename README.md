```
# 💊 pharmafind
**The Autonomous Pharmacy Protocol on Stellar**

> "Google Maps for Drugs. Google Notifications for Expiry."

Built for the **Stellar Agents Hackathon (2026)**, pharmafind is a decentralized procurement protocol that transforms siloed pharmacy inventory into an agentic, liquid marketplace.

---

🚀 The Vision
-------------
In centralized systems, pharmacists spend hours physically phoning suppliers to find life-saving medication. **pharmafind** replaces manual logistics with **Stellar Agents** that use **x402** and **MPP** to discover, verify, and procure stock autonomously.

🛠️ The Problems We Solve
-------------------------
1. **Stockouts:** The "Monitor Agent" scans local inventory 24/7 and initiates procurement the moment stock hits a critical threshold (< 5 units).
2. **Manual Coordination:** Instead of phone calls, agents use **x402 pay-per-query** to browse regional inventories without compromising privacy.
3. **Wasted Medication:** Automatic "Expiry Notifications" trigger agentic refills 30 days before a drug expires, preventing total loss.

---

🏗️ Tech Stack & Stellar Integration
------------------------------------
### 1. Agentic Discovery (x402)
We use the **x402 protocol** to monetize pharmacy data. The `Supplier Agent` paywalls inventory data. The `Boots Scout Agent` must sign a **Stellar Micropayment** (XLM/USDC) to "unlock" the verified stock levels.

### 2. Machine Payments (MPP)
Utilizing the **Machine Payments Protocol (MPP)** for final settlement, allowing machine-to-machine payment flows where the buyer agent charges the transaction against an authorized spending policy.

### 3. Command Center (Dashboard)
A real-time **Tailwind & Leaflet.js** dashboard that visualizes agent activity, live Stellar transaction logs, and geographic stock distribution.

---

📦 Project Structure
--------------------

```

pharma/ ├── agents/ │ ├── monitor-agent.js # NEW: The "Brain" - Scans stock & expiry │ ├── scout-agent.js # The "Payer" - Initiates x402 Stellar buys │ └── supplier-agent.js # The "Hub" - Sells drug data via x402 ├── inventory.json # Mock Pharmacy Database (The Problem) ├── index.html # The "Agentic Command Center" UI ├── package.json # Dependencies └── README.md # Documentation

```

---

🚦 Quick Start
--------------
**Installation:**
```bash
npm install

```

**Run the Autonomous Loop:**

1.  **Start the Dashboard:** Open `index.html` in any browser.

2.  **Run the Monitor:** ```bash node agents/monitor-agent.js

* * * * *

**Developed by:** [benpaymaster] | **Network:** Stellar Testnet 2026