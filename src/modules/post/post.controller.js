import { Router } from "express";
import * as postService from "./post.service.js";
const router = Router();

router.post("/create", postService.create);
router.delete("/:postId", postService.Delete);
router.get("/details", postService.details);
router.get("/comment-count", postService.commentCount);



export default router;