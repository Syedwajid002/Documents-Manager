"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const dbconfig_1 = require("../config/dbconfig");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the .env file.");
    process.exit(1);
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const db = (0, dbconfig_1.getDb)();
        const usersCollection = db.collection('users'); // Assuming 'users' collection
        // 1. Find the user by email
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials (user not found)' });
        }
        // 2. Compare the provided password with the stored hashed password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials (password mismatch)' });
        }
        // 3. Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, // Payload for the token
        JWT_SECRET, { expiresIn: '1h' } // Token expires in 1 hour
        );
        // 4. Send back the token and user info (without the password hash)
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                // Include other non-sensitive user data here
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
};
exports.loginUser = loginUser;
// --- Optional: Registration (for demonstration) ---
const registerUser = async (req, res) => {
    const { email, password, role = 'user' } = req.body; // Default role to 'user'
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const db = (0, dbconfig_1.getDb)();
        const usersCollection = db.collection('users');
        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }
        // Hash the password before saving
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const newUser = {
            email,
            password: hashedPassword,
            role: role, // Ensure role type safety
        };
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertedId,
            user: { email: newUser.email, role: newUser.role }
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};
exports.registerUser = registerUser;
