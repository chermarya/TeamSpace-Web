console.log("Heroku PORT:", process.env.PORT);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер працює на порті ${PORT}`);
});
