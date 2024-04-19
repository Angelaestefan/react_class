const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "angiea",
    password: "Xavavi04!",
    database: "TEST",
});


db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

app.get("/api", (req, res) => {
    res.json("From backend!");
});

// Retrieve users from database
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Failed to retrieve users" });
        }
        res.json(data);
    });
});

app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error searching user:', err);
            return res.status(500).json({ error: 'Error searching user' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(result[0]);
    });
});

app.put("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const userData = req.body;
    const sql = "UPDATE users SET name = ?, phone = ?, email = ? WHERE id = ?";
    db.query(sql, [userData.name, userData.phone, userData.email, userId], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Error updating user' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ message: 'User updated successfully' });
    });
});


const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
