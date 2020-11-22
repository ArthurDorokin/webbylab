# webbylab
Реализовано SPA с следующими API методами:
  - /api/movies/ GET - получение списка фильмов;
  - /api/movies/id GET - получение одного фильма;
  - /api/movies/ POST - добавление фильма;
  - /api/movies/import POST - импорт фильмов с .txt файла;
  - /api/movies/id DELETE - удаление фильма.
  
В качестве базы использована MongoDB. Сервер express.js.

Приложение запускается командой npm run dev.
Тесты запускаются командой npm test.
