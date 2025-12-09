const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const reviewRoutes = require('./routes/review.routes');
const userRoutes = require('./routes/user.routes');
const middleware = require('./routes/middleware')
const authRoutes = require('./routes/authRoutes');
const path = require('path');



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log('Connecting to MongoDB...');

const PORT = process.env.PORT || 3000;

app.use('/rinjo', reviewRoutes);
app.use('/rinjo', userRoutes);
app.use('/rinjo', middleware);
app.use('/rinjo', authRoutes);
app.use(express.static(path.join(__dirname, '../Front')));

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`API LISTA en http://localhost:${PORT}`);});
    }catch(err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
        }
    }

start();

