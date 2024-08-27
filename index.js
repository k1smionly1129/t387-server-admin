const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 创建数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root9527',
    database: 't387'
});

// 连接到数据库
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// 注册用户
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT IGNORE INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(400).send('Username already exists.');
        }
        res.status(201).send('User registered.');
    });
});

// 添加角色
app.post('/roles', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT IGNORE INTO roles (name) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(400).send('Role already exists.');
        }
        res.status(201).send('Role added.');
    });
});

// 添加权限
app.post('/permissions', (req, res) => {
    const { name } = req.body;
    const query = 'INSERT IGNORE INTO permissions (name) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(400).send('Permission already exists.');
        }
        res.status(201).send('Permission added.');
    });
});

// 分配角色给用户
app.post('/user-roles', (req, res) => {
    const { user_id, role_id } = req.body;
    const query = 'INSERT IGNORE INTO user_roles (user_id, role_id) VALUES (?, ?)';
    db.query(query, [user_id, role_id], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err.message);
        }
        res.status(201).send('Role assigned to user.');
    });
});

// 分配权限给角色
app.post('/role-permissions', (req, res) => {
    const { role_id, permission_id } = req.body;
    const query = 'INSERT IGNORE INTO role_permissions (role_id, permission_id) VALUES (?, ?)';
    db.query(query, [role_id, permission_id], (err, result) => {
        if (err) {
            return res.status(500).send('Error: ' + err.message);
        }
        res.status(201).send('Permission assigned to role.');
    });
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
