const clientsModel = require('../models/clients');
const crypto = require('crypto');
const ObjectId = require('mongodb').ObjectId;

const getAllClients = async (req, res, next) => {
  //#swagger.tags=['Clients']
  try {
    const result = await clientsModel.find();
    if (result.length === 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json('There are not any client');
    }
    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const createClient = async (req, res, next) => {
  //#swagger.tags=['Clients']
  try {
    const newClient = {
      client_name: req.body.client_name,
      client_phone: req.body.client_phone,
      client_address: req.body.client_address,
      client_ssid: crypto.randomBytes(4).toString('hex'),
      client_purchases: [],
    };
    const result = await clientsModel.create(newClient);
    if (result) {
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  //#swagger.tags=['Clients']
  try {
    const clientId = new ObjectId(req.params.clientId);
    const result = await clientsModel;
    result.findOneAndUpdate({ _id: clientId }, req.body).then((result) => {
      if (!result) {
        res.send({ error: { status: 404, message: 'Client does not exist' } });
      }
      res.setHeader('Content-Type', 'application/json');
      res.send({
        json: { status: 200, message: 'Client updated successfully' },
      });
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const findByPhone = async (req, res, next) => {
  //#swagger.tags=['Clients']
  try {
    const phone = req.params.phone;
    if (phone.length < 7) {
      return res.status(400).json({
        error: {
          status: 400,
          message: 'Invalid Phone format, must have at least 7 numbers.',
        },
      });
    }
    const result = await clientsModel.findOne({ client_phone: phone });
    if (!result) {
      res.send({ error: { status: 404, message: 'Client does not exist' } });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const findBySSID = async (req, res, next) => {
  //#swagger.tags=['Clients']
  try {
    const ssid = req.params.ssid;
    if (!/^[a-fA-F0-9]{8}$/.test(ssid)) {
      return res.status(400).json({
        error: {
          status: 400,
          message: 'Invalid SSID format. Must be 8 hexadecimal characters.',
        },
      });
    }
    const result = await clientsModel.findOne({ client_ssid: ssid });
    if (!result) {
      res.send({ error: { status: 404, message: 'Client does not exist' } });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  //#swagger.tags=['Clients']
  try {
    const clientId = new ObjectId(req.params.clientId);
    const result = await clientsModel.findOneAndDelete({ _id: clientId });
    if (!result) {
      res.send({ error: { status: 400, message: 'Client does not exist' } });
    }
    res.send({ json: { status: 200, message: 'Client Deleted' } });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  getAllClients,
  createClient,
  updateClient,
  findByPhone,
  findBySSID,
  deleteClient,
};
