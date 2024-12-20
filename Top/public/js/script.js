
const { data, blogData } = require("./data");


document.addEventListener("DOMContentLoaded", () => {
    const progressElements = document.querySelectorAll(".project-progress");

    progressElements.forEach((element) => {
        const progress = parseInt(element.getAttribute("data-progress"), 10);

        // Устанавливаем цвет фона в зависимости от значения процентов
        if (progress >= 0 && progress <= 25) {
            element.style.background = "rgba(255, 26, 26, 0.4)"; // Красный с прозрачностью
        } else if (progress > 25 && progress <= 50) {
            element.style.background = "rgba(255, 133, 26, 0.4)"; // Оранжевый с прозрачностью
        } else if (progress > 50 && progress <= 100) {
            element.style.background = "rgba(45, 255, 26, 0.4)"; // Зеленый с прозрачностью
        }  
        
    });
});



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

 // Створення маршруту для інших сторінок
const routes = ['login', 'my_projects', 'my_tasks', 'schedule', 'index', 'recruiters','blog'];

routes.forEach(route => {
  app.get(`/${route}`, (req, res) => {
    res.render(route, { data });
  });
});

console.log(document.getElementById("profileModal"));
document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.querySelector(".blog-cards");

  // Генерація карток
  blogData.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${post.image}" alt="Post Image">
      <div class="content">
        <div class="title">${post.title}</div>
        <div class="description">${post.description}</div>
        <div class="info">
          <div class="profile">
            <img src="${post.avatar}" alt="Profile Picture">
            <div class="profile-text">
              <div class="name">${post.author}</div>
              <div class="date">${post.date}</div>
            </div>
          </div>
          <div class="icon">★</div>
        </div>
      </div>
    `;
    blogContainer.appendChild(card);
  });
});

function initializeViewButtons() {
  const viewButtons = document.querySelectorAll(".card-button");
  const modal = document.getElementById("profileModal");
  const closeButton = modal.querySelector(".close");

  viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
          modal.style.display = "block"; // Показуємо модальне вікно
      });
  });

  closeButton.addEventListener("click", () => {
      modal.style.display = "none"; // Закриваємо модальне вікно
  });

  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none"; // Закриваємо при натисканні за межами модального вікна
      }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeViewButtons();
});
