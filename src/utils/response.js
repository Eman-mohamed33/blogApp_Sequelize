export const errorHandling = ({res,error}={}) => {
    switch (error) {
        case "SequelizeValidationError":
            res.status(400).json({ message: "SequelizeValidationError", error });
            break;
        case "SequelizeUniqueConstraintError":
            res.status(409).json({ message: "SequelizeUniqueConstraintError", error });
        default:
            res.status(500).json({ message: "Server Error", error, info: error.message, stack: error.stack });
            break;
    }
}

export const successResponse = ({ res, status = 200, message = "Done", data = {} } = {}) => {
   
    return res.status(status).json({ message: message, data });

}
