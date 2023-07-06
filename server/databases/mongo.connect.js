const mongoose = require("mongoose");

function MongoDBConnect(URI) {
    const connector = mongoose.createConnection(URI, {
        useNewUrlParser: true,
    });

    // Connected
    connector.on("connected", function () {
        console.log(
            `MongoDB connection :: Successfully connected to ${this.name}`,
        );
    });
    // Error
    connector.on("error", function (error) {
        console.log(
            `MongoDB connection :: Failed to connect ${this.name} :: ${error.message}`,
        );
        connector.close().catch(() => {
            console.log("Closing connection failure");
        });
    });
    // Disconnected
    connector.on("disconnected", function () {
        console.log(`Server disconnected from: ${this.name}`);
    });

    return connector;
}

const ShinPayConnector = MongoDBConnect(process.env.NODE_MONGO_URI);

module.exports = { ShinPayConnector };
