const DrugsModel = require('../models/drugs');
const utility = require('../middleware/utilities');

const createDrug = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    const newDrug = await DrugsModel.create(req.body);
    if (newDrug.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('Error creating the new drug');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        ok: true,
        user: newDrug,
        message: 'Drug created',
      });
    }
  } catch (error) {
    next(error);
  }
};

const findBySN = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    const SN = req.params.findbysn
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const drugsBySn = await DrugsModel.find({ scientificName: SN });
    if (drugsBySn.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any drug');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(drugsBySn);
    }
  } catch (error) {
    next(error);
  }
};
const findByCN = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    const CN = req.params.findbycn
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const drugsByCn = await DrugsModel.find({ commercialName: CN });
    if (drugsByCn.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any drug');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(drugsByCn);
    }
  } catch (error) {
    next(error);
  }
};

const findByCTG = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    const drugsCategory = req.params.category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const drugsByCategory = await DrugsModel.find({ category: drugsCategory });
    if (drugsByCategory.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any drug');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(drugsByCategory);
    }
  } catch (error) {
    next(error);
  }
};

const findByDrugId = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    if (!utility.validateMongoId(req.params.drugId)) {
      return next({
        message: 'Must provide a valid drug id',
        statusCode: 401,
      });
    }
    const drugsId = req.params.drugId;
    const drugById = await DrugsModel.find({ _id: drugsId });
    if (drugById.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any drug');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(drugById);
    }
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    const drugsCollection = await DrugsModel.find();

    if (drugsCollection.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any drug');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(drugsCollection);
    }
  } catch (error) {
    next(error);
  }
};

const updateDrug = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    if (!utility.validateMongoId(req.params.drugId)) {
      return next({
        message: 'Must provide a valid drug id',
        statusCode: 401,
      });
    }
    const drugId = req.params.drugId;
    const updateDrug = await DrugsModel.findByIdAndUpdate(
      { _id: drugId },
      req.body
    );
    if (updateDrug.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any drug with this ID');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        ok: true,
        user: updateDrug,
        message: 'Drug updated',
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteDrug = async (req, res, next) => {
  //#swagger.tags=['Drugs']
  try {
    if (!utility.validateMongoId(req.params.drugId)) {
      return next({
        message: 'Must provide a valid drug id',
        statusCode: 401,
      });
    }
    const drugId = req.params.drugId;
    const deleteDrug = await DrugsModel.findByIdAndDelete({ _id: drugId });
    if (deleteDrug.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any drug with this ID to be delete');
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        ok: true,
        user: deleteDrug,
        message: 'The drug above has been deleted',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findBySN,
  findByCN,
  createDrug,
  updateDrug,
  deleteDrug,
  findByCTG,
  findByDrugId,
};
