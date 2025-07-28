
import { Request, Response } from 'express';
import { getDb } from '../config/dbconfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Collection } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the .env file.");
    process.exit(1);
}

interface User {
    _id?: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const db = getDb();
        const usersCollection: Collection<User> = db.collection('users');

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials (user not found)' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials (password mismatch)' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const db = getDb();
        const usersCollection: Collection<User> = db.collection('users');

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: User = {
            email,
            password: hashedPassword,
            role: role as 'admin' | 'user',
        };

        const result = await usersCollection.insertOne(newUser);

        res.status(201).json({
            message: 'User registered successfully',
            userId: result.insertedId,
            user: { email: newUser.email, role: newUser.role }
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};