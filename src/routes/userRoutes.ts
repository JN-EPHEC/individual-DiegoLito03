import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/users", async (req, res) => {
    const users = await User.findAll();
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


