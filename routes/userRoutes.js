import express from 'express';
import { createUser, logInUser, logoutUser } from "../controllers/userController.js";
import passport from "passport";

const router = express.Router();

//post http://localhost:4000/api/users/signup
router.post("/signup", createUser);

//post http://localhost:4000/api/users/signin
router.post("/signin", logInUser);

//get http://localhost:4000/api/users/signout
router.get("/signout", logoutUser);

export default router;
