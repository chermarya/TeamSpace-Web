const API_BASE_URL = "https://b2e6-2a01-c23-94c7-3400-f896-19e7-4b9d-b308.ngrok-free.app";
import express from 'express';
import fetch from "node-fetch";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";
// Ініціалізація __filename та __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Вкажіть свій домен
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Налаштування EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

function ensureUser(req, res, next) {
  const user_id = parseInt(req.cookies.user_id, 10);

  if (!user_id || isNaN(user_id)) {
    console.error('Invalid or missing user_id');
    return res.redirect('/login');
  }

  req.user_id = user_id;
  next();
}



// Маршрут для входу
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});



app.get('/example', (req, res) => {
  const user_id = req.cookies.user_id;
  res.send(`User ID from cookie: ${user_id}`);
});

app.use((req, res, next) => {
  req.user_id = req.cookies.user_id || null;
  next();
});









// const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ email, password }),
//   credentials: 'include', 
// });
// document.cookie = `user_id=${data.user.user_id}; path=/;`;

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.get('/example', (req, res) => {
//   const user_id = req.cookies.user_id;
//   res.send(`User ID from cookie: ${user_id}`);
// });


// app.use('/images', express.static(path.join(__dirname, 'images')));





// async function fetchData(endpoint) {
//   try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }

// Маршрути для рендерингу сторінок
// app.get("/", async (req, res) => {
//   const data = await fetchData("/api/profile");
//   res.render("index", { data });
// });








app.get('/index', ensureUser, async (req, res) => {
  const user_id = req.user_id; // Отримуємо user_id з middleware
  if (!user_id) {
    console.error('User ID not found');
    return res.redirect('/login');
  }

  try {
    console.log(`Fetching data for user_id: ${user_id}`);

    // Отримання даних користувача
    const userResponse = await fetch(`${API_BASE_URL}/api/getUserById/${user_id}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.statusText}`);
    }
    const user = await userResponse.json();

    // Отримання статистики
    const statsResponse = await fetch(`${API_BASE_URL}/api/getStatsByUserId/${user_id}`);
    if (!statsResponse.ok) {
      throw new Error(`Failed to fetch stats: ${statsResponse.statusText}`);
    }
    const stats = await statsResponse.json();

    // Отримання колег
    const colleaguesResponse = await fetch(`${API_BASE_URL}/api/getColleaguesByUserId/${user_id}`);
if (!colleaguesResponse.ok) {
  const errorText = await colleaguesResponse.text();
  console.error(`Failed to fetch colleagues: ${colleaguesResponse.status} - ${errorText}`);
  throw new Error(`Failed to fetch colleagues: ${colleaguesResponse.statusText}`);
}

    const colleagues = await colleaguesResponse.json();

    // Отримання запитів
    const requestsResponse = await fetch(`${API_BASE_URL}/api/getAllRequestsByUserId/${user_id}`);
    if (!requestsResponse.ok) {
      throw new Error(`Failed to fetch requests: ${requestsResponse.statusText}`);
    }
    const requests = await requestsResponse.json();

    // Отримання проектів
    const projectsResponse = await fetch(`${API_BASE_URL}/api/getAllActiveProjectsByUserId/${user_id}`);
    if (!projectsResponse.ok) {
      throw new Error(`Failed to fetch active projects: ${projectsResponse.statusText}`);
    }
    const activeProjects = await projectsResponse.json();

    // Рендер сторінки
    res.render('index', {
      title: 'Головна сторінка',
      full_name: user.full_name,
      stats: stats[0],
      colleagues,
      requests,
      activeProjects,
    });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.redirect('/login');
  }
});





app.get('/my_projects', ensureUser, async (req, res) => {
  const user_id = req.user_id; // Retrieve user ID from middleware
  

  try {
    // Fetch user data
    const userResponse = await fetch(`${API_BASE_URL}/api/getUserById/${user_id}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }
    const user = await userResponse.json();

    // Fetch active projects
    const projectsResponse = await fetch(`${API_BASE_URL}/api/getAllActiveProjectsByUserId/${user_id}`);
    if (!projectsResponse.ok) {
      throw new Error(`Failed to fetch active projects: ${projectsResponse.statusText}`);
    }
    const activeProjects = await projectsResponse.json();

    // Fetch contact info
    const contactResponse = await fetch(`${API_BASE_URL}/api/getAllUserContactInfosByUserId/${user_id}`);
    if (!contactResponse.ok) {
      throw new Error(`Failed to fetch contact info: ${contactResponse.statusText}`);
    }
    const contactInfos = await contactResponse.json();

    // Fetch task summaries
    const taskSummariesResponse = await fetch(`${API_BASE_URL}/api/getAllUserTaskSummariesByUserId/${user_id}`);
    if (!taskSummariesResponse.ok) {
      throw new Error(`Failed to fetch task summaries: ${taskSummariesResponse.statusText}`);
    }
    const taskSummaries = await taskSummariesResponse.json();

    res.render('my_projects', {
      full_name: user.full_name || 'User',
      activeProjects,
      contactInfo: contactInfos[0] || {},
      taskSummaries: taskSummaries[0] || {},
    });
  } catch (error) {
    console.error('Error fetching data for my_projects:', error.message);
    res.render('my_projects', {
      full_name: 'User',
      activeProjects: [],
      contactInfo: {},
      taskSummaries: {},
    });
  }
});

app.get('/my_tasks', ensureUser, async (req, res) => {
  const user_id = req.user_id; // Retrieve user ID from middleware
 

  try {
    // Fetch user data
    const userResponse = await fetch(`${API_BASE_URL}/api/getUserById/${user_id}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }
    const user = await userResponse.json();

    // Fetch tasks
    const tasksResponse = await fetch(`${API_BASE_URL}/api/getAllTasksByUserId/${user_id}`);
    if (!tasksResponse.ok) {
      throw new Error(`Failed to fetch tasks: ${tasksResponse.statusText}`);
    }
    const tasks = await tasksResponse.json();

    res.render('my_tasks', {
      full_name: user.full_name || 'User',
      tasks,
    });
  } catch (error) {
    console.error('Error fetching data for my_tasks:', error.message);
    res.render('my_tasks', {
      full_name: 'User',
      tasks: [],
    });
  }
});

app.get('/recruiters', ensureUser, async (req, res) => {
  const user_id = req.user_id; // Retrieve user ID from middleware
 

  try {
    // Fetch user data
    const userResponse = await fetch(`${API_BASE_URL}/api/getUserById/${user_id}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }
    const user = await userResponse.json();

    const jobsResponse = await fetch(`${API_BASE_URL}/api/getAllJobs`);
    if (!jobsResponse.ok) {
      throw new Error(`Failed to fetch jobs: ${jobsResponse.statusText}`);
    }
    const jobs = await jobsResponse.json();

    res.render('recruiters', {
      full_name: user.full_name || 'User',
      jobs,
    });
  } catch (error) {
    console.error('Error fetching data for recruiters:', error.message);
    res.render('recruiters', {
      full_name: 'User',
      jobs: []
    });
  }
});

app.get('/blog', ensureUser, async (req, res) => {
  const user_id = req.user_id; // Retrieve user ID from middleware

  try {
    // Fetch user data
    const userResponse = await fetch(`${API_BASE_URL}/api/getUserById/${user_id}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }
    const user = await userResponse.json();

    // Fetch blogs
    const blogsResponse = await fetch(`${API_BASE_URL}/api/getAllBlogs`);
    if (!blogsResponse.ok) {
      throw new Error(`Failed to fetch blogs: ${blogsResponse.statusText}`);
    }
    const blogs = await blogsResponse.json();

    res.render('blog', {
      full_name: user.full_name || 'User',
      blogData: blogs,
    });
  } catch (error) {
    console.error('Error fetching data for blog:', error.message);
    res.render('blog', {
      full_name: 'User',
      blogData: [],
    });
  }
});

app.get('/settings', ensureUser, async (req, res) => {
  const user_id = req.user_id; // Retrieve user ID from middleware

  try {
    const userResponse = await fetch(`${API_BASE_URL}/api/getUserById/${user_id}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }
    const user = await userResponse.json();

    const settingsResponse = await fetch(`${API_BASE_URL}/api/getAllSettingsByUserId/${user_id}`);
        if (!settingsResponse.ok) {
            throw new Error(`Failed to fetch settings data: ${settingsResponse.statusText}`);
        }
        const settings = await settingsResponse.json();

    res.render('settings', {
      user: {
        user_id: user.user_id, // Pass user_id
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        dob: new Date(user.dob).toLocaleDateString(),
        address: user.address,
        city: user.city,
        postal_code: user.postal_code,
        country: user.country,
      },
      settings: settings[0] || {}
    });
  } catch (error) {
    console.error('Error fetching data for settings:', error.message);
    res.render('settings', {
      user: {
        user_id: '', // Default empty value
        full_name: 'User',
        username: '',
        email: '',
        dob: '',
        address: '',
        city: '',
        postal_code: '',
        country: '',
      },
      settings: {}
    });
  }
});







app.get('/api/getUserById/:id', (req, res) => {
  const user_id = parseInt(req.params.id, 10); // Перетворення на число
  if (isNaN(user_id)) {
    return res.status(400).json({ error: 'Некоректний user_id' });
  }

  const user = users.find(u => u.user_id === user_id); // Знаходження користувача
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Користувача не знайдено' });
  }
});


app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Симуляція авторизації
  if (email === 'john.doe@example.com' && password === '123') {
    return res.json({ 
      message: 'Login successful', 
      user: { user_id: 1, email } // Повернення user_id
    });
  } else {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
});



// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


