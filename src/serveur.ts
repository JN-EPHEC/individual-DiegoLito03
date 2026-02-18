import express from "express";
import { Pool } from "pg";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Pour remplacer __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "usersdb",
    password: "postgres",
    port: 5432,
});

// ================= GET =================
app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, nom, prenom FROM users ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur récupération utilisateurs" });
    }
});

// ================= POST =================
app.post("/api/users", async (req, res) => {
    const { nom, prenom } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO users (nom, prenom) VALUES ($1, $2) RETURNING *",
            [nom, prenom]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur ajout utilisateur" });
    }
});

// ================= DELETE =================
app.delete("/api/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur suppression utilisateur" });
    }
});

// ================= START =================
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});




function greet(name: string): string {
    return `hello, ${name}!`;
  }
  
let message: string = greet("Diego");
console.log(message);