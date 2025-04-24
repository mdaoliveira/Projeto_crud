import express from "express";
import { getRegister } from "../Controllers/registers.js";
import { postRegister } from "../Controllers/registers.js";
import { deleteRegister } from "../Controllers/registers.js";
import { putRegister } from "../Controllers/registers.js";

const router = express.Router();

router.get("/", getRegister);

router.post("/", postRegister);

router.delete("/:id", deleteRegister);

router.put("/:id", putRegister);

export default router;

