const Vendor = require("../models/vendors");
const utilities = require("../middleware/utilities");

const controller = {
    createVendor: async (req, res, next) =>{
        const vendor = new Vendor({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            rating: req.body.rating,
            itin: req.body.itin,
        });
        try{
          const doc = await vendor.save();
          res.status(200).json(doc);
        }
        catch(error){
            return next(error);
        }
    },
    updateVendor: async (req, res, next) =>{
        const id = req.params.id
        if(!utilities.validateMongoId(id)){
            return next({message: "Must provide a valid vendor id", statusCode: 401});
        }
        try{
            await Vendor.findOneAndUpdate({_id: id}, req.body, {
                lean: true
            });
            return res.status(204).send();
        }
        catch(error){
            return next(error);
        }
    },
    findByName: async (req, res, next) =>{
        const name = req.params.name;
        try{
            const doc = await Vendor.findOne({name: { $regex: name, $options:"i" }});
            return res.status(200).json(doc);
        } 
        catch(error) {
            return next(error);
        }
    },
    findByITIN: async (req, res, next) =>{
        const itin = req.params.itin;
        try{
            const doc = await Vendor.findOne({itin: itin});
            return res.status(200).json(doc);
        } 
        catch(error) {
            return next(error);
        }
    },
    getAll: async (req, res, next) => {
        try{
            const docs = await Vendor.find();
            return res.status(200).json(docs);
        }
        catch(error) {
            return next(error);
        }
    },
    deleteVendor: async (req, res, next) =>{
        const id = req.params.id;
        if(!utilities.validateMongoId(id)){
            return next({message: "Must provide a valid Vendor id", statusCode: 401});
        }
        try{
            await Vendor.findOneAndDelete({_id: id});
            return res.status(204).send();
        }
        catch(error) {
            return next(error);
        }
    },
}

module.exports = controller;