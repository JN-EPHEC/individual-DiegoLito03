type Role = "admin" | "user" | "stagiaire";

export function validateUserRegistration(
    age: number,
    role: string,
    email: string
): boolean {
    const rolesValides: Role[] = ["admin", "user", "stagiaire"];
    if (!rolesValides.includes(role as Role)) {
        throw new Error("Rôle invalide");
    }

    if (isNaN(age) || age === null || age === undefined) {
        throw new Error("Âge invalide");
    }
    if (age > 120) {
        throw new Error("Âge invalide");
    }
    if (age < 18) {
        if (role !== "stagiaire") {
            return false;
        }
    }

    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }

    return true;
}