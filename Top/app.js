const express = require("express");
const path = require("path");
const app = express();

// Встановлення шляху до директорії з шаблонами
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Використовуємо статичні файли (CSS, зображення, JS)
app.use(express.static(path.join(__dirname, "public")));

// Дані для відображення (можна перенести в окремий файл, наприклад, data.js)
const data = {
  username: "login",
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
    { name: "TeamSpace",  status: "awaiting" },
    { name: "TeamSpace",  status: "declined" },
    { name: "TeamSpace", status: "accepted" },
  ],
  recentTasks: [
    { title: "Pre-loader and white space UI design", status: "Completed" },
    { title: "Pre-loader and white space UI design", status: "50%" },
  ],activeProjects: [
    { name: "TeamSpace",join_at: "12 July 2024, 15:30", progress: 75 }, 
    { name: "TeamSpace",join_at: "12 July 2024, 15:30", progress: 50 }, 
    { name: "TeamSpace",join_at: "12 July 2024, 15:30", progress: 100 }, 
    { name: "TeamSpace",join_at: "12 July 2024, 15:30", progress: 25 }, 
  ],UserInfo: [
    { email: "email@gmail.com", phone: "+380111111111", status: "php-programmer" },
    { tasks_completed: "150", tasks_left: "30" },
  ],
  job: [
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
      { title: "Sr. UX Designer", company: "Google", location: "New York", experience: "3 Years Exp.", type: "Fulltime", description: "UX Designers are the synthesis of design and development...", posted: "2 days ago", salary: "$50K/mo",  },
  ]  ,

};

// Головна сторінка
app.get("/", (req, res) => {
  res.render("index", { data });
});

// Створення маршруту для інших сторінок
const routes = ['login', 'my_projects', 'my_tasks', 'schedule', 'index', 'recruiters'];

routes.forEach(route => {
  app.get(`/${route}`, (req, res) => {
    res.render(route, { data });
  });
});

// Запуск серверу
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер працює на порті ${PORT}`);
});

// Функція для перемішування масиву
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

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



