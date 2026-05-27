/**
gameID
products{
    title
    genre
    price
    image
    subtotal
}
total
status
 */

import mongoose, {Schema, model} from "mongoose";

const cartSchema = new Schema({
    gameId : {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Game'
        },
    products: [{
        title: { type: String },
        genre: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        image: { type: String },
        subtotal: { type: Number }
    }],
    total: { type: Number },
    status: { type: String }
}, {    
    timestamps: true,
    strict: false
});

export default model("Cart", cartSchema);