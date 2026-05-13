const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./utils/ApiError");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const cvRoutes = require("./routes/cv.routes");
const aiRoutes = require("./routes/ai.routes");
const pdfRoutes = require("./routes/pdf.routes");

const app = express();
require("dotenv").config();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resumes", cvRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);

// Catch-all 404 Handler
app.use((req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;