import gameModel from "../models/game.js";
import { v2 as cloudinary } from "cloudinary";

//array de funciones
const gameController = {};

//SELECT
gameController.getAllGames = async (req, res) => {
    try {
        const games = await gameModel.find();

        res.status(200).json(games);

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//INSERT
gameController.createGame = async (req, res) => {
    try {
        
        //Solicitar los datos
        const { title, developer, genre, price, rating, cover, available, platforms } = req.body;

        // Crear un nuevo juego
        const newGame = new gameModel({
            title,
            developer,
            genre,
            image: req.file.path, // La URL de la imagen subida a Cloudinary
            public_id: req.file.filename, // El public_id de la imagen en Cloudinary
            price,
            rating,
            cover,
            available,
            platforms
        });

        await newGame.save();

        return res.status(201).json({ message: 'Game created successfully' });

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}      

//UPDATE
gameController.updateGame = async (req, res) => {
    try {
       
        // Solicitar los datos
        const {title, developer, genre, price, rating, cover, available, platforms } = req.body;

        //ver que se está actualizando
        const gameFound = await gameModel.findById(req.params.id)

        const updatedGame = {
            title,
            developer,
            genre,
            price,
            rating,
            cover,
            available,
            platforms
        };

        //si viene una imagen
        if (req.file) {
            // Eliminar la imagen anterior de Cloudinary
            await cloudinary.uploader.destroy(gameFound.public_id);

            // Actualizar con la nueva imagen
            updatedGame.image = req.file.path; // La URL de la nueva imagen subida a Cloudinary
            updatedGame.public_id = req.file.filename; // El public_id de la nueva imagen en Cloudinary
        }

        // Actualizar el juego en la base de datos
        await gameModel.findByIdAndUpdate(req.params.id, updatedGame, { new: true });

        res.status(200).json({ message: 'Game updated successfully' });

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//DELETE
gameController.deleteGame = async (req, res) => {
    try {
        // Buscar el juego por ID
        const gameFound = await gameModel.findById(req.params.id);

        if (!gameFound) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(gameFound.public_id);

        // Eliminar el juego de la base de datos
        await gameModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Game deleted successfully' });

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//GET BY ID
gameController.getGameById = async (req, res) => {
    try {
        const game = await gameModel.findById(req.params.id);

        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        res.status(200).json(game);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default gameController;