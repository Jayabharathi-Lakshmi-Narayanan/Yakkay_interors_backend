// const express = require("express");
// const cors = require("cors");
// const config = require("./app/config/config");
// const cookieParser = require("cookie-parser");
// const app = express();
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// require("./app/passport/passportsetup");

// // Enable CORS for all routes
// // app.use(cors());

// var corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type"],
// };
// app.use(cors(corsOptions));

// // Configure cookie session
// app.use(
//   cookieSession({
//     name: "bm-session",
//     keys: ["key1", "key2"],
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );

// // Parse JSON and URL-encoded request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files
// app.use(express.static(__dirname + "/../client/public"));

// // Use cookie parser
// app.use(cookieParser());

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Sync database
// const db = require("./app/models");
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// // Simple route for testing
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to YAKKAY TECHNOLOGIES STORE APP" });
// });

// // Register routes
// require("./app/modules/store/routes/store.routes")(app);
// require("./app/modules/product/routes/product.routes")(app);
// require("./app/modules/authentication/vendor/routes/vendor.routes")(app);
// require("./app/modules/authentication/user/routes/user.routes")(app);
// require("./app/modules/cart/routes/cart.routes")(app);
// require("./app/models/category/routes/category.routes")(app);
// require("./app/modules/order/routes/order.routes")(app); // Ensure this line is present

// // Start the server
// const PORT = config.port || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// }).on('error', (err) => {
//   if (err.code === 'EADDRINUSE') {
//       console.error(`Port ${PORT} is already in use!`);
//       process.exit(1);
//   } else {
//       throw err;
//   }
// });



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
  origin: "*", // Allow all origins (change this to a specific origin in production)
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

// ✅ Add a POST route to handle JSON messages
app.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.json({ receivedMessage: message, status: "Message received successfully!" });
});

// ✅ Register API routes **BEFORE** serving static files

require("./app/modules/authentication/user/routes/user.routes")(app);
require("./app/modules/form/routes/form.routes")(app);
require("./app/crons/cron"); // 👈 Add this to trigger the cron file


// ✅ Serve frontend **AFTER** API routes
app.use(express.static(__dirname + "/../client/public"));

// Start the server on port 89 and bind to 0.0.0.0
const PORT = process.env.PORT || 4001;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use!`);
    process.exit(1);
  } else {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
});

