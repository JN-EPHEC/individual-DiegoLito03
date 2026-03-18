import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database";
import { requestLogger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import "./models/User";

const app = express();
const port = 3000;

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(requestLogger);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes existantes
const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

app.get("/api/data", (req, res) => {
    res.json(etudiants);
});

app.get("/api/hello/:name", (req, res) => {
    res.json({
        message: `Bonjour ${req.params.name}`,
        timestamp: new Date().toISOString(),
    });
});

// Routes users
app.use("/api", userRoutes);

// Gestion centralisée des erreurs (doit être en dernier)
app.use(errorHandler);

sequelize.authenticate().then(() => {
    console.log("Connexion à la base de donnée SQLite établie.");
    return sequelize.sync();
}).then(() => {
    console.log("Base de donnée synchronisée");
    app.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`);
    });
}).catch((err) => {
    console.error(err);
});

function greet(name: string): string {
    return `hello, ${name}!`;
}

let message: string = greet("Diego");
console.log(message);
