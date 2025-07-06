import { Post } from "../../DB/models/Post.model.js";
import { Comment } from "../../DB/models/comment.model.js";
import { UserModel } from "../../DB/models/User.model.js";
import { errorHandling, successResponse } from "../../utils/response.js";
import { sequelize } from "../../DB/connection.db.js";
export const create = async (req, res, next) => {
try {
    const {UserId, title, content } = req.body;
    const post = new Post({ UserId, title, content });
    await post.save();
    successResponse({ res, status: 201, message: "Post Created Successfully", data: { post } });
} catch (error) {
    errorHandling({ res, error });
}
   
}

export const Delete = async (req, res, next) => {
    try {
        const id = req.params.postId;        
        const {UserId} = req.body;
        const postExist = await Post.findOne({ where: { id } });
        if (!postExist) {
            successResponse({ res, status: 404, message: "Post Not Found" });
        }
      
        
        if (postExist.UserId !== UserId) {
            return successResponse({
              res,
              status: 403,
              message: "You are not authorized to delete this post"
            });
          }
        const post = await Post.destroy({
            where: { id }
        });
        return successResponse({
            res,
            message: "Post deleted"
        });

      
    } catch (error) {
        errorHandling({ res, error });
    }
}

export const details = async (req, res, next) => {
    try {
        const post = await Post.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'name']
                }
                , {
                    model: Comment,
                    attributes: ['id', 'content']
                }
            ]
            
        });
        successResponse({ res, data: { post } });
    } catch (error) {
        errorHandling({ res, error });
    }
}

export const commentCount = async (req, res, next) => {
    try {
        const post = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: []
                }
            ],
            attributes: [
                'id',
                'title',
                [sequelize.fn("COUNT", sequelize.col("Comments.id")), "commentCount"]
            ],
            group: ['Post.id'], 
        });
        successResponse({ res, data: { post } });
    } catch (error) {
        errorHandling({ res, error });
    }
}