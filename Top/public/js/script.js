

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

document.addEventListener("DOMContentLoaded", () => {
    const jobs = [
      { title: "Senior PHP Developer", category: "Php", company: "Google", location: "New York" },
      { title: "UI Designer", category: "Ui", company: "Microsoft", location: "Seattle" },
      { title: "C# Developer", category: "C#", company: "Amazon", location: "Austin" },
      { title: "Frontend Developer", category: "html/css", company: "Facebook", location: "San Francisco" },
      { title: "Project Manager", category: "Manager", company: "Apple", location: "Remote" },
    ];
  
    const filters = document.querySelectorAll(".filter-button");
    const cardsContainer = document.getElementById("cards-container");
  
    function updateJobs(filter) {
      cardsContainer.innerHTML = ""; // Очистити контейнер
  
      const filteredJobs = jobs.filter((job) => filter === "all" || job.category === filter);
  
      filteredJobs.forEach((job) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h3>${job.title}</h3>
          <p>Company: ${job.company}</p>
          <p>Location: ${job.location}</p>
        `;
        cardsContainer.appendChild(card);
      });
    }
  
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        document.querySelector(".filter-button.active").classList.remove("active");
        filter.classList.add("active");
        const selectedFilter = filter.textContent;
        updateJobs(selectedFilter);
      });
    });
  
    updateJobs("Php"); // Ініціалізація
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("profileModal");
    const closeModal = document.querySelector(".modal .close");
    const viewButtons = document.querySelectorAll(".card-button");
  
    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.style.display = "block";
      });
    });
  
    // Закриття модального вікна
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  
  


 