import express from "express";
import gameController from "../controller/gameController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router();

//Rutas
router.route("/")
    .get(gameController.getAllGames)
    .post(upload.single("image"), gameController.createGame);

router.route("/:id")
    .put(upload.single("image"), gameController.updateGame)
    .delete(gameController.deleteGame);

export default router;