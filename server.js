const express = require("express");
const cors = require("cors");
const config = require("./app/config/config");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./app/passport/passportsetup");

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: "*", // Allow all origins (consider restricting this in production)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Configure cookie session
app.use(
  cookieSession({
    name: "bm-session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cookie parser
app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Sync database
const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("✅ Synced database successfully.");
  })
  .catch((err) => {
    console.error("❌ Database sync failed: " + err.message);
  });

// Simple GET route for testing
app.get("/", (req, res) => {
  res.json({ message: "Welcome to YAKKAY TECHNOLOGIES STORE APP" });
});

// POST route to handle JSON messages
app.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.json({ receivedMessage: message, status: "Message received successfully!" });
});

// Register API routes **BEFORE** serving static files
require("./app/modules/authentication/user/routes/user.routes")(app);
require("./app/modules/form/routes/form.routes")(app);
require("./app/modules/form/routes/get_quote_form.routes.js")(app);
require("./app/crons/cron"); // Trigger the cron jobs

// Serve frontend **AFTER** API routes
app.use(express.static(__dirname + "/../client/public"));

// Start the server on port and bind to 0.0.0.0
const PORT = process.env.PORT || 4001;
const HOST = "0.0.0.0";

app
  .listen(PORT, HOST, () => {
    console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use!`);
      process.exit(1);
    } else {
      console.error("❌ Error starting server:", err);
      process.exit(1);
    }
  });
