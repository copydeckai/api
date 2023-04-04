"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const verifyToken_1 = require("../utils/verifyToken");
const router = (0, express_1.Router)();
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
router.put("/update", verifyToken_1.verifyUser, user_1.updateUser);
//DELETE
router.delete("/:id", verifyToken_1.verifyUser, user_1.deleteUser);
//GET
router.get("/:id", verifyToken_1.verifyUser, user_1.getUser);
//Public GET
router.get("/:id/fetch", user_1.getUser);
//GET ALL
router.get("/", verifyToken_1.verifyAdmin, user_1.getUsers);
exports.default = router;
