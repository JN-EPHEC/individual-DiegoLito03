const userList = document.getElementById("user-list");
const userForm = document.getElementById("user-form");
const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");


document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
});

async function loadUsers() {
    try {
        const res = await fetch("/api/users");
        const users = await res.json();

        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            const text = document.createElement("span");
            text.textContent = `${user.prenom} ${user.nom || ""}`;
            li.appendChild(text);

            const supp = document.createElement("button");
            supp.textContent = "X";
            supp.className = "btn btn-danger btn-sm";

            supp.addEventListener("click", async () => {
                try {
                    const res = await fetch(`/api/users/${user.id}`, {
                        method: "DELETE",
                    });

                    if (res.ok) {
                        loadUsers();
                    } else {
                        alert("Erreur lors de la suppression");
                    }
                } catch (err) {
                    console.error("Erreur lors de la suppression :", err);
                }
            });

            li.appendChild(supp);
            userList.appendChild(li);
        });
    } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs :", err);
    }
}

window.addEventListener("DOMContentLoaded", loadUsers);

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prenom = prenomInput.value.trim();
    const nom = nomInput.value.trim();

    if (!prenom) {
        alert("Le prénom est obligatoire");
        return;
    }

    try {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prenom, nom })
        });

        if (res.ok) {
            loadUsers();
            prenomInput.value = "";
            nomInput.value = "";
        } else {
            alert("Erreur lors de l'ajout de l'utilisateur");
        }
    } catch (err) {
        console.error("Erreur lors de l'ajout :", err);
    }
});