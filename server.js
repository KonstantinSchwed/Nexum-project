const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    surname TEXT NOT NULL,
    name TEXT NOT NULL,
    plan TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    tariff TEXT NOT NULL, -- Добавляем столбец для тарифа
    balance REAL DEFAULT 0.0 
)`, (err) => {
    if (err) {
        console.error("Ошибка при создании таблицы:", err.message);
    } else {
        console.log("Таблица 'users' успешно создана или уже существует.");

        db.get(`SELECT COUNT(*) AS count FROM users`, (err, row) => {
            if (err) {
                console.error("Ошибка при проверке количества пользователей:", err.message);
            } else if (row.count === 0) {
                const users = [
                    { phone: '+375442311668', password: 'password1', surname: 'Иванов', name: 'Иван', plan: 'Business', email: 'ivan@example.com', tariff: 'Бизнес 100', balance: 100.0 },
                    { phone: '+375442311670', password: 'password2', surname: 'Петров', name: 'Петр', plan: 'Standard', email: 'petr@example.com', tariff: 'Всё по 100', balance: -200.0 },
                    { phone: '+375442116701', password: 'password3', surname: 'Сидоров', name: 'Сидор', plan: 'Business', email: 'sidor@example.com', tariff: 'Партнёр', balance: 300.0 },
                    { phone: '+375292116701', password: 'password4', surname: 'Коваленко', name: 'Коваленко', plan: 'Standard', email: 'kovalenko@example.com', tariff: 'Народный', balance: 150.0 },
                    { phone: '+375292116331', password: 'password5', surname: 'Лебедев', name: 'Лебедь', plan: 'Standard', email: 'lebedev@example.com', tariff: 'Сезонный', balance: 250.0 },
                    { phone: '+375292456331', password: 'password6', surname: 'Иванова', name: 'Мария', plan: 'Standard', email: 'maria@example.com', tariff: 'Всё включено', balance: 350.0 }
                ];
                const insertQuery = `INSERT INTO users (phone, password, surname, name, plan, email, tariff, balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                users.forEach(user => {
                    db.run(insertQuery, [user.phone, user.password, user.surname, user.name, user.plan, user.email, user.tariff, user.balance], function(err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log(`Пользователь добавлен: ${user.phone}`);
                        }
                    });
                });
            }
        });
    }
});

app.post('/login', (req, res) => {
    const { phone, password } = req.body;
    console.log(phone, password);

    if (!phone || !password) {
        return res.status(400).json({ error: 'Необходимо ввести телефон и пароль' });
    }

    const query = `SELECT * FROM users WHERE phone = ? AND password = ?`;

    db.get(query, [phone, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка сервера' });
        } else if (row) {
            res.status(200).json({ message: 'Успешный вход', user: row });
        } else {
            res.status(401).json({ error: 'Неверный логин или пароль' });
        }
    });
});
app.post('/update-tariff', (req, res) => {
    console.log('Получен запрос на обновление тарифа:', req.body);
    const { phone, newTariff } = req.body; 

    if (!phone || !newTariff) {
        console.error('Ошибка: Необходимы телефон и новый тариф');
        return res.status(400).json({ success: false, error: 'Необходимы телефон и новый тариф' });
    }

    const query = `UPDATE users SET tariff = ? WHERE phone = ?`; 

    db.run(query, [newTariff, phone], function(err) {
        if (err) {
            console.error("Ошибка при обновлении тарифа:", err.message); 
            return res.status(500).json({ success: false, error: 'Ошибка при обновлении тарифа' });
        } else {
            console.log(`Тариф обновлен для пользователя с телефоном: ${phone} на ${newTariff}`); 
            res.json({ success: true, message: 'Тариф успешно обновлен' });
        }
    });
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

