import express from "express";
import { Op } from "sequelize";
import User from "../models/User";

const router = express.Router();

router.get("/users", async (req, res) => {
    const { sort } = req.query;

    const order: [string, string][] = sort === "alpha"
        ? [["nom", "ASC"], ["prenom", "ASC"]]
        : [["createdAt", "DESC"]];

    const users = await User.findAll({ order });
    res.json(users);
});

router.get("/users/search", async (req, res) => {
    const { q } = req.query;

    if (!q || typeof q !== "string" || q.trim() === "") {
        return res.status(400).json({ error: "Le paramètre de recherche 'q' est obligatoire" });
    }

    const users = await User.findAll({
        where: {
            [Op.or]: [
                { nom: { [Op.like]: `%${q.trim()}%` } },
                { prenom: { [Op.like]: `%${q.trim()}%` } },
            ],
        },
        order: [["nom", "ASC"]],
    });

    if (users.length === 0) {
        return res.status(404).json({ error: "Aucun utilisateur trouvé" });
    }

    res.json(users);
});

router.post("/users", async (req, res) => {
    const {prenom, nom} = req.body;
    if (!prenom) {
        return res.json({error: "Le prénom est obligatoire"});
    }
    const newUser = await User.create({prenom, nom});
    res.json(newUser);
});

router.delete("/users/:id",async (req,res) => {
    const {id} = req.params;
    const supprime = await User.destroy({where:{id:Number(id)}});
    if (!supprime){
        return res.json({error: "Utilisateur introuvable"});
    } else {
        return res.json(`Utilisateur ${id} supprimé`);
    }
});

export default router;


