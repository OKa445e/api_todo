import express from "express";
import User from "../models/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getMyProfile, getRegister, getLogin,getLogout } from "../controllers/user.js";

const router = express.Router();



// for new registration
router.post("/register",getRegister);




// login which is after registration
router.post("/login",getLogin);

// logout
router.get("/logout",getLogout);




router.get("/me",isAuthenticated,getMyProfile);

export default router;







