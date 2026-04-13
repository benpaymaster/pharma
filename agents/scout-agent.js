require('dotenv').config();
const axios = require('axios');
const { Keypair, Networks, Memo } = require('stellar-sdk');
// Simulated MPP SDK import for the 2026 protocol
const MPP = require('stellar-mpp-sdk'); 

async function initiateProcurement(drugName) {
    console.log(`🔍 [Scout] Searching regional hubs for ${drugName}...`);
    const supplierUrl = `http://localhost:3000/check-stock?name=${drugName}`;

    try {
        // --- STAGE 1: x402 DISCOVERY ---
        const initialRes = await axios.get(supplierUrl).catch(err => err.response);

        if (initialRes && initialRes.status === 402) {
            console.log(`💰 [x402] Payment Required: ${initialRes.data.price} ${initialRes.data.asset}`);
            
            const userKeypair = Keypair.fromSecret(process.env.BOOTS_SECRET);
            const signature = userKeypair.sign(Buffer.from(drugName)).toString('base64');

            console.log(`✍️  [Scout] Signing Micropayment...`);
            
            const finalRes = await axios.get(supplierUrl, {
                headers: { 'x-stellar-signature': signature }
            });

            console.log(`✅ [x402] DATA UNLOCKED!`);
            const stockInfo = finalRes.data;
            console.log(`📦 Found ${stockInfo.available} units at ${stockInfo.location}`);

            // --- STAGE 2: MPP PROCUREMENT ---
            // If we found stock, we execute the bulk purchase immediately
            if (stockInfo.available > 0) {
                await executeMPPSettlement(stockInfo, drugName);
            }
        }
    } catch (error) {
        console.error("❌ Procurement failed:", error.message);
    }
}

async function executeMPPSettlement(stockInfo, drugName) {
    console.log(`🚛 [MPP] Initiating Autonomous Settlement for ${drugName}...`);
    
    try {
        const mppClient = new MPP.Client({
            network: Networks.TESTNET,
            signingKey: process.env.BOOTS_SECRET
        });

        const batchId = `BATCH-${Math.floor(Math.random() * 10000)}`;

        const purchaseOrder = {
            destination: process.env.SUPPLIER_PUBLIC,
            amount: "50.00", // Example bulk order price
            asset: "USDC",
            memo: Memo.text(`${drugName}:${batchId}`) 
        };

        console.log(`💸 [MPP] Transferring 50.00 USDC to Supplier...`);
        const tx = await mppClient.settle(purchaseOrder);

        console.log(`✨ [SUCCESS] Purchase finalized on Stellar!`);
        console.log(`🔗 TX Hash: ${tx.hash}`);
        console.log(`📝 Tracking ID: ${batchId}`);
    } catch (err) {
        console.error("❌ MPP Settlement Error:", err.message);
    }
}

// Start the sequence
initiateProcurement('Amoxicillin');