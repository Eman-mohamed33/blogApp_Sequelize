import { Op } from "sequelize";
import { Comment } from "../../DB/models/comment.model.js";
import { errorHandling, successResponse } from "../../utils/response.js";
import { UserModel } from "../../DB/models/User.model.js";
import { Post } from "../../DB/models/Post.model.js";
export const create = async(req, res, next) => {
    try {
        const comment = await Comment.bulkCreate(req.body.comments);
        successResponse({
            res, status: 201, message: "Comments Created"
        });
    } catch (error) {
        errorHandling({ res, error });
    }
}

export const update =async (req, res, next) => {
    try {
        const id = req.params.commentId;        
        const { userId } = req.body;
        const commentExist = await Comment.findOne(req.body,{ where: { id } });
        if (!commentExist) {
            successResponse({ res, status: 404, message: "Comment Not Found" });
        }
      
        
        const commentOwnerOrNot = await Comment.findOne({
            where: {
               userId
            }
        });

        if (!commentOwnerOrNot) {
            return successResponse({res,
                status: 403,
                message: "you are not authorized to update this comment"});
        }
        const comment = await Comment.update(req.body,{
            where: { id }
        });
        return successResponse({
            res,
            status:201,
            message: "Comment Updated"
        });

      
    } catch (error) {
        errorHandling({ res, error });
    }
}

export const findOrcreate = async(req, res, next) => {
    try {
        const { postId, userId } = req.body;
       const comment = await Comment.findOrCreate({
           where: {
               postId,userId
           },
           defaults: req.body
       });
       successResponse({ res, status: 201, data: { comment } });
   } catch (error) {
       errorHandling({ res, error });
   }
}

export const search = async(req, res, next) => {
    try {
        const comment = await Comment.findAndCountAll({
            where: {
                content: {
                    [Op.substring]: req.query.word
                }
            }
        });
        return (comment.count)? successResponse({ res, data: { comment } }) :
            successResponse({ res, status: 404, message: "no comments found" });
    } catch (error) {
        errorHandling({ res, error });
    }
}

export const newComment =async (req, res, next) => {
  try {
      const comment = await Comment.findAll({
          limit: 3,
          attributes: ['id', 'C_content', 'C_createdAt'],
          order: [['C_createdAt', 'DESC']],
          where: {
            PostId:req.params.postId
          },
      })
      successResponse({ res, data: { comment } });
  } catch (error) {
      errorHandling({
          res,error
    })
  }
}

export const details = async (req, res, next) => {
    try {
           const comment = await Comment.findByPk(req.params.commentId,{
               attributes: ['id', 'content'],
               include: [
                   {
                       model: UserModel,
                       attributes:['id','name','email']
                       
                   }
                   , {
                       model: Post,
                       attributes:['id','title','content']
                       
                   }
               ]
               
           });
        return comment ? successResponse({ res, data: { comment } }) :
            successResponse({ res, status: 404, message: "Comment Not Found" });
       } catch (error) {
           errorHandling({ res, error });
       }
}

