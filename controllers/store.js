const storeModel = require('../models/store');
const drugsModel = require('../models/drugs');
const clientsModel = require('../models/clients');
const utility = require('../middleware/utilities');
const ObjectId = require('mongodb').ObjectId;

const getStore = async (req, res, next) => {
    //#swagger.tags=['Store']
    try {
        const result = await storeModel.find();
        if (result.length === 0) {
          res.setHeader('Content-Type', 'application/json');
          res.status(400).json('There are not any order');
        }
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
};

const findOrder = async (req, res, next) => {
    //#swagger.tags=['Store']
    try {
        if (!utility.validateMongoId(req.params.orderId)) {
            return next({
              message: 'Must provide a valid order id',
              statusCode: 401,
            });
          }
        const orderId = req.params.orderId;
        const result = await storeModel.find({ _id: orderId });
        if (!result || result.length === 0) {
            res.send({ error: { status: 404, message: 'Order does not exist' } });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
};

const createOrder = async (req, res, next) => {
    //#swagger.tags=['Store']
    try {
      // testing if client exists
        const client = await clientsModel.findOne({ _id: req.body.client_id });
        if (!client || client.length === 0) {
            return next({
                message: 'Client id does not exist',
                statusCode: 404,
            });
        }
        // testing if drug exists
        const drug = await drugsModel.findOne({ _id: req.body.drugId });
        if (!drug || drug.length === 0) {
            return next({
              message: 'Drug does not exist',
              statusCode: 404,});
        }
        const newOrder = {
            client_id: req.body.client_id,
            drugId: req.body.drugId,
            quantity: req.body.quantity,
        };
        const result = await storeModel.create(newOrder);
        if (result) {
          res.setHeader('Content-type', 'application/json');
          res.status(200).json(result);
        }
      } catch (error) {
        next(error);
      }
};

const updateOrder = async (req, res, next) => {
    //#swagger.tags=['Store']
    try {
        const orderId = new ObjectId(req.params.orderId);
        const result = await storeModel;
        const client = await clientsModel.findOne({ _id: req.body.client_id });
        // testing if client exists
        if (!client || client.length === 0) {
            return next({
                message: 'Client does not exist',
                statusCode: 404,
            });
        }
        // testing if drug exists
        const drug = await drugsModel.findOne({ _id: req.body.drugId });
        if (!drug || drug.length === 0) {
            return next({
              message: 'Drug does not exist',
              statusCode: 404,});
        }

        result.findOneAndUpdate({ _id: orderId }, 
        { $set: {
            client_id: req.body.client_id,
            drugId: req.body.drugId,
            quantity: req.body.quantity,
            }, 
        }, 
        {upsert: false,})
        .then((result) => {
        if (!result) {
            res.send({ error: { status: 404, message: 'Order does not exist' } });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({
            json: { status: 200, message: 'Order updated successfully' },
        });
        });
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    //#swagger.tags=['Store']
    try {
        const orderId = new ObjectId(req.params.orderId);
        const result = await storeModel.findOneAndDelete({ _id: orderId });
        if (!result) {
          res.send({ error: { status: 400, message: 'Order does not exist' } });
        }
        res.send({ json: { status: 200, message: 'Order Deleted' } });
      } catch (error) {
        next(error);
      }
};

const sendOrder = async (req, res, next) => {
  //#swagger.tags=['Store']
  try {
    const orderId = new ObjectId(req.params.orderId);
    // setting variables
    let client_id;
    let purchaseDate;
    let drugId; 
    let orderQuantity
    // fing order and fixing to update
    const orderTest = await storeModel.find({ _id: orderId }).then((order) => {
      if (!order || order.length === 0) {
        return next({
          message: 'Order does not exist',
          statusCode: 404,});
      }
      client_id = order[0].client_id;
      purchaseDate = order[0].updatedAt;
      drugId = order[0].drugId;
      orderQuantity = order[0].quantity;
    });

    // defining the order to be sent to clients
    let orderToSend = {purchase_date: purchaseDate, drug_id: drugId, quantity: orderQuantity};

    // test if clients exists and getting existing purchases
    const client = await clientsModel.find({ _id: client_id }).then((clientInfo) => {
      if (!clientInfo || clientInfo.length === 0) {
        return next({
          message: 'Client does not exist',
          statusCode: 404,});
      }
      if (clientInfo[0].client_purchases.length === 0) {
      } else {
        let oldOrders = clientInfo[0].client_purchases
        oldOrders.push(orderToSend);
        orderToSend = oldOrders;
      }
    });
    let del = false; 
    // sending the order to the clients purchases
    const result = await clientsModel;
    result.findOneAndUpdate({ _id: client_id }, 
    { $set: {
      client_purchases: orderToSend
        }, 
    })
    .then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.send({
          json: { status: 200, message: 'Order sent successfully' },
      });
      del = true; 
    });
    // deleting current order
    if (del === true) {
      const deleteOrder = await storeModel.findOneAndDelete({ _id: orderId });
    }
  } catch (error) {
      next(error);
  }
};

module.exports = { getStore, findOrder, createOrder,
    updateOrder, deleteOrder, sendOrder
};