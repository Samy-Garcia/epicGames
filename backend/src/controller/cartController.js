import cartModel from '../models/cart.js';
import gameModel from '../models/game.js';

//array de funciones
const cartController = {};

//SELECT
cartController.getCartByUserId = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.params.userId }).populate('products.gameId "title price image"');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//INSERT
cartController.createCart = async (req, res) => {
    try {
         //solicitar los datos|
        const {products, status} = req.body;

        //variable para el total
        let total = 0;

        //arreglo de productos
        let newProducts = [];

        //de todos los productos que me llegan, tengo que calcular el subtotal y el total
        for (let i = 0; i < products.length; i++) {
            //buscar producto en la base de datos
            const pizzaFound = await pizzaModel.findById(products[i].productId);

            //calcular subtotal
            const subtotal = pizzaFound.price * products[i].quantity;

            //calcular total
            total += subtotal;

            //guardamos el prodructo junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            });
        }

        //llenamos el modelo con los datos
        const newCart = new cartModel({
            customerId,
            products: newProducts,
            total,
            status
        });

        await newCart.save();

        return res.status(200).json({message: "Cart created successfully"});
} catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//UPDATE
cartController.updateCart = async (req, res) => {
    try {
        //solicitar los datos|
        const {products, status} = req.body;
        //variable para el total
        let total = 0;

        //arreglo de productos
        let newProducts = [];
        //de todos los productos que me llegan, tengo que calcular el subtotal y el total
        for (let i = 0; i < products.length; i++) {
            //buscar producto en la base de datos
            const pizzaFound = await pizzaModel.findById(products[i].productId);
            //calcular subtotal
            const subtotal = pizzaFound.price * products[i].quantity;
            //calcular total
            total += subtotal;
            //guardamos el prodructo junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            });
        }   
        //llenamos el modelo con los datos
        const updatedCart = {
            products: newProducts,
            total,
            status
        };
        await cartModel.findByIdAndUpdate(req.params.id, updatedCart, { new: true });
        return res.status(200).json({message: "Cart updated successfully"});
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default cartController;