import mongoose from "mongoose";

export const connection = () => {
    if (!process.env.MONGO_URI) {
        console.error("ERROR: MONGO_URI is not defined in the environment variables.");
        return Promise.reject("MONGO_URI missing");
    }

    return mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_PORTAL_WITH_AUTOMATION",
    })
        .then(() => {
            console.log("Connected to database.");
        })
        .catch((err) => {
            console.log(`Some error occured while connecting to database: ${err}`);
            throw err; // Re-throw to be caught in server.js
        });
};