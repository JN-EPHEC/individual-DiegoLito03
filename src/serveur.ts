import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import "./models/User";

const app = express();
const port = 3000;

/*
app.get('/', (req , res ) => {
    res.send('Bienvenue sur mon serveur API');
});
*/

const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/data',(req,res) => {
    res.json(etudiants);
});

app.get('/api/hello/:name',(req,res) => {
    res.json({"message": `Bonjour ${req.params.name}`, "timestamp": new Date().toISOString()});
})

app.use(express.json());

app.use(express.static('public'));

app.use("/api", userRoutes);

sequelize.authenticate().then(()=>{
    console.log('Connexion à la base de donnée SQLite établie.');
    return sequelize.sync();
}).then(()=> {
    console.log('Base de donnée synchronisée');
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