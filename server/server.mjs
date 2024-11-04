import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS
import { parse } from 'querystring';

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/APD'; // Replace with your actual database name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Define the Employee model
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// Define the User model
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    idNumber: { type: String, required: true },
    accountNumber: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Define the PaymentForm model
const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    provider: { type: String, required: true },
    recipientName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    swiftCode: { type: String, required: true },
    verification: { type: String, default: 'Pending' }, // Existing field
    dateTime: { type: Date, default: Date.now } // Correct way to define a date field
});

const PaymentForm = mongoose.model('PaymentForm', paymentSchema);

const PORT = 3000;

// Create a CORS-enabled server
const requestHandler = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust as needed for production
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT'); // Include PUT in allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Handle login for employees
    if (req.method === 'POST' && req.url === '/api/login') {
        let body = '';

        // Collect data from the request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', async () => {
            const { email, password } = JSON.parse(body);

            // Find the employee by email and password
            try {
                const employee = await Employee.findOne({ email, password }); // You might want to hash the password in real applications
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
        return; // Prevent further processing after handling this request
    }

    // Handle adding a new user
    if (req.method === 'POST' && req.url === '/api/users') {
        let body = '';

        // Collect data from the request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', async () => {
            try {
                const userData = JSON.parse(body);
                
                // Create a new user instance
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
        return; // Prevent further processing after handling this request
    }

    // Handle adding a new payment
    if (req.method === 'POST' && req.url === '/api/payments') {
        let body = '';

        // Collect data from the request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', async () => {
            try {
                const paymentData = JSON.parse(body);
                
                // Create a new payment instance
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
        return; // Prevent further processing after handling this request
    }

    // Handle fetching all payments
    if (req.method === 'GET' && req.url === '/api/payments') {
        try {
            const payments = await PaymentForm.find(); // Fetch all payments from the database
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(payments)); // Send payments back to the client
        } catch (error) {
            console.error('Error fetching payments:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
        return; // Prevent further processing after handling this request
    }

    // Handle user login
if (req.method === 'POST' && req.url === '/api/userLogin') {
    let body = '';

    // Collect data from the request
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', async () => {
        const { fullName, accountNumber, password } = JSON.parse(body);

        // Find the user by fullName, accountNumber, and password
        try {
            const user = await User.findOne({ fullName, accountNumber, password });
            if (!user) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid full name, account number, or password' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User login successful!' }));
        } catch (error) {
            console.error('Error while processing user login:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    });
    return; // Prevent further processing after handling this request
}


    // Handle verifying a payment
    if (req.method === 'PUT' && req.url.startsWith('/api/payments/')) {
        const paymentId = req.url.split('/')[3]; // Extract payment ID from URL
        try {
            const updatedPayment = await PaymentForm.findByIdAndUpdate(
                paymentId,
                { verification: 'Verified' },
                { new: true }
            );

            if (!updatedPayment) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Payment not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedPayment));
        } catch (error) {
            console.error('Error while verifying payment:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
        return;
    }


    // Handle 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
