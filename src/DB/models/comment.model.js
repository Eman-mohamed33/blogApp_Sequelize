import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./User.model.js";
import { Post } from "./Post.model.js";

export class Comment extends Model { };
Comment.init({
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field:"C_content",
    }
}, {
    sequelize,
    updatedAt: "C_updatedAt",
    createdAt:"C_createdAt",
})


Comment.belongsTo(UserModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

UserModel.hasMany(Comment);



