import express from 'express';
import pino from 'pino-http';

const app = express();
const PORT = 3000;

// pino

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

// Middleware для логування часу запиту
app.use((req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
});

// Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
// наприклад, у запитах POST або PATCH
app.use(express.json());
// Маршрут для обробки GET-запитів на '/'

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

// Middleware для обробки помилки неісн. маршрутів

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

// Middleware для обробки помилок (приймає 4 аргументи)

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
