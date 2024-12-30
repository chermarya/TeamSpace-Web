const API_BASE_URL = "https://6f0d-2a02-3100-7fac-7800-4cdd-15a3-5083-e836.ngrok-free.app";
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
document.getElementById('save-changes').addEventListener('click', async () => {
  const userId = document.cookie
    .split('; ')
    .find(row => row.startsWith('user_id'))
    ?.split('=')[1]; // Extract user_id from cookie

  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const postal = document.getElementById('postal').value;
  const country = document.getElementById('country').value;

  try {
    const response = await fetch(`${API_BASE_URL}/api/updateUser/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, city, postal_code: postal, country }),
    });

    if (response.ok) {
      alert('Profile updated successfully!');
    } else {
      const error = await response.json();
      console.error('Error:', error);
      alert(`Failed to update profile: ${error.message}`);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('An error occurred while updating the profile.');
  }
});


const formData = new FormData(registrationForm);
const userData = Object.fromEntries(formData.entries());
console.log('Зібрані дані:', userData);


async function fetchSettings() {
  const userId = localStorage.getItem('user_id'); // Retrieve user ID from localStorage
  try {
      const response = await fetch(`${API_BASE_URL}/api/getAllSettingsByUserId/${userId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch settings data');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
  }
}

async function initializeSwitches() {
  const settingsData = await fetchSettings();
  if (!settingsData) {
      console.error('No settings data available');
      return;
  }

  const switches = [
      { id: 'review-switch', key: 'submit_review' },
      { id: 'task-switch', key: 'get_task' },
      { id: 'recommendations-switch', key: 'recommendations' },
      { id: 'two-factor-switch', key: 'Enable_or_disable_two_factor_authentication' },
  ];

  switches.forEach(({ id, key }) => {
      const element = document.getElementById(id);
      if (settingsData[key]) {
          element.classList.add('on');
      } else {
          element.classList.remove('on');
      }

      element.addEventListener('click', () => toggleSwitch(element, key));
  });
}

document.addEventListener('DOMContentLoaded', initializeSwitches);

function toggleSwitch(element, settingKey) {
  element.classList.toggle('on');
  const isOn = element.classList.contains('on') ? true : false;

  fetch(`${API_BASE_URL}/api/updateUserSettings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settingKey, value: isOn }),
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to update setting');
          }
          return response.json();
      })
      .then(data => {
          console.log(`Updated ${settingKey}:`, data);
      })
      .catch(error => {
          console.error(`Error updating ${settingKey}:`, error);
      });
}
// Initialize two-factor authentication switch on page load
document.addEventListener("DOMContentLoaded", () => {
  fetch(`${API_BASE_URL}/api/getAllSettingsByUserId/${userId}`)
      .then(response => response.json())
      .then(settings => {
          const twoFactorSwitch = document.getElementById('two-factor-switch');
          if (settings.Enable_or_disable_two_factor_authentication) {
              twoFactorSwitch.classList.add('on');
          } else {
              twoFactorSwitch.classList.remove('on');
          }
      })
      .catch(error => {
          console.error('Error fetching settings:', error);
      });
});
document.addEventListener('DOMContentLoaded', () => {
  initializeSwitches();
});


async function checkVerificationStatus(userId) {
  const settingsData = await fetchSettings(userId);
  if (!settingsData) {
      console.error('No settings data available');
      return;
  }

  const verificationStatusElement = document.getElementById('verification-status');
  const verificationLink = document.getElementById('verify-link');

  if (settingsData.is_verified) {
      verificationStatusElement.textContent = "Verified";
      verificationLink.style.display = "none"; // Hide the link if verified
  } else {
      verificationStatusElement.textContent = "Not Verified";
      verificationLink.style.display = "inline"; // Show the link if not verified
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkVerificationStatus();
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
document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('save-changes');
  if (saveButton) {
      saveButton.addEventListener('click', () => {
          console.log('Save button clicked');
          // Your save logic here
      });
  } else {
      console.error('Save button not found in the DOM');
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');

  registrationForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(registrationForm);
      const userData = {
          username: formData.get('username'),
          full_name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          dob: formData.get('dob'),
          address: formData.get('address'),
          city: formData.get('city'),
          postal_code: formData.get('postal'),
          country: formData.get('country'),
      };

      try {
          const response = await fetch(`${API_BASE_URL}/api/createUser`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(userData),
          });

          const result = await response.json();

          if (response.ok) {
              alert('Registration successful!');
              window.location.href = '/login'; // Redirect to login page
          } else {
              console.error('Registration error:', result.error || result.message);
              alert(`Error: ${result.error || result.message}`);
          }
      } catch (error) {
          console.error('Error during registration:', error);
          alert('Failed to register. Please try again later.');
      }
  });
});








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




