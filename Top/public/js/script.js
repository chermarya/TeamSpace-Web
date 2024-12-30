document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        alert('Email та пароль обов’язкові.');
        return;
      }

      const API_BASE_URL = "https://b2e6-2a01-c23-94c7-3400-f896-19e7-4b9d-b308.ngrok-free.app";

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log('Login API response:', result); // Debugging log

        // Adjust to handle the new response format
        if (response.ok && result.user_id) {
          document.cookie = `user_id=${result.user_id}; path=/;`;
          window.location.href = '/index';
        } else {
          console.error('Invalid response format:', result);
          alert('Помилка входу. Спробуйте знову.');
        }
      } catch (error) {
        console.error('Помилка під час входу:', error);
        alert('Виникла помилка. Спробуйте пізніше.');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const user_id = localStorage.getItem('user_id');
  if (!user_id) {
    window.location.href = '/login';
  }

  const projectRows = document.querySelectorAll('.project');
  projectRows.forEach((project) => {
    project.addEventListener('click', () => {
      const projectId = project.getAttribute('data-project-id'); // Ensure `data-project-id` is set server-side
      window.location.href = `/project_details/${projectId}`;
    });
  });
});




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



// Ініціалізація: показуємо вкладку 'edit-profile' за замовчуванням
// window.onload = () => {
//   showTab('edit-profile');
// };
// function toggleSwitch(element) {
//   element.classList.toggle("on");
// }






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




