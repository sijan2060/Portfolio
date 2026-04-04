const mongoose = require('mongoose');

// This defines the structure of the data we will save
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Automatically adds the date
});

// Export this model so we can use it in server.js
module.exports = mongoose.model('Message', messageSchema);