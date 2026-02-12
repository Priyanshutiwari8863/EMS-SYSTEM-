const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const app = express();
const passport = require("./config/passport");


/* ======================
   GLOBAL MIDDLEWARE
====================== */

app.use(passport.initialize());

// ✅ CORS
app.use(cors());

// ✅ JSON body parser (VERY IMPORTANT)
app.use(express.json());

// ✅ SECURITY HEADERS
app.use(helmet());

// ✅ RATE LIMIT (ANTI HACK)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // max requests per IP
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

app.use("/uploads", express.static("uploads"));
app.use("/api/profile", require("./routes/profile.routes"));

app.use("/api/leaves", require("./routes/leave.routes"));

app.use("/api/company", require("./routes/company.routes"));

app.use("/api/dashboard", require("./routes/dashboard.routes"));


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/projects", require("./routes/project.routes"));

app.use("/api/project-analytics", require("./routes/project.analytics.routes"));

app.use("/api/tasks", require("./routes/task.routes"));


/* ======================
   GLOBAL ERROR HANDLER
====================== */

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
