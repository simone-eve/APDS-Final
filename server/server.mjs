import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors'; 
import { parse } from 'querystring';
import ExpressBrute from 'express-brute';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined')); 
app.use(express.json());

// MongoDB connection string
const mongoURI = 'your_mongo_uri_here';
mongoose.set('debug', true);

const store = new ExpressBrute.MemoryStore(); 
const bruteForce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 60 * 60 * 1000,  
  maxWait: 60 * 60 * 1000, 
  lifetime: 60 * 60, 
});

// Rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Models
// Define your models (Employee, User, PaymentForm) here...

const PORT = 3000;

// Create a CORS-enabled server
const requestHandler = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Handle employee login with brute force and rate limit protection
    if (req.method === 'POST' && req.url === '/api/login') {
        bruteForce.prevent(req, res, () => {
            apiLimiter(req, res, () => {
                let body = '';
                req.on('data', chunk => body += chunk.toString());

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
                        console.error('Error during login:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Internal server error' }));
                    }
                });
            });
        });
        return;
    }

    // User registration with validation and brute-force protection
    if (req.method === 'POST' && req.url === '/api/users') {
        bruteForce.prevent(req, res, () => {
            let body = '';

            req.on('data', chunk => body += chunk.toString());
            
            req.on('end', async () => {
                try {
                    const userData = JSON.parse(body);

                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ errors: errors.array() }));
                        return;
                    }

                    const { fullName, idNumber, accountNumber, userId, password } = userData;
                    if (!fullName || !idNumber || !accountNumber || !userId || !password) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'All fields are required.' }));
                        return;
                    }

                    const existingUser = await User.findOne({ userId });
                    if (existingUser) {
                        res.writeHead(409, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'User already exists.' }));
                        return;
                    }

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
        });
        return;
    }

    // Other handlers...

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
};

const server = http.createServer(requestHandler);
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
