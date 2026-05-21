const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const passport = require("./config/passport");

const app = express();

/* ======================
   GLOBAL MIDDLEWARE
====================== */

app.use(passport.initialize());

// CORS
app.use(cors());

// JSON parser
app.use(express.json());

// Security
app.use(helmet());

// Rate limit
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

/* ======================
   ROUTES
====================== */

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/employees", require("./routes/employee.routes"));

app.use("/api/holidays", require("./routes/holiday.routes"));

app.use("/api/attendance", require("./routes/attendance.routes"));

app.use("/api/payroll", require("./routes/payroll.routes"));

app.use("/api/analytics", require("./routes/analytics.routes"));

app.use("/api/profile", require("./routes/profile.routes"));

app.use("/api/leaves", require("./routes/leave.routes"));

app.use("/api/company", require("./routes/company.routes"));

app.use("/api/dashboard", require("./routes/dashboard.routes"));

app.use("/api/projects", require("./routes/project.routes"));

app.use(
  "/api/project-analytics",
  require("./routes/project.analytics.routes")
);

app.use("/api/tasks", require("./routes/task.routes"));

// Uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* ======================
   ERROR HANDLER
====================== */

const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);

module.exports = app;