PharmaFind: The Autonomous Pharmacy Protocol
============================================

> **"Google Maps for Drugs. Google Notifications for Expiry."**

Built for the **Stellar Agents Hackathon (2026)**, PharmaFind is a decentralized procurement protocol that transforms siloed pharmacy inventory into an agentic, liquid marketplace.

* * * * *

🚀 The Vision
-------------

In centralized systems (like Boots), pharmacists spend hours physically phoning suppliers or other branches to find life-saving medication. **PharmaFind** replaces manual logistics with **Stellar Agents** that use **x402** and **MPP** to discover, verify, and procure stock autonomously.

🛠️ The Problems We Solve
-------------------------

1.  **Stockouts:** "Scout Agents" monitor local inventory 24/7 and initiate procurement the moment stock hits a critical threshold.

2.  **Manual Coordination:** Instead of phone calls, agents use **x402 pay-per-query** to browse regional inventories without compromising privacy or inviting bot-scraping.

3.  **Wasted Medication:** Automatic "Expiry Notifications" trigger agentic refills or transfers 30 days before a drug expires, preventing total loss.

* * * * *

🏗️ Tech Stack & Stellar Integration
------------------------------------

### **1\. Agentic Discovery (x402)**

We use the **x402 protocol** to monetize pharmacy data and protect privacy.

-   **The Challenge:** Pharmacies are hesitant to broadcast real-time inventory for free due to competitive and security risks.

-   **The Solution:** Our `Supplier Agent` paywalls inventory data. The `Boots Scout Agent` must sign a **Stellar Micropayment** (XLM/USDC) to "unlock" the verified stock levels and location.

### **2\. Machine Payments (MPP)**

Once stock is located, the agents move from "Discovery" to "Procurement."

-   We utilize the **Machine Payments Protocol (MPP)** for the final settlement.

-   This allows for machine-to-machine payment flows where the buyer agent can "Charge" the transaction against its authorized spending policy, ensuring the pharmacy only ships once the transaction is finalized on the Stellar network.

### **3\. Smart Inventory (Soroban & Metadata)**

-   Drug batches are tracked as on-chain assets.

-   The agent logic calculates an "Urgency Score" based on `expiry_date` metadata, triggering actions before a human even realizes the stock is at risk.

* * * * *

📦 Project Structure
--------------------

Plaintext

```
pharmafind/
├── agents/
│   ├── boots-agent.js       # The "Scout" - Monitors stock & initiates buys
│   └── supplier-agent.js    # The "Hub" - Sells drug data via x402
├── data/
│   ├── boots-inventory.json # Local pharmacy stock (The Problem)
│   └── supply-stock.json    # Regional warehouse data (The Solution)
├── .env                     # Network configuration and Agent keys
└── README.md                # Project Documentation

```

* * * * *

🚦 Quick Start
--------------

**Prerequisites:**

-   Node.js v22+

-   Stellar Testnet Accounts (XLM and USDC Trustlines)

**Installation:**

Bash

```
# Due to the experimental nature of the x402/MPP SDKs, use legacy-peer-deps
npm install --legacy-peer-deps

```

**Run the Demo:**

1.  **Start the Supplier (The Regional Hub):**

    Bash

    ```
    npm run supplier

    ```

2.  **Start the Scout (The Boots Agent):**

    Bash

    ```
    npm run boots

    ```

* * * * *

📽️ Demo Walkthrough
--------------------

In our demo, you will see the **Boots Agent** detect a batch of Amoxicillin with only 2 units left. It autonomously searches the local network, hits a `402 Payment Required` wall, settles a **Stellar Micropayment** to verify the Supplier's stock, and logs a successful procurement intent---all without a single phone call.

* * * * *

🛣️ Roadmap
-----------

-   **Q3 2026:** Geographic visualization layer (Google Maps API integration) for human pharmacists to oversee agentic flows.

-   **Q4 2026:** Integration with **Soroban Smart Contracts** for automated escrow-based drug releases.

* * * * *

**Developed by:** [PharmaFind] **Network:** Stellar Testnet 2026