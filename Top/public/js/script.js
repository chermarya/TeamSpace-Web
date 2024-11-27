

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

app.get('/login', (req, res) => {
    res.render('/Top/views/login.ejs'); 
});

