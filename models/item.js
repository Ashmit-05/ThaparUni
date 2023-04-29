const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const ItemSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    available : {
        type : Boolean,
        required : true,
        default : true,
    },
    inPossessionOf : {
        type : ObjectId,
        ref : "users",
        default : null,
    },
    // ADD IMAGES
    // image : {

    //     required : true,
    // }
});

const ItemModel = new mongoose.model("items",ItemSchema);
module.exports = ItemModel;