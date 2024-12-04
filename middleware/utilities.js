const db = require("../db");

function validateMongoId(id){
    if (db.mongoose.isValidObjectId(id)){
        return true;
    }
    return false;
}

module.exports = {
    validateMongoId,
}