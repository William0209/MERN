const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const {
  requireAuth,
  checkUser,
} = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://janssenwilliam02:Tildewille00@smoothie.5k26p.mongodb.net/node-auth";
const port = process.env.PORT || 3000;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log(
      "Connected to the database"
    );
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}`
      );
    });
  })
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) =>
  res.render("home")
);
app.get(
  "/smoothies",
  requireAuth,
  (req, res) => res.render("smoothies")
);
app.use(authRoutes);
