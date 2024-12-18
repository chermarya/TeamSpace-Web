const express = require("express");
const path = require("path");
const app = express();
const { data, blogData } = require("./data"); // Correctly importing data and blogData

// Set up EJS as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));
// Додаємо папку images як статичну
app.use('/images', express.static(path.join(__dirname, 'images')));
// Array of colors for jobs
const colors = ["blue", "orange", "pink", "yellow"];

// Shuffle colors function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Add colors to job cards
if (Array.isArray(data.job)) {
  data.job = data.job.map((job, index) => {
    if (index % colors.length === 0) shuffleArray(colors);
    return { ...job, color: colors[index % colors.length] };
  });
} else {
  console.error("data.job is not defined or not an array");
}

// Routes
app.get("/index", (req, res) => res.render("index", { data }));
app.get("/blog", (req, res) => res.render("blog", { data, blogData }));
app.get("/my_projects", (req, res) => res.render("my_projects", { data }));
app.get("/my_tasks", (req, res) => res.render("my_tasks", { data }));
app.get("/schedule", (req, res) => res.render("schedule", { data }));
app.get("/recruiters", (req, res) => res.render("recruiters", { data }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
