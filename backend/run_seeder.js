import seedDatabase from "./utils/seeder.js";

const run = async () => {
    try {
        await seedDatabase();
        process.exit(0);
    } catch (error) {
        console.error("Run failed:", error);
        process.exit(1);
    }
};

run();
