const { default: mongoose } = require('mongoose');

const connectDB = async () => {

    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/review')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        }); 
    }

module.exports = connectDB;