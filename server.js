// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MSAL Configuration
const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
        clientSecret: process.env.CLIENT_SECRET,
    },
};

const cca = new ConfidentialClientApplication(msalConfig);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle user registration (Self-Service Sign-Up)
app.get('/register', async (req, res) => {
    try {
        const redirectUri = 'http://localhost:3000/redirect';

        const authUrl = await cca.getAuthCodeUrl({
            redirectUri: redirectUri,
            scopes: ['openid', 'profile', 'User.Read'],
            prompt: 'create', // Forces user registration if not signed in
        });

        res.redirect(authUrl);
    } catch (error) {
        console.error('Error generating registration link:', error);
        res.status(500).send('Registration failed.');
    }
});

// Route for login (Sign-In with Entra ID)
app.get('/login', async (req, res) => {
    try {
        const redirectUri = 'http://localhost:3000/redirect';

        const authUrl = await cca.getAuthCodeUrl({
            redirectUri: redirectUri,
            scopes: ['openid', 'profile', 'User.Read'],
        });

        res.redirect(authUrl);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login failed.');
    }
});

// Handle the OAuth2 redirect and get user tokens
app.get('/redirect', async (req, res) => {
    try {
        if (!req.query.code) {
            return res.status(400).send('Missing authorization code.');
        }

        const tokenResponse = await cca.acquireTokenByCode({
            code: req.query.code,
            scopes: ['openid', 'profile', 'User.Read'],
            redirectUri: 'http://localhost:3000/redirect',
        });

        console.log('User Info:', tokenResponse.account);

        // Example: Store user info in session or database (if needed)
        // session.user = tokenResponse.account;

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error during token acquisition:', error);
        res.status(500).send('Login/Registration failed.');
    }
});

// Dashboard route (Example)
app.get('/dashboard', (req, res) => {
    res.send('<h1>Welcome to the Dashboard!</h1>'); // Customize this page as needed
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
