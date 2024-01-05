import express from "express"
import {getUser , getUSerFriends , addRemoveFriend,} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

router.get("/:id" , verifyToken , getUser)
router.get("/:id/friends" , verifyToken , getUSerFriends)


router.patch("/:id/:friendId" , verifyToken , addRemoveFriend)

