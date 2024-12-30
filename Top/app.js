const API_BASE_URL = "https://6f0d-2a02-3100-7fac-7800-4cdd-15a3-5083-e836.ngrok-free.app";
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
app.use(express.urlencoded({ extended: true }));
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






app.get('/create_an-account', (req, res) => {
  res.render('create_an-account', { title: 'Create an Account' });
});


// app.post('/register', async (req, res) => {
//   const { name, username, email, password, dob, address, city, postal, country } = req.body;

//   if (!name || !username || !email || !password || !dob || !address || !city || !postal || !country) {
//       return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//       const response = await fetch(`${API_BASE_URL}/api/createUser`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(req.body),
//       });

//       if (!response.ok) {
//           const errorDetails = await response.text();
//           throw new Error(`Failed to create user: ${errorDetails}`);
//       }

//       const result = await response.json();
//       res.redirect('/login'); // Redirect to login after successful registration
//   } catch (error) {
//       console.error('Error during registration:', error.message);
//       res.status(500).send('An error occurred during registration');
//   }
// });

app.post('/api/createUser', async (req, res) => {
  const {
      username, full_name, email, password, dob,
      address, city, postal_code, country,
  } = req.body;

  if (!username || !full_name || !email || !password || !dob || !address || !city || !postal_code || !country) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      // Replace this with actual database logic
      const newUser = {
          username,
          full_name,
          email,
          password: hashPassword(password), // Add a hashing function
          dob,
          address,
          city,
          postal_code,
          country,
      };

      // Simulate successful database insertion
      console.log('User created:', newUser);
      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});







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
  const user_id = req.user_id; 

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
        user_id: user.user_id, 
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
        user_id: '',
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


// app.get('/settings', async (req, res) => {
//   try {
//     const userId = req.cookies.user_id; // Assuming user_id is stored in a cookie
//     const userResponse = await fetch(`${API_BASE_URL}/api/getUserById/${userId}`);
//     const settingsResponse = await fetch(`${API_BASE_URL}/api/getAllSettingsByUserId/${userId}`);

//     if (!userResponse.ok || !settingsResponse.ok) {
//       throw new Error('Failed to fetch user or settings data');
//     }

//     const user = await userResponse.json();
//     const settings = await settingsResponse.json();

//     res.render('settings', { user, settings });
//   } catch (error) {
//     console.error('Error fetching user or settings data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });


app.post('/api/updateUserSettings', async (req, res) => {
  const { settingKey, value } = req.body;
  const userId = req.cookies.user_id;

  if (!userId || !settingKey) {
      return res.status(400).json({ error: 'Missing user ID or setting key' });
  }

  try {
      const response = await fetch(`${API_BASE_URL}/api/updateUserSetting`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId, settingKey, value }),
      });

      if (!response.ok) {
          throw new Error('Failed to update setting on the server');
      }

      const updatedSetting = await response.json();
      res.json(updatedSetting);
  } catch (error) {
      console.error('Error updating user setting:', error);
      res.status(500).json({ error: 'Failed to update setting' });
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


