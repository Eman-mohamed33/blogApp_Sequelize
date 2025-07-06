import { Router } from "express";
import * as commentService from "./comment.service.js";
const router = Router();

router.post("/create", commentService.create);
router.patch("/:commentId", commentService.update);
router.post("/find-or-create", commentService.findOrcreate);
router.get("/search", commentService.search);
router.get("/newest/:postId", commentService.newComment);
router.get("/details/:commentId", commentService.details);


export default router;