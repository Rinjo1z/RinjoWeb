const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const reviewRoutes = require('./routes/review.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const productRoutes = require('./routes/product.routes');




dotenv.config();

const app = express();

app.use(cors({
    origin: [
        'http://tu-bucket.s3-website-us-east-1.amazonaws.com',  // URL de tu S3
        'http://localhost:4200'  // Para desarrollo local
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

console.log('Connecting to MongoDB...');

const PORT = process.env.PORT || 3000;

app.use('/rinjo', reviewRoutes);
app.use('/rinjo', userRoutes);
app.use('/rinjo', authRoutes);
app.use('/rinjo', productRoutes);
app.use(express.static(path.join(__dirname, '../Front')));
app.use('/public', express.static(path.join(__dirname, 'public')));

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`API LISTA en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
}

start();

