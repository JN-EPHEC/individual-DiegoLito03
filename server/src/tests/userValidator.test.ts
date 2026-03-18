import { validateUserRegistration } from "../utils/userValidator";

describe("validateUserRegistration - Black Box & White Box Testing", () => {

    // ─── CATALOG-BASED TESTING : ÂGE ────────────────────────────────────────

    it("devrait accepter un adulte valide (age 25, user)", () => {
        expect(validateUserRegistration(25, "user", "test@mail.com")).toBe(true);
    });

    it("devrait refuser un mineur avec rôle user (age 17)", () => {
        expect(validateUserRegistration(17, "user", "test@mail.com")).toBe(false);
    });

    it("devrait accepter un mineur avec rôle stagiaire (age 16)", () => {
        expect(validateUserRegistration(16, "stagiaire", "test@mail.com")).toBe(true);
    });

    it("devrait accepter la limite basse adulte (age 18)", () => {
        expect(validateUserRegistration(18, "user", "test@mail.com")).toBe(true);
    });

    it("devrait lever une erreur si age > 120", () => {
        expect(() => validateUserRegistration(121, "user", "test@mail.com"))
            .toThrow("Âge invalide");
    });

    it("devrait accepter la limite haute valide (age 120)", () => {
        expect(validateUserRegistration(120, "user", "test@mail.com")).toBe(true);
    });

    // ─── CATALOG-BASED TESTING : RÔLE ───────────────────────────────────────

    it("devrait accepter le rôle admin", () => {
        expect(validateUserRegistration(30, "admin", "test@mail.com")).toBe(true);
    });

    it("devrait accepter le rôle user", () => {
        expect(validateUserRegistration(30, "user", "test@mail.com")).toBe(true);
    });

    it("devrait accepter le rôle stagiaire", () => {
        expect(validateUserRegistration(30, "stagiaire", "test@mail.com")).toBe(true);
    });

    it("devrait lever une erreur pour un rôle invalide", () => {
        expect(() => validateUserRegistration(30, "superadmin", "test@mail.com"))
            .toThrow("Rôle invalide");
    });

    it("devrait lever une erreur pour un rôle vide", () => {
        expect(() => validateUserRegistration(30, "", "test@mail.com"))
            .toThrow("Rôle invalide");
    });

    // ─── CATALOG-BASED TESTING : EMAIL ──────────────────────────────────────

    it("devrait refuser un email sans @", () => {
        expect(validateUserRegistration(25, "user", "emailsansarobase.com")).toBe(false);
    });

    it("devrait refuser un email sans point", () => {
        expect(validateUserRegistration(25, "user", "email@sanspoint")).toBe(false);
    });

    it("devrait refuser un email vide", () => {
        expect(validateUserRegistration(25, "user", "")).toBe(false);
    });

    it("devrait accepter un email valide", () => {
        expect(validateUserRegistration(25, "user", "diego@ephec.be")).toBe(true);
    });

    // ─── PAIRWISE COMBINATIONS ───────────────────────────────────────────────

    it("Pairwise 1 : mineur + stagiaire + email valide → true", () => {
        expect(validateUserRegistration(15, "stagiaire", "diego@school.be")).toBe(true);
    });

    it("Pairwise 2 : adulte + admin + email invalide → false", () => {
        expect(validateUserRegistration(35, "admin", "invalide")).toBe(false);
    });

    it("Pairwise 3 : age 120 + user + email valide → true", () => {
        expect(validateUserRegistration(120, "user", "senior@mail.com")).toBe(true);
    });

    it("Pairwise 4 : age > 120 + admin → throw", () => {
        expect(() => validateUserRegistration(150, "admin", "a@b.com"))
            .toThrow("Âge invalide");
    });

    it("devrait lever une erreur si age est NaN", () => {
        expect(() => validateUserRegistration(NaN, "user", "test@mail.com"))
            .toThrow("Âge invalide");
    });

});
