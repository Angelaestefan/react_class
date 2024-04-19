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

// Connect to MySQL
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

const port = 8081;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
