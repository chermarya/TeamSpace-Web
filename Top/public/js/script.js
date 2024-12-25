
const { data, blogData, settings  } = require('./data.js');
console.log("Settings object loaded:", settings);
app.use('/images', express.static(path.join(__dirname, 'images')));

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
console.log("script.js loaded successfully!");

document.addEventListener("DOMContentLoaded", () => {
  const verifyLink = document.getElementById("verify-link");
  const modal = document.getElementById("email-confirmation-modal");
  const confirmButton = document.getElementById("confirm-button");

  // Show the modal when the "Get verification" link is clicked
  verifyLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    modal.style.display = "flex"; // Show modal
  });

  // Close the modal when the confirm button is clicked
  confirmButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
    alert("Email confirmed!"); // Optional: Confirmation action
  });

  // Close the modal when clicking outside of it
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function showTab(tabId) {
  // Знаходимо всі секції
  const sections = document.querySelectorAll('.section');

  // Ховаємо всі секції
  sections.forEach(section => section.classList.remove('active'));

  // Показуємо обрану секцію
  const activeSection = document.getElementById(tabId);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Видаляємо клас active з усіх табів
  const tabs = document.querySelectorAll('.tab-bar .tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Встановлюємо клас active для вибраного таба
  const activeTab = document.querySelector(`.tab[onclick="showTab('${tabId}')"]`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

// Ініціалізація: показуємо вкладку 'edit-profile' за замовчуванням
// window.onload = () => {
//   showTab('edit-profile');
// };
function toggleSwitch(element) {
  element.classList.toggle("on");
}


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




    
