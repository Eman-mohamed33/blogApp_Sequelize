import { UserModel } from "../../DB/models/User.model.js";
import { errorHandling, successResponse } from "../../utils/response.js";

export const signup = async (req, res, next) => {
    try {
        const { email } = req.body;
        const checkUserExist = await UserModel.findOne({ where: { email } });
        if (checkUserExist) {
            successResponse({ res, status: 409, message: "Email Already Exists" });
        }
        const user = UserModel.build(req.body);
        await user.save({ validate: true });
        successResponse({ res, status: 201, message: "User added successfully", data: { user } });
        
    } catch (error) {
        errorHandling({ res, error });
    
    }
}


export const update = async (req, res, next) => {
   try {
       const user = await UserModel.upsert({ ...req.body, id: req.params.userId }, { validate: false });
        
       return successResponse({ res, status: 201, message: "User created or updated successfully", data: { user } });
        
    } catch (error) {
        errorHandling({ res, error });
    
    }
}

export const findUser =async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            where: {
                email:req.query.email
            }
        })
        successResponse({ res, data: { user } });
    } catch (error) {
        errorHandling({ res, error });
    }
}

export const showUser = async(req, res, next) => {
    try {
        const user = await UserModel.findByPk(req.params.userId, {
            attributes: { exclude: 'role' }
        });
        successResponse({ res, data: { user } });
    } catch (error) {
        errorHandling({ res, error });
    }
}
