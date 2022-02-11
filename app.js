const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const viewRoute = require("./routes/viewRoutes");
const errorController = require("./controller/errorController");
const ApiError = require("./utils/apiError");

const app = express();

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// serving static files
app.use(express.static(path.join(__dirname, "public")));

// set security HTPP headers
app.use(helmet());

app.use(cors());

app.options("*", cors());

// body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSql query injecitgon
app.use(mongoSanitize());

// data sanitization against xss
app.use(xss());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// limit requests from same API

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use("/", viewRoute);
app.use("/api/v1/users", userRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorController);

module.exports = app;
