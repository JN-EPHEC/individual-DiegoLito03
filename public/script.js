const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");

// Charger les utilisateurs au démarrage
document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
});

// =============================
// Charger et afficher utilisateurs
// =============================
async function loadUsers() {
    const response = await fetch("/api/users");
    const users = await response.json();

    userList.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            ${user.nom} ${user.prenom}
            <button class="btn btn-danger btn-sm">X</button>
        `;

        const deleteBtn = li.querySelector("button");

        deleteBtn.addEventListener("click", async () => {
            if (confirm("Supprimer cet utilisateur ?")) {
                await fetch(`/api/users/${user.id}`, {
                    method: "DELETE"
                });

                loadUsers();
                showMessage("Utilisateur supprimé !");
            }
        });

        userList.appendChild(li);
    });
}

// =============================
// Ajout utilisateur
// =============================
userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nom, prenom })
    });

    if (response.ok) {
        userForm.reset();
        loadUsers();
        showMessage("Utilisateur ajouté !");
    }
});

// =============================
// Message Bootstrap
// =============================
function showMessage(text) {
    const messageDiv = document.getElementById("message");

    messageDiv.innerHTML = `
        <div class="alert alert-success mt-3">
            ${text}
        </div>
    `;

    setTimeout(() => {
        messageDiv.innerHTML = "";
    }, 2000);
}
