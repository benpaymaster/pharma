
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
We use the **x402 protocol** to monetize pharmacy data. The `Supplier Agent` paywalls inventory data. The `Boots Scout Agent` must sign a **Stellar Micropayment** (USDC) to "unlock" the verified stock levels.

### 2. Machine Payments (MPP)
Utilizing the **Machine Payments Protocol (MPP)** for final settlement, allowing machine-to-machine payment flows where the buyer agent charges the transaction against an authorized spending policy.

### 3. Command Center (Dashboard)
A real-time **Tailwind & Leaflet.js** dashboard that visualizes agent activity, live Stellar transaction logs, and geographic stock distribution.

---

📦 Project Structure
--------------------

```text
pharma/
├── agents/
│   ├── monitor-agent.js     # The "Brain" - Scans stock & expiry
│   ├── scout-agent.js       # The "Payer" - Initiates x402 Stellar buys
│   └── supplier-agent.js    # The "Hub" - Sells drug data via x402
├── inventory.json           # Mock Pharmacy Database
├── index.html               # The "Agentic Command Center" UI
├── package.json             # Dependencies
└── README.md                # Documentation

```

* * * * *

🚦 Quick Start
--------------

**Installation:**

Bash

```
npm install

```

**Run the Autonomous Loop:**

1. **Start the Dashboard:** Open `index.html` in any browser.
2. **Start the Supplier Hub:**
```bash
node agents/supplier-agent.js

```

1.  **Run the Monitor:** 
```bash 
node agents/monitor-agent.js

```

---

## 📖 The Boots Story: Why PharmaFind?
In 2026, pharmacies like **Boots** still face "blind spots" in the supply chain. When a life-saving drug like **Amoxicillin** hits critical levels, the current system relies on manual phone calls and faxed invoices.

## 📍 The Bramley 1.0 Pilot (West Yorkshire HealthTech Cluster)
For the Nexus Leeds launch, we have mapped the protocol onto the **Bramley (LS13)** pharmacy cluster:

- **Everest Pharmacy:** Cloud-Integrated (Pharmacy X). Acts as our primary "High-Frequency" node.
- **Manor Park Pharmacy:** Legacy-Integrated (ProScript). Demonstrates our middleware adapter.
- **Boots Bramley:** Enterprise-HQ Node. Connected via the Columbus data-lake bridge.

**The Bramley Cascade:** When Everest hits a stockout, the Scout Agent autonomously queries Manor Park and Boots using the x402 protocol, creating the first resilient neighborhood drug-network in Leeds.

**PharmaFind** changes the narrative:
1. **The Crisis:** A Boots branch in Central London hits a stock-out at 3 AM.
2. **The Agentic Response:** The **Monitor Agent** doesn't wait for human intervention. It detects the low stock and triggers the **Scout Agent**.
3. **The Discovery:** Using **x402**, the Scout finds a surplus at a Regional Hub. It pays a 0.01 USDC "Discovery Fee" to verify the stock exists---no phone calls needed.
4. **The Settlement:** Using **MPP**, the bulk purchase is finalized on the **Stellar Network** in seconds.
5. **The Result:** By the time the pharmacist arrives at 9 AM, the delivery is already on the truck.

---

## 🔗 Stellar Integration & Transparency
All agentic procurement is recorded on-chain for 100% auditability.

* **Network:** Stellar Testnet
* **Asset:** USDC
* **Agent Wallet:** `GAVWL4DHNZBBIAMYAPUPJFXBALFLA2KLZXKW2OZTLJYR4YWYVSAXLBPW`
* **Explorer Link:** [View Agent Transactions on StellarExpert](https://stellar.expert/explorer/testnet/account/GAVWL4DHNZBBIAMYAPUPJFXBALFLA2KLZXKW2OZTLJYR4YWYVSAXLBPW)

---

**Developed by:** [benpaymaster] | **Network:** Stellar Testnet 2026

```