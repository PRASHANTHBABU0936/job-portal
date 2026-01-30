// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { connection } from "./middlewares/database/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import fileUpload from "express-fileupload";
// import userRouter from "./routes/userRouter.js";
// import jobRouter from "./routes/jobRouter.js";
// import applicationRouter from "./routes/applicationRouter.js";
// import { newsLetterCron } from "./automation/newsLetterCron.js";


// const app = express();
// config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like Postman)
//       if (!origin) return callback(null, true);

//       return callback(null, true);
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );



// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);

// newsLetterCron()
// connection();
// app.use(errorMiddleware);

// export default app;







// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// // import { connection } from "./middlewares/database/connection.js";
// import { errorMiddleware } from "./middlewares/error.js";
// import fileUpload from "express-fileupload";
// import userRouter from "./routes/userRouter.js";
// import jobRouter from "./routes/jobRouter.js";
// import applicationRouter from "./routes/applicationRouter.js";
// // import { newsLetterCron } from "./automation/newsLetterCron.js";
// // newsLetterCron();

// const app = express();
// config({ path: "./.env" });

// /* =========================
//    CORS – FINAL & CORRECT
//    ========================= */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   process.env.FRONTEND_URL,
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (Postman, server-to-server)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );

// // IMPORTANT: handle preflight requests
// app.options("*", cors());

// /* ========================= */

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// app.get("/api/v1/health", (req, res) => {
//   res.status(200).json({ success: true, message: "Server is running" });
// });

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);

// // TEMPORARY SEEDING ROUTE
// import seedDatabase from "./utils/seeder.js";
// app.post("/api/v1/seed", async (req, res) => {
//   try {
//     await seedDatabase();
//     res.status(200).json({ success: true, message: "Seeding completed successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Seeding failed", error: error.message });
//   }
// });

// // newsLetterCron();
// // connection(); // Moved to server.js
// app.use(errorMiddleware);

// export default app;



import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
config({ path: "./.env" });

/* =========================
   CORS – FINAL FIX (VERCEL + LOCAL)
   ========================= */
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, server-to-server, cron jobs
      if (!origin) return callback(null, true);

      // Allow local development
      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      // Allow ALL Vercel preview + production URLs
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // Block everything else
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Handle preflight requests
app.options("*", cors());

/* ========================= */

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Health check
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Error middleware
app.use(errorMiddleware);

export default app;
