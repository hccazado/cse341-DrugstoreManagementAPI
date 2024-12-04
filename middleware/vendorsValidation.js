const {body, validationResult} = require("express-validator");

const validationRules = () => {
    return [
        body("name").trim().notEmpty().withMessage("Must provide vendors name"),
        body("phone").trim().notEmpty().withMessage("Must provide vendors phone")
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    
    const extractedErrors = [];
    errors.array().map(error =>{
        extractedErrors.push({[error.path]: [error.msg]});
    });

    return res.status(412).json({error: extractedErrors});

}

module.exports = {
    validationRules,
    validate
}