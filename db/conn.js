const mongoose = require("mongoose");

async function main() {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect("mongodb+srv://thidupin:EhHKF01cna6uvx6n@dupin.98uvxt6.mongodb.net/sistema-inspecao?retryWrites=true&w=majority");
        console.log("MongoDb successfully connected");
    }
    catch (err) {
        console.log(err)
    }

}


module.exports = main;