const User = require('../models/users');
const utilities = require('../middleware/utilities');

const controller = {
  login: async (req, res, next) => {
    //#swagger.tags=['Users']
  },
  logout: async (req, res, next) => {
    //#swagger.tags=['Users']
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
  createUser: async (req, res, next) => {
    //#swagger.tags=['Users']
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Ensure password is hashed before saving
      phone: req.body.phone,
      role: "customer",
    });
    try {
      const doc = await user.save();
      res.status(200).json(doc);
    } catch (error) {
      return next(error);
    }
  },

  updateUser: async (req, res, next) => {
    //#swagger.tags=['Users']
    const id = req.params.id;
    if (!utilities.validateMongoId(id)) {
      return next({ message: 'Must provide a valid user ID', statusCode: 401 });
    }
    try {
      await User.findOneAndUpdate({ _id: id }, req.body, { lean: true });
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  },

  findByEmail: async (req, res, next) => {
    //#swagger.tags=['Users']
    const email = req.params.email;
    try {
      const doc = await User.findOne({
        email: { $regex: email, $options: 'i' },
      });
      return res.status(200).json(doc);
    } catch (error) {
      return next(error);
    }
  },

  findById: async (req, res, next) => {
    //#swagger.tags=['Users']
    const id = req.params.id;
    if (!utilities.validateMongoId(id)) {
      return next({ message: 'Must provide a valid user ID', statusCode: 401 });
    }
    try {
      const doc = await User.findById(id);
      return res.status(200).json(doc);
    } catch (error) {
      return next(error);
    }
  },

  getAll: async (req, res, next) => {
    //#swagger.tags=['Users']
    try {
      const docs = await User.find();
      return res.status(200).json(docs);
    } catch (error) {
      return next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    //#swagger.tags=['Users']
    const id = req.params.id;
    if (!utilities.validateMongoId(id)) {
      return next({ message: 'Must provide a valid user ID', statusCode: 401 });
    }
    try {
      await User.findOneAndDelete({ _id: id });
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  },

  findOrCreate: async (user) => {
    //#swagger.tags=['Users']
    const providerId = user.id;
    const provider = user.provider;
    const userName = user.username;
    const email = user.email;
    //console.log(user);
    try {
      const user = await User.findOne({ providerId: providerId });
      if(!user){
        const newUser = await User.create({
          providerId: providerId,
          provider: provider,
          userName: userName,
          email: email,
          accessLevel: "customer"
        });
        return newUser;
      }
      else{
        return user;
      }
      //return res.status(204).send();
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = controller;
