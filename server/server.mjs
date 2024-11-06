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

const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5000,    
  maxWait: 10000,
  lifetime: 60 * 60,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/userLogin', apiLimiter);
app.use('/api/login', apiLimiter);
app.use('/api/users', apiLimiter);
app.use('/api/payments', apiLimiter);

// MongoDB connection string
const mongoURI = 'mongodb+srv://simoneleroux2003:4IKn1Q2kBs44qaoE@apdscluster0.glasn.mongodb.net/APD';
mongoose.set('debug', true);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

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

const requestHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/login') {
    bruteForce.prevent(req, res, () => {
        console.log('Brute force protection activated');
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const { email, password } = JSON.parse(body);

        try {
          const employee = await Employee.findOne({ email, password });
          if (!employee) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid email or password' }));
            return;
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Login successful!' }));
        } catch (error) {
          console.error('Error while processing login:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Internal server error' }));
        }
      });
    });
    return;
  }

  

if (req.method === 'POST' && req.url === '/api/users') {
  let bodyData = '';

  // Collect the data chunks
  req.on('data', chunk => {
    bodyData += chunk.toString();
  });

  req.on('end', async () => {
    try {
      // Parse the request body
      const userData = JSON.parse(bodyData);
      req.body = userData;  // Attach `userData` to `req.body` for `express-validator`

      // Set up validation
      await body('fullName').isLength({ min: 1 }).withMessage('Full name is required').run(req);
      await body('idNumber').isLength({ min: 1 }).withMessage('ID number is required').run(req);
      await body('accountNumber').isLength({ min: 1 }).withMessage('Account number is required').run(req);
      await body('userId').isLength({ min: 1 }).withMessage('User ID is required').run(req);
      await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

      // Collect validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errors: errors.array() }));
        return;
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ userId: userData.userId });
      if (existingUser) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User already exists.' }));
        return;
      }

      // Create and save the new user
      const newUser = new User(userData);
      await newUser.save();

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User added successfully!', user: newUser }));
      
    } catch (error) {
      console.error('Error while adding user:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal server error' }));
    }
  });
  return;
}


  if (req.method === 'POST' && req.url === '/api/payments') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const paymentData = JSON.parse(body);

        const newPayment = new PaymentForm(paymentData);
        await newPayment.save();

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Payment added successfully!', payment: newPayment }));
      } catch (error) {
        console.error('Error while adding payment:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 Not Found</h1>');
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
