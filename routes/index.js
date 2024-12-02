const express = require("express");
const routes = express.Router();

routes.use("/clients", require("./clients"));
routes.use("/drugs", require("./drugs"));
routes.use("/vendors", require("./vendors"));
routes.use("/users", require("./users"));
routes.use("/store", require("./store"));
routes.get("/", (req,res)=>{
    // #swagger.ignore = true
    res.send(req.session.user !== undefined ? `Welcome: ${req.session.user.displayName}` : "Logged out");
});

module.exports = routes;