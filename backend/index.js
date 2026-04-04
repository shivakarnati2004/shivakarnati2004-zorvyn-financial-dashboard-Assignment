import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'transactions.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
};

// Helper to write data
const writeData = async (data) => {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data:', error);
    }
};

// --- Routes ---

// Get all transactions
app.get('/api/transactions', async (req, res) => {
    const transactions = await readData();
    // Sort by date desc
    const sorted = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(sorted);
});

// Add transaction
app.post('/api/transactions', async (req, res) => {
    const transactions = await readData();
    const newTx = {
        ...req.body,
        id: `t${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    transactions.push(newTx);
    await writeData(transactions);
    res.status(201).json(newTx);
});

// Update transaction
app.put('/api/transactions/:id', async (req, res) => {
    const { id } = req.params;
    let transactions = await readData();
    const index = transactions.findIndex(tx => tx.id === id);
    
    if (index !== -1) {
        transactions[index] = { ...transactions[index], ...req.body };
        await writeData(transactions);
        res.json(transactions[index]);
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

// Delete transaction
app.delete('/api/transactions/:id', async (req, res) => {
    const { id } = req.params;
    let transactions = await readData();
    const filtered = transactions.filter(tx => tx.id !== id);
    
    if (filtered.length !== transactions.length) {
        await writeData(filtered);
        res.json({ message: 'Deleted successfully' });
    } else {
        res.status(404).json({ message: 'Transaction not found' });
    }
});

// --- Serve Frontend Static Build ---
const buildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
