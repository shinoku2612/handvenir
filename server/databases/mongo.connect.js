const mongoose = require('mongoose');

function MongoDBConnect(URI) {
    const db = mongoose.createConnection(URI, {
        useNewUrlParser: true,
    });

    // Connected
    db.on('connected', function () {
        console.log(
            `MongoDB connection :: Successfully connected to ${this.name}`,
        );
    });
    // Error
    db.on('error', function (error) {
        console.log(
            `MongoDB connection :: Failed to connect ${this.name} :: ${error.message}`,
        );
        db.close().catch(() => {
            console.log('Closing connection failure');
        });
    });
    // Disconnected
    db.on('disconnected', function () {
        console.log(`Server disconnected from: ${this.name}`);
    });

    return db;
}

module.exports = MongoDBConnect;
