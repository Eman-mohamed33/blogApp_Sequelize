import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const UserModel = sequelize.define('Users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field:"U_name"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
             field:"U_email"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                checkPasswordLength(value) {
                    if (value.length <= 6) {
                        throw new Error("Password length must be greater than 6 characters");
                    }
                }
            },
             field:"U_password"
           
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue:"user",
            allowNull: false,
             field:"U_role"
            
        },
    }, {
    hooks: {
        beforeCreate: (User, options) => {
            if (User.name.length <= 2) {
                throw new Error("Name must be longer than 2 characters");
            }
        }
        },
        createdAt: "U_createdAt",
        updatedAt:"U_updatedAt"
}
);
