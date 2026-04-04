const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB Atlas
const dbURI = "mongodb://sijanpr07_db_user:kjN14VFHwTAciwTA@ac-ehxjvsn-shard-00-00.7f598ix.mongodb.net:27017,ac-ehxjvsn-shard-00-01.7f598ix.mongodb.net:27017,ac-ehxjvsn-shard-00-02.7f598ix.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-u3kf48-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(dbURI)
    .then(() => console.log(" SUCCESS: Connected to MongoDB ATLAS Cloud!"))
    .catch((err) => console.log(" Cloud Connection Error:", err));

// 2. The "Contact Form" Route (The Mailbox)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create a new message object
        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });

        // Save it to the Cloud Database
        await newMessage.save();
        
        res.status(201).json({ success: true, message: "Message saved to Cloud!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});