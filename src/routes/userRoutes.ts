import express from "express";         // import par défaut obligatoire
import type { Request, Response } from "express";  // seulement pour le typage TS

const router = express.Router();

// Données utilisateurs
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// Route GET /api/users
router.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

export default router;


