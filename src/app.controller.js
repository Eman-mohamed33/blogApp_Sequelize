import express from "express";
import userController from "./modules/user/user.controller.js";
import postController from "./modules/post/post.controller.js";
import commentController from "./modules/comment/comment.controller.js";
import { checkDBConnection, syncDBConnection } from "./DB/connection.db.js";


function bootstrap() {
    const app = express();
    const port = 3000;

    // DB
    checkDBConnection();
    syncDBConnection();
    //convert json buffer
    app.use(express.json());
    //Routing
    app.get('/', (req, res, next) => res.json({ message: "Welcome to BlogApp" }));
    app.use("/user", userController);
    app.use("/posts", postController);
    app.use("/comments", commentController);
    app.all("{/*dummy}", (req, res, next) => res.json({ message: "In-valid Routing Page" }));
    app.listen(port, () => console.log(`Server is running on port ${port}`));
}

export default bootstrap;

