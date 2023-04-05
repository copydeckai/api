import express, { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken";

const router: Router = Router()

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/update", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", getUser);

//Public GET
router.get("/:id/fetch", getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
