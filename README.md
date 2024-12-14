Создай файл .env на новом компьютере с теми же значениями, что были у тебя на первом компьютере:
env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=easter_games


Шаг 6: Запуск проекта на новом компьютере
Запусти сервер:
bash
node server/index.js
Запусти фронтенд:
bash

npm run dev
Теперь проект должен работать на новом компьютере так же, как на первом!
