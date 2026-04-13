require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Keypair, TransactionBuilder, Networks, Horizon, Asset, Operation } = require('stellar-sdk');
// 1. Setup Stellar Server
const server = new Horizon.Server(process.env.HORIZON_URL);
const bootsKeypair = Keypair.fromSecret(process.env.BOOTS_SECRET);

async function monitorAndRefill() {
    console.log("--------------------------------------------------");
    console.log("🕒 PharmaFind: Running Autonomous Inventory Scan...");
    
    // Load local inventory
    const inventoryPath = path.join(__dirname, '../data/boots-inventory.json');
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

    for (const item of inventory) {
        const expiryDate = new Date(item.expiry);
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        if (item.stock < 5 || expiryDate < thirtyDaysFromNow) {
            console.log(`⚠️  ISSUE: ${item.name} (${item.stock < 5 ? 'Low Stock' : 'Expiring Soon'})`);
            await searchAndBuy(item.name);
        }
    }
}

async function searchAndBuy(drugName) {
    const url = `http://localhost:3000/check-stock?name=${drugName}`;
    
    try {
        console.log(`📡 Searching regional hub for ${drugName}...`);
        const response = await axios.get(url);
        console.log("✅ Stock already accessible:", response.data);
    } catch (error) {
        if (error.response && error.response.status === 402) {
            const invoice = error.response.data;
            console.log(`💰 x402 REQUIRED: Paying ${invoice.price} XLM to verify ${drugName}...`);
            
            // Perform the Stellar Payment
            const txHash = await payOnStellar(invoice);

            if (txHash) {
                console.log("🔄 Retrying with proof of payment...");
                const finalResponse = await axios.get(url, {
                    headers: { 'x-stellar-signature': txHash }
                });
                console.log("🎉 DATA UNLOCKED:", finalResponse.data);
            }
        }
    }
}

async function payOnStellar(invoice) {
    try {
        // Force clean the address and price
        const dest = process.env.SUPPLIER_PUBLIC.trim(); 
        const amount = parseFloat(invoice.price).toFixed(7); 

        const account = await server.loadAccount(bootsKeypair.publicKey());
        
        const transaction = new TransactionBuilder(account, { fee: '1000' })
            .addOperation(Operation.payment({
                destination: dest,
                asset: Asset.native(),
                amount: amount 
            }))
            .setNetworkPassphrase(Networks.TESTNET)
            .setTimeout(30)
            .build();

        transaction.sign(bootsKeypair);
        const result = await server.submitTransaction(transaction);
        console.log(`✅ Payment Successful! Hash: ${result.hash}`);
        return result.hash;
    } catch (e) {
        // Detailed error logging to see WHY it's failing
        console.error("❌ Stellar Payment Failed!");
        if (e.response && e.response.data && e.response.data.extras) {
            console.error("Error Detail:", JSON.stringify(e.response.data.extras.result_codes));
        } else {
            console.error("Error Message:", e.message);
        }
        return null;
    }
}

// Run the agent
monitorAndRefill();