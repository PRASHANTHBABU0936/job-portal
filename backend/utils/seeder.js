import mongoose from "mongoose";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { config } from "dotenv";
import { faker } from "@faker-js/faker";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: "./config/config.env" });

const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Architecture",
    "IT Consulting",
];

const seedDatabase = async () => {
    const cities = [
        "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
        "Hyderabad", "Quetta", "Peshawar", "Sialkot", "Gujranwala", "Sargodha",
        "Bahawalpur", "Sukkur", "Mardan", "Mingora", "Sheikhupura", "Mandi Bahauddin",
        "Larkana", "Nawabshah"
    ];

    try {
        console.log("Loading config from:", path.join(__dirname, "../config/config.env"));
        console.log("MONGO_URI present:", !!process.env.MONGO_URI);
        // console.log("MONGO_URI:", process.env.MONGO_URI); // UNCOMMENT FOR DEBUGGING ONLY IF SAFE

        if (mongoose.connection.readyState === 0) {
            console.log("Connecting to Database...");
            await mongoose.connect(process.env.MONGO_URI, {
                dbName: "JOB_PORTAL_WITH_AUTOMATION", // Ensure this matches your actual DB name or env
                serverSelectionTimeoutMS: 10000,
            });
            console.log("Connected to Database for Seeding...");
        } else {
            console.log("Using existing database connection.");
        }

        console.log("Clearing existing data...");
        await Job.deleteMany({});
        await User.deleteMany({});
        console.log("Data cleared.");

        // --- 1. Create Employers ---
        const employerCount = 50;
        const employers = [];
        console.log(`Creating ${employerCount} Employers...`);

        for (let i = 0; i < employerCount; i++) {
            const employer = await User.create({
                name: (faker.company.name() + " Recruiter").substring(0, 30),
                email: faker.internet.email(),
                phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
                address: faker.helpers.arrayElement(cities),
                password: "password123",
                role: "Employer",
                niches: {
                    firstNiche: faker.helpers.arrayElement(nichesArray),
                    secondNiche: faker.helpers.arrayElement(nichesArray),
                    thirdNiche: faker.helpers.arrayElement(nichesArray),
                }
            });
            employers.push(employer);
        }
        console.log("Employers created.");

        // --- 2. Create Job Seekers ---
        const seekerCount = 100;
        console.log(`Creating ${seekerCount} Job Seekers...`);

        for (let i = 0; i < seekerCount; i++) {
            await User.create({
                name: faker.person.fullName().substring(0, 30),
                email: faker.internet.email(),
                phone: faker.number.int({ min: 1000000000, max: 9999999999 }),
                address: faker.helpers.arrayElement(cities),
                password: "password123",
                role: "Job Seeker",
                niches: {
                    firstNiche: faker.helpers.arrayElement(nichesArray),
                    secondNiche: faker.helpers.arrayElement(nichesArray),
                    thirdNiche: faker.helpers.arrayElement(nichesArray),
                },
                coverLetter: faker.lorem.paragraph() + "\n\nI am skilled in ensuring 99.9% uptime and seamless user experience.",
            });
        }
        console.log("Job Seekers created.");

        // --- 3. Create Jobs ---
        const jobCount = 600;
        console.log(`Creating ${jobCount} Job Listings...`);

        const nicheTitles = {
            "Software Development": ["Software Engineer", "Backend Developer", "Full Stack Engineer", "Software Architect", "Junior Developer"],
            "Web Development": ["Frontend Developer", "Web Developer", "React Developer", "Angular Specialist", "Wordpress Developer"],
            "Cybersecurity": ["Security Analyst", "Ethical Hacker", "Information Security Manager", "Penetration Tester", "Cybersecurity Consultant"],
            "Data Science": ["Data Scientist", "Data Analyst", "Machine Learning Engineer", "BI Analyst", "Data Engineer"],
            "Artificial Intelligence": ["AI Researcher", "AI Engineer", "Computer Vision Engineer", "NLP Specialist", "Robotics Engineer"],
            "Cloud Computing": ["Cloud Architect", "Cloud Engineer", "AWS Specialist", "Azure Consultant", "DevOps Engineer"],
            "DevOps": ["DevOps Engineer", "Site Reliability Engineer", "Platform Engineer", "CI/CD Specialist", "Infrastructure Engineer"],
            "Mobile App Development": ["iOS Developer", "Android Developer", "Flutter Developer", "React Native Developer", "Mobile Architect"],
            "Blockchain": ["Blockchain Developer", "Smart Contract Engineer", "Crypto Analyst", "Blockchain Architect", "Solidity Developer"],
            "Database Administration": ["Database Administrator", "SQL Developer", "Data Architect", "NoSQL Specialist", "Oracle DBA"],
            "Network Administration": ["Network Engineer", "Systems Administrator", "Network Security Specialist", "Cisco Engineer", "Network Analyst"],
            "UI/UX Design": ["UI/UX Designer", "Product Designer", "User Researcher", "Visual Designer", "Interaction Designer"],
            "Game Development": ["Game Developer", "Unity Developer", "Unreal Engine Developer", "Game Designer", "3D Animator"],
            "IoT (Internet of Things)": ["IoT Engineer", "Embedded Systems Engineer", "Firmware Engineer", "IoT Solutions Architect", "IoT Security Specialist"],
            "Big Data": ["Big Data Engineer", "Hadoop Specialist", "Spark Developer", "Data Warehouse Architect", "ETL Developer"],
            "Machine Learning": ["ML Engineer", "Deep Learning Specialist", "Data Scientist", "AI Researcher", "NLP Engineer"],
            "IT Project Management": ["IT Project Manager", "Scrum Master", "Product Owner", "Technical Program Manager", "Agile Coach"],
            "IT Support and Helpdesk": ["IT Support Specialist", "Help Desk Technician", "System Administrator", "Desktop Support", "Technical Support Engineer"],
            "Systems Architecture": ["Systems Architect", "Solution Architect", "Enterprise Architect", "Infrastructure Architect", "Technical Lead"],
            "IT Consulting": ["IT Consultant", "Technology Strategist", "Digital Transformation Consultant", "Business Analyst", "IT Auditor"]
        };

        const jobs = [];
        for (let i = 0; i < jobCount; i++) {
            const randomEmployer = faker.helpers.arrayElement(employers);
            const jobNiche = faker.helpers.arrayElement(nichesArray);
            const jobCity = faker.helpers.arrayElement(cities);
            const validTitles = nicheTitles[jobNiche] || ["Software Engineer"];
            const jobTitle = faker.helpers.arrayElement(validTitles);

            jobs.push({
                title: jobTitle,
                jobType: faker.helpers.arrayElement(["Full-time", "Part-time"]),
                location: jobCity,
                companyName: randomEmployer.name.replace(" Recruiter", ""), // Use employer name as company
                introduction: faker.lorem.sentences(2),
                responsibilities: faker.lorem.paragraph() + " Focus on ensuring 99.9% uptime and seamless user experience.",
                qualifications: faker.lorem.sentences(3),
                salary: faker.finance.amount({ min: 40000, max: 150000, dec: 0, symbol: '$' }),
                hiringMultipleCandidates: faker.helpers.arrayElement(["Yes", "No"]),
                jobNiche: jobNiche,
                postedBy: randomEmployer._id,
                jobPostedOn: faker.date.recent({ days: 30 }),
                personalWebsite: {
                    title: "Company Website",
                    url: faker.internet.url()
                },
                offers: faker.lorem.sentences(1),
            });
        }

        await Job.insertMany(jobs);
        console.log(`Successfully added ${jobs.length} jobs to the database.`);

        console.log("Seeding Complete!");
        // We don't exit process effectively here if running via app, but okay for now to just return
        return;
    } catch (error) {
        console.error("Seeding Failed:", error);
        // process.exit(1); // Don't crash the server
    }
};

export default seedDatabase;
