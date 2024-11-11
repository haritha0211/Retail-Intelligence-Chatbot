require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { z } = require('zod');


const app = express();
app.use(express.json());
// const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(cors());

const PORT = 8000;
const MONGO_URL = "mongodb+srv://ankitkumar20may2003:SUIwZvxuKgopo4eI@cluster0.arsdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(MONGO_URL, { 
        useNewUrlParser: true,
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server is Conected at ${PORT}`));

// mongoose.connect(MONGO_URL)
//     .then(() => { console.log('auth db is connected') })
//     .catch(err => console.log(err));

// User model
const User = mongoose.model("User", {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Zod schemas
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        // Validate request body
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Wrong email ID" });
        }

        // Compare password
        if (password !== user.password) {
            return res.status(400).json({ success: false, error: "Wrong password" });
        }

        // Generate JWT token
        const data = { user: { id: user.id } };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.errors?.[0]?.message || "Invalid input" });
    }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        // console.log("Done");
        
        // Validate request body
        const { email, password } = req.body;
        // console.log(req.body);
        
        
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // console.log(email, password);

            return res.status(400).json({ success: false, error: "Existing user found with the same email address" });
        }

        // Create and save new user
        await User.create({
			email,
			password,
		});
        // const user = new Users({ email, password });
        // await user.save();

        // Generate JWT token
        // const data = { user: { id: user.id } };
        // const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, email });
    }catch (error) {
            console.error("Error details:", error);
            res.status(400).json({ success: false, error: error.message || "Invalid input" });
        }
});

app.get("/", (req, res) => {
    res.send("Express App is Running");
});
