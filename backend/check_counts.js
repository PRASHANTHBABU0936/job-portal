import mongoose from "mongoose";
import { User } from "./models/userSchema.js";
import { Job } from "./models/jobSchema.js";
import { config } from "dotenv";

config({ path: "backend/config/config.env" });

const checkCounts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "JOB_PORTAL_WITH_AUTOMATION",
        });

        const userCount = await User.countDocuments();
        const jobCount = await Job.countDocuments();

        console.log(`User Count: ${userCount}`);
        console.log(`Job Count: ${jobCount}`);

        await mongoose.connection.close();
    } catch (error) {
        console.error("Error checking counts:", error);
    }
};

checkCounts();
