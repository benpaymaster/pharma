// Quick mock toggle for the morning demo
const isOffline = process.env.NEXT_PUBLIC_OFFLINE_MODE === 'true';
const pharmacyData = isOffline 
  ? require('../../data/pharmacy_nodes.json') 
  : fetchFromLedger(); // Your future live call