const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/submission_portal';
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const JWT_SECRET = process.env.JWT_SECRET || 'nclshfcnz,cOIDEUWEC^%&@^*&ww*(@yIWEUN';
const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

module.exports = {
    PORT,
    MONGODB_URI,
    SALT_ROUNDS,
    JWT_SECRET,
    MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET,
    FRONTEND_URL,
    BACKEND_URL,
    EMAIL,
    PASSWORD
}