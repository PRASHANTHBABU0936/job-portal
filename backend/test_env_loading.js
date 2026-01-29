import app from "./app.js";

if (process.env.MONGO_URI) {
    console.log("SUCCESS: MONGO_URI is loaded");
} else {
    console.error("FAILURE: MONGO_URI is missing");
}
process.exit(0);
