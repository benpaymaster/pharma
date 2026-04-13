require('dotenv').config();
const express = require('express');
const { Keypair, Asset } = require('stellar-sdk');

const app = express();
const port = 3000;

// Mock Inventory Data
const supplyStock = require('../data/supply-stock.json');

app.get('/check-stock', (req, res) => {
    const drugName = req.query.name;
    const drug = supplyStock.find(d => d.name.toLowerCase() === drugName.toLowerCase());

    if (!drug) {
        return res.status(404).json({ error: "Drug not found in regional supply." });
    }

    // THE X402 LOGIC
    // In a real x402 flow, we return a 402 status and a Stellar invoice.
    // For this hackathon, we'll simulate the "Handshake" requirement.
    const hasPaid = req.headers['x-stellar-signature']; 

    if (!hasPaid) {
        console.log(`[Supplier] Request for ${drugName} received. Demanding x402 Micropayment...`);
        return res.status(402).json({
            message: "Payment Required",
            price: "0.01",
            asset: "USDC",
            destination: process.env.SUPPLIER_PUBLIC,
            memo: `Query Fee: ${drugName}`
        });
    }

    // If paid, reveal the stock
    console.log(`[Supplier] Payment verified. Revealing stock for ${drugName}.`);
    res.json({
        name: drug.name,
        available: drug.available,
        price_per_unit: drug.price_usdc,
        location: "Warehouse-South-1"
    });
});

app.listen(port, () => {
    console.log(`✅ Supplier Agent (PharmaFind Hub) online at http://localhost:${port}`);
});