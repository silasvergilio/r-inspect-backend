const mongoose = require("mongoose");

async function main() {
    try {
        const connectionString = process.env.MONGO_CONNECTION_STRING;
        
        if (!connectionString) {
            throw new Error("MONGO_CONNECTION_STRING not found");
        }

        mongoose.set("strictQuery", true)
        await mongoose.connect(connectionString);
        console.log("MongoDb successfully connected");
    }
    catch (err) {
        console.log(err)
    }

}


module.exports = main;