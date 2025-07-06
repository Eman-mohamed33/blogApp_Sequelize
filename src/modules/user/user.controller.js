import { Router } from "express";
import * as userService from "./user.service.js"; 
const router = Router();

router.post("/signup", userService.signup);
router.put("/:userId", userService.update);
router.get("/by-email", userService.findUser);
router.get("/:userId", userService.showUser);

export default router;

