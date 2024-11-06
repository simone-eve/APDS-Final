import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import { parse } from 'querystring';
import ExpressBrute from 'express-brute';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://simoneleroux2003:4IKn1Q2kBs44qaoE@apdscluster0.glasn.mongodb.net/APD';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error:', error));

// Define models
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const Employee = mongoose.model('Employee', employeeSchema);

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    idNumber: { type: String, required: true },
    accountNumber: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Security middlewares
const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 60 * 60 * 1000,
  maxWait: 60 * 60 * 1000,
  lifetime: 60 * 60
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limit and brute-force protection for login routes
app.use('/api/login', bruteForce.prevent, apiLimiter);
app.use('/api/userLogin', bruteForce.prevent, apiLimiter);

// Login endpoint with validation
app.post('/api/login',
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const employee = await Employee.findOne({ email, password });
      if (!employee) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      console.error('Error while processing login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// User login endpoint with validation
app.post('/api/userLogin',
  body('fullName').isString().withMessage('Full name is required'),
  body('accountNumber').isString().withMessage('Account number is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, accountNumber, password } = req.body;
    try {
      const user = await User.findOne({ fullName, accountNumber, password });
      if (!user) {
        return res.status(401).json({ message: 'Invalid full name, account number, or password' });
      }
      res.status(200).json({ message: 'User login successful!' });
    } catch (error) {
      console.error('Error while processing user login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Create HTTP server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
