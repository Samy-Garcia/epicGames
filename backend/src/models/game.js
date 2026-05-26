/*
title
developer
genre
image
price
rating
cover
available
platforms {}
*/

import { publicEncrypt } from "crypto";
import mongoose, {Schema, model} from "mongoose";

const gameSchema = new Schema({
    title : {type: String},
    developer : {type: String},
    genre : {type: String},
    image : {type: String},
    public_id : {type: String},
    price : {type: Number},
    rating : {type: Number},
    cover : {type: String},
    available : {type: Boolean},
    platforms : [{type: String}]
}, {
    timestamps: true,
    strict: false
});

export default model("Game", gameSchema);