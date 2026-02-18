import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/userRoutes.ts"; // avec l'extension .ts

const app = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Bienvenue sur mon serveur API");
});

app.get("/api/data", (req: Request, res: Response) => {
  const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
  ];
  res.json(etudiants);
});

app.get("/api/hello/:name", (req: Request, res: Response) => {
  const name = req.params.name;
  const timestamp = new Date().toISOString();
  res.json({ message: `Bonjour ${name}`, timestamp });
});

// Montage du routeur
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});



function greet(name: string): string {
    return `hello, ${name}!`;
  }
  
let message: string = greet("Diego");
console.log(message);