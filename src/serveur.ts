
import express from "express";
import type { Request, Response } from "express";

import sequelize from "./config/database";
import User from "./models/User";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Routes utilisateurs
app.use("/api/users", userRoutes);

// 🔹 Synchronisation des modèles + démarrage du serveur
sequelize.sync().then(() => {
    console.log("Base de données synchronisée !");
    app.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
});




function greet(name: string): string {
    return `hello, ${name}!`;
  }
  
let message: string = greet("Diego");
console.log(message);