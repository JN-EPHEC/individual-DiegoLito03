import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {
  public id!: number;
  public nom!: string;
  public prenom!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    prenom: { type: DataTypes.STRING, allowNull: false },
    nom: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true, // active createdAt / updatedAt
  }
);

export default User;

