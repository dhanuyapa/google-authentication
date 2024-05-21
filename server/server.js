const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

// Connecting to DATABASE ->>
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        // <- Using Mongoose Connection
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('DB CONNECTION FAILED');
        console.log('ERR: ', err);
    });

// Catching uncaught exception ->>
process.on('uncaughtException', (err) => {
    console.log(`UNCAUGHT EXCEPTION -> ${err.name} - ${err.message}`);
    console.log('App SHUTTING DOWN...');
    process.exit(1); // <- Then will shut down the server.
});

// Starting Server ->>
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running at port`, (`${port}`), '...');
});

// Catching unhandled promise rejections ->>
process.on('unhandledRejection', (err) => {
    console.log(`UNHANDLED REJECTION -> ${err.name} - ${err.message}`);
    console.log('App SHUTTING DOWN...');
    server.close(() => {
        process.exit(1);
    });
});
