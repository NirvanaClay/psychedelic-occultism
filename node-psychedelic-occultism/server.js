const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const bcrypt = require('bcryptjs');

// Initialize Express app
const app = express();
const port = 3001;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Routes
const spiritualityRoutes = require('./routes/spiritualityRoutes');
// console.log('Spirituality routes loaded:', spiritualityRoutes);

const authRoutes = require('./controllers/userController')

const treeElementRoutes = require('./routes/treeRoutes');

// const userRoutes = require('./routes/userRoutes');
// console.log('User routes loaded:', userRoutes);

const testPasswordComparison = async () => {
  const providedPassword = 'yourPlainTextPassword'; // Replace with the plain text password you typed
  const hashedPassword = 'yourHashedPasswordFromDB'; // Replace with the hashed password from the DB

  const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
  console.log('Does the password match?', isMatch);
};

testPasswordComparison();

// // Use routes
app.use('/api/spirituality', spiritualityRoutes);
// app.use('/api/auth', userRoutes);

app.use('/api/auth', authRoutes)

app.use('/api/tree', treeElementRoutes);


// Root route
app.get('/', (req, res) => {
  res.send("Hello world.");
});

// Start server
app.listen(port, () => {
  console.log(`Psychedelic occultism listening on port ${port}.`);
});
