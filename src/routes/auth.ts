import express, { Router } from "express";
import { changePassword, getUserDetails, login, register, forgotPassword, resetPassword, resetPasswordPost, verifyEmail, resendConfirmEmail } from "../controllers/auth";
import { verifyUser } from "../utils/verifyToken";

const router: Router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/fetch", getUserDetails)
router.post("/forgot-password", forgotPassword)
router.post("/resend-confirm", resendConfirmEmail)
router.get("/reset-password/:id/:token", resetPassword)
router.post("/reset-password/:id/:token", resetPasswordPost)
router.post("/change-password", verifyUser, changePassword)
router.get("/verify/:id/:token", verifyEmail)

export default router