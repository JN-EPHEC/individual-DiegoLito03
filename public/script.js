const userList = document.getElementById("user-list");
const userForm = document.getElementById("user-form");
const prenomInput = document.getElementById("prenom");
const nomInput = document.getElementById("nom");
const btnSort = document.getElementById("btn-sort");
const btnSearch = document.getElementById("btn-search");
const searchInput = document.getElementById("search-input");
const resetBtn = document.getElementById("reset-btn");

let isSorted = false;

// ─── Chargement initial ───────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
});

// ─── Charger tous les utilisateurs ───────────────────────────────────────────

async function loadUsers(sorted = false) {
    try {
        const url = sorted ? "/api/users?sort=alpha" : "/api/users";
        const res = await fetch(url);
        const users = await res.json();

        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            const text = document.createElement("span");
            text.textContent = `${user.nom} ${user.prenom || ""}`;
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
                        loadUsers(isSorted);
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

// ─── Ajout d'un utilisateur ───────────────────────────────────────────────────

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
            loadUsers(isSorted);
            prenomInput.value = "";
            nomInput.value = "";
        } else {
            alert("Erreur lors de l'ajout de l'utilisateur");
        }
    } catch (err) {
        console.error("Erreur lors de l'ajout :", err);
    }
});

// ─── Tri alphabétique ─────────────────────────────────────────────────────────

btnSort.addEventListener("click", () => {
    isSorted = !isSorted;
    btnSort.textContent = isSorted ? "✓ Trié A → Z" : "⇅ Trier A → Z";
    searchInput.value = "";
    resetBtn.style.display = "none";
    loadUsers(isSorted);
});

// ─── Recherche par nom ou prénom ─────────────────────────────────────────────

btnSearch.addEventListener("click", () => {
    searchUsers();
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchUsers();
});

async function searchUsers() {
    const q = searchInput.value.trim();

    if (!q) {
        alert("Veuillez entrer un terme de recherche");
        return;
    }

    try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();

        userList.innerHTML = "";

        if (!res.ok || !Array.isArray(data) || data.length === 0) {
            const li = document.createElement("li");
            li.className = "list-group-item text-muted";
            li.textContent = "Aucun utilisateur trouvé.";
            userList.appendChild(li);
            resetBtn.style.display = "inline-block";
            return;
        }

        data.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";

            const text = document.createElement("span");
            text.textContent = `${user.nom} ${user.prenom || ""}`;
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
                        loadUsers(isSorted);
                        searchInput.value = "";
                        resetBtn.style.display = "none";
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

        resetBtn.style.display = "inline-block";
    } catch (err) {
        console.error("Erreur lors de la recherche :", err);
        alert("Erreur lors de la recherche");
    }
}

// ─── Réinitialisation ─────────────────────────────────────────────────────────

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    resetBtn.style.display = "none";
    isSorted = false;
    btnSort.textContent = "⇅ Trier A → Z";
    loadUsers();
});