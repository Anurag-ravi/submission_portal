const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
var cron = require('node-cron');
const config = require('./src/config/config');
const Logging = require('./src/utilities/logging');
const router = express();
const passport = require('passport');
const strategies = require('./src/config/passport');
const session = require('express-session');
const bodyParser = require('body-parser');

/** Connect to Mongo */
mongoose
    .set('strictQuery', true)
    .connect(config.MONGODB_URI, {})
    .then(() => {
        Logging.success('Mongo connected successfully.');
        StartServer();
    })
    .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        // Logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        Logging.info(`Incoming - [${req.method}] - [${req.url}]`);

        res.on('finish', () => {
            /** Log the res */
            // Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
            Logging.info(`Result : [${req.method}][${req.url}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });
    /** The code configures an Express.js server with middleware for request data parsing (URL-encoded, JSON), CORS support, and session management.*/
    // router.use(express.urlencoded({ extended: true }));
    router.use(express.urlencoded({ extended: false }));
    router.use(express.json());
    router.use(cors());
    router.use(
        session({
            secret: 'hehe',
            resave: false,
            saveUninitialized: true
        })
    );
    router.use(passport.initialize());
    router.use(passport.session());
    passport.use(strategies.microsoftStrategy);

    /** Routes */
    router.use('/auth', require('./src/routes/auth')); // tested
    router.use('/admin', require('./src/routes/admin')); // tested
    router.use('/course', require('./src/routes/course')); // tested
    router.use('/faculty', require('./src/routes/faculty')); // tested
    router.use('/assignment', require('./src/routes/assignment')); // tested
    router.use('/student', require('./src/routes/student')); // 
    router.use('/submission', require('./src/routes/submission')); // 
    router.use('/feedback', require('./src/routes/feedback')); //
    /** Healthcheck */
    router.get('/', (req, res) => {
        console.log(req.user);
        res.status(200).json({ hello: 'world' });
    });


    const httpServer = http.createServer(router);
    httpServer.listen(config.PORT, () => {
        Logging.verbose(`Server is running on port ${config.PORT}`);
    });
};
