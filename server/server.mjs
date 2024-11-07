import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import ExpressBrute from 'express-brute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet()); // Helmet should be used here
app.use(morgan('combined'));
app.use(express.json());

// Set up rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

// Express Brute setup
const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5000,    
  maxWait: 10000,
  lifetime: 60 * 60,
});

// MongoDB setup
const mongoURI = 'mongodb+srv://simoneleroux2003:4IKn1Q2kBs44qaoE@apdscluster0.glasn.mongodb.net/APD';
mongoose.set('debug', true);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Schemas
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  idNumber: { type: String, required: true },
  accountNumber: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  provider: { type: String, required: true },
  recipientName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  swiftCode: { type: String, required: true },
  verification: { type: String, default: 'Pending' },
  dateTime: { type: Date, default: Date.now },
});

const PaymentForm = mongoose.model('PaymentForm', paymentSchema);

// Routes
app.post('/api/login', bruteForce.prevent, async (req, res) => {
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
});

app.post('/api/users', async (req, res) => {
  await body('fullName').isLength({ min: 1 }).withMessage('Full name is required').run(req);
  await body('idNumber').isLength({ min: 1 }).withMessage('ID number is required').run(req);
  await body('accountNumber').isLength({ min: 1 }).withMessage('Account number is required').run(req);
  await body('userId').isLength({ min: 1 }).withMessage('User ID is required').run(req);
  await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ userId: req.body.userId });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({ message: 'User added successfully!', user: newUser });
  } catch (error) {
    console.error('Error while adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const newPayment = new PaymentForm(req.body);
    await newPayment.save();
    res.status(201).json({ message: 'Payment added successfully!', payment: newPayment });
  } catch (error) {
    console.error('Error while adding payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all payments with security middleware
app.get('/api/payments', apiLimiter, async (req, res) => {
  try {
    const payments = await PaymentForm.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login route with brute force protection and security middleware
app.post('/api/userLogin', bruteForce.prevent, async (req, res) => {
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
});

// Update payment verification with PUT request
app.put('/api/payments/:id', apiLimiter, async (req, res) => {
  const paymentId = req.params.id;

  try {
    const updatedPayment = await PaymentForm.findByIdAndUpdate(
      paymentId,
      { verification: 'Verified' },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error('Error while verifying payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
