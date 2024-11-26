console.log("Heroku PORT:", process.env.PORT);
const express = require("express");
const path = require("path");
const app = express();

// Встановлення шляху до директорії з шаблонами
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Використовуємо статичні файли (CSS, зображення, JS)
app.use(express.static(path.join(__dirname, "public")));

// Дані для відображення
const data = {
  username: "Yehor Sotnykov",
  tasks: 2056,
  friends: 25,
  doneProjects: 12,
  activeProjects: [
    { name: "TeamSpace", members: 12, progress: 50, deadline: "12 September 2024" },
    { name: "TeamSpace", members: 12, progress: 25, deadline: "12 September 2024" },
    { name: "TeamSpace", members: 12, progress: 75, deadline: "12 September 2024" },
  ],
  colleagues: [
    { name: "Tony", project: "TeamSpace" },
    { name: "Kirill", project: "TeamSpace" },
    { name: "Momo", project: "TeamSpace" },
  ],
  requests: [
    { name: "TeamSpace", status: "awaiting" },
    { name: "TeamSpace", status: "declined" },
    { name: "TeamSpace", status: "accepted" },
  ],
  recentTasks: [
    { title: "Pre-loader and white space UI design", status: "Completed" },
    { title: "Pre-loader and white space UI design", status: "50%" },
  ],
};

// Головна сторінка
app.get("/", (req, res) => {
  res.render("index", { data });
});
console.log("Heroku PORT:", process.env.PORT);
const PORT = process.env.PORT ; //|| 3000

app.listen(PORT, () => {
    console.log(`Сервер працює на порті ${PORT}`);
});