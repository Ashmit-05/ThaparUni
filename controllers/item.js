const ItemModel = require("../models/item");

class Item {
    async getAllItems(req,res) {
        try {
            const items = await ItemModel.find({});
            return res.json({items});
        } catch (err) {
            console.log(err);
        }
    }
    async addItem(req,res) {
        if(!req.body.name) {
            return res.send({error : "No name provided"});
        }
        try {
            const newItem = new ItemModel(req.body);
            const savedItem = newItem.save();
            return res.json({success : "Added item successfully!", item : newItem});
        } catch(err) {
            console.log("An error occured while adding the item!");
            console.log(err);
        }
    }
    async deleteItem(req,res) {
        try {
            const item = await ItemModel.findByIdAndDelete(req.body._id);
            return res.send({success : "Deleted the item successfully!"});
        } catch(err) {
            console.log("An error occured while trying to delete the item");
            console.log(err);
        }
    }
    async rentItem(req,res) {
        try {
            let item = await ItemModel.findByIdAndUpdate(req.body._id,{available : false, inPossessionOf : req.body.user});
            return res.send({success : "Rented the item"});
        } catch(err) {
            console.log("Unknown error");
            console.log(err);
        }
    }
    async returnItem(req,res) {
        try {
            let item = await ItemModel.findByIdAndUpdate(req.body._id,{available : true, inPossessionOf : null});
            return res.send({success : "Item returned successfully!"});
        } catch(err) {
            console.log("Unknown error");
            console.log(err);
        }
    }
}

const itemController = new Item();
module.exports = itemController;