const fs = require('fs');

function scanInventory() {
    console.log("🔍 [Boots Agent] Scanning local inventory...");
    
    // 1. Read the JSON file
    const rawData = fs.readFileSync('inventory.json');
    const inventory = JSON.parse(rawData);
    
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    inventory.forEach(item => {
        const expiryDate = new Date(item.expiry_date);
        let triggerAlert = false;
        let reason = "";

        // Trigger 1: Low Stock
        if (item.stock < 5) {
            triggerAlert = true;
            reason = `Low Stock (${item.stock} units)`;
        } 
        // Trigger 2: Expiry within 30 days
        else if (expiryDate < thirtyDaysFromNow) {
            triggerAlert = true;
            reason = `Expiring soon (${item.expiry_date})`;
        }

        if (triggerAlert) {
            console.log(`⚠️  ALERT for ${item.name}: ${reason}`);
            initiateStellarRequest(item);
        }
    });
}

function initiateStellarRequest(item) {
    console.log(`💰 [x402] Initializing data request for ${item.name}...`);
    console.log(`🔗 Requesting Supplier quote for replacement stock...`);
    // This is where your existing x402 payment logic kicks in!
}

// Run the scan
scanInventory();