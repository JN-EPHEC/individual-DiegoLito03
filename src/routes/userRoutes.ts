import { Router } from "express";
import User from "../models/User";

const router = Router();

// GET /api/users -> récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/", async (req, res) => {
    const { nom, prenom } = req.body;
    try {
        const user = await User.create({ nom, prenom });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
});

// DELETE /api/users/:id : supprimer un utilisateur
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: `Utilisateur ${id} supprimé` });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
});

export default router;


