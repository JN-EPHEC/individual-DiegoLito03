import type { Request, Response } from "express";
import { Op } from "sequelize";
import User from "../models/User";

// GET /api/users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { sort } = req.query;

        const order: [string, string][] = sort === "alpha"
            ? [["nom", "ASC"], ["prenom", "ASC"]]
            : [["createdAt", "DESC"]];

        const users = await User.findAll({ order });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// GET /api/users/search?q=...
export const searchUsers = async (req: Request, res: Response) => {
    try {
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

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// POST /api/users
export const createUser = async (req: Request, res: Response) => {
    try {
        const { prenom, nom } = req.body;

        if (!prenom) {
            return res.status(400).json({ error: "Le prénom est obligatoire" });
        }
        if (!nom) {
            return res.status(400).json({ error: "Le nom est obligatoire" });
        }

        const newUser = await User.create({ prenom, nom });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const supprime = await User.destroy({ where: { id: Number(id) } });

        if (!supprime) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        res.status(200).json({ message: `Utilisateur ${id} supprimé` });
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};
