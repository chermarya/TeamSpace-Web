const express = require("express");
const path = require("path");
const app = express();
const { data, blogData, settings } = require('./public/js/data.js');

// Set up EJS as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));
// Додаємо папку images як статичну
app.use('/images', express.static(path.join(__dirname, 'images')));
// Array of colors for jobs
// const colors = ["blue", "orange", "pink", "yellow"];

// Shuffle colors function
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }


// Add colors to job cards
// if (Array.isArray(data.job)) {
//   data.job = data.job.map((job, index) => {
//     if (index % colors.length === 0) shuffleArray(colors);
//     return { ...job, color: colors[index % colors.length] };
//   });
// } else {
//   console.error("data.job is not defined or not an array");
// }
      // Масив кольорів
const colors = ["blue", "orange", "pink", "yellow"];

// Функція для перемішування масиву кольорів
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Обмін елементів
  }
}

// Додаємо кольори до карток без повторень у рядку
data.job = data.job.map((job, index) => {
  if (index % colors.length === 0) shuffleArray(colors); // Перемішати кольори на початку кожного ряду
  return { ...job, color: colors[index % colors.length] }; // Додаємо кольори по індексу
});


app.get("/index", (req, res) => res.render("index", { data }));
app.get("/blog", (req, res) => res.render("blog", { data, blogData }));
app.get("/my_projects", (req, res) => res.render("my_projects", { data }));
app.get("/my_tasks", (req, res) => res.render("my_tasks", { data }));
app.get("/schedule", (req, res) => res.render("schedule", { data }));
app.get("/recruiters", (req, res) => res.render("recruiters", { data }));
app.get("/login", (req, res) => res.render("login", { data }));
app.get("/settings", (req, res) => res.render("settings", { data , settings}));
app.get("/create_an-account", (req, res) => res.render("create_an-account", {  }));
app.get("/forgot_password", (req, res) => res.render("forgot_password", {  }));


app.get('/api/profile', (req, res) => {
  // Возвращаем данные профиля
  res.json(data);
});


app.get('/api/settings', (req, res) => {
  res.json(settings); // Ensure settings is imported and structured correctly
});

// app.post('/api/settings/update', (req, res) => {
//   const keys = Object.keys(req.body);

//   keys.forEach(key => {
//     if (settings.hasOwnProperty(key)) {
//       settings[key] = req.body[key];
//     }
//   });

//   res.json({ success: true, message: 'Settings updated', updatedKeys: keys });
// });

// app.post('/api/settings/change-password', (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   // Replace this with your actual password validation and update logic
//   if (currentPassword === settings.password) { // Assuming you store the current password in settings
//     settings.password = newPassword;
//     res.json({ success: true, message: 'Password changed successfully' });
//   } else {
//     res.status(400).json({ success: false, message: 'Current password is incorrect' });
//   }
// });





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
