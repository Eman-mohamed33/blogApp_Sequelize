import { DataTypes, Model } from "sequelize";
import { Comment } from "../../DB/models/comment.model.js";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./User.model.js";
export class Post extends Model { };
Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    }
    ,
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        field:"P_title",
    },
    content: {
        type: DataTypes.TEXT,
        field:"P_content",
    }
}, {
    sequelize,
    timestamps: true,
    paranoid: true,
    createdAt: "P_createdAt",
    updatedAt:"P_updatedAt",
    
    
}) 


Post.belongsTo(UserModel, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        allowNull:false
    }
});
UserModel.hasMany(Post, {
    onDelete: "CASCADE",
    onUpdate:"CASCADE"
});

Comment.belongsTo(Post, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})
Post.hasMany(Comment);


