const User = require("../models/users");
const utilities = require("../middleware/utilities");

const controller = {
    login: async (req, res, next)=>{
    },
    logout: async (req, res, next)=>{
        req.logout(function(err){
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    },
    createUser: async (req, res, next) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, // Ensure password is hashed before saving
            phone: req.body.phone,
            role: req.body.role
        });
        try {
            const doc = await user.save();
            res.status(200).json(doc);
        } catch (error) {
            return next(error);
        }
    },

    updateUser: async (req, res, next) => {
        const id = req.params.id;
        if (!utilities.validateMongoId(id)) {
            return next({ message: "Must provide a valid user ID", statusCode: 401 });
        }
        try {
            await User.findOneAndUpdate({ _id: id }, req.body, { lean: true });
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    },

    findByEmail: async (req, res, next) => {
        const email = req.params.email;
        try {
            const doc = await User.findOne({ email: { $regex: email, $options: "i" } });
            return res.status(200).json(doc);
        } catch (error) {
            return next(error);
        }
    },

    findById: async (req, res, next) => {
        const id = req.params.id;
        if (!utilities.validateMongoId(id)) {
            return next({ message: "Must provide a valid user ID", statusCode: 401 });
        }
        try {
            const doc = await User.findById(id);
            return res.status(200).json(doc);
        } catch (error) {
            return next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const docs = await User.find();
            return res.status(200).json(docs);
        } catch (error) {
            return next(error);
        }
    },

    deleteUser: async (req, res, next) => {
        const id = req.params.id;
        if (!utilities.validateMongoId(id)) {
            return next({ message: "Must provide a valid user ID", statusCode: 401 });
        }
        try {
            await User.findOneAndDelete({ _id: id });
            return res.status(204).send();
        } catch (error) {
            return next(error);
        }
    }
};

module.exports = controller;