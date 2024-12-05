const {body, validationResult} = require("express-validator"); 

const validate = {}

validate.clientsValidationRules = () => {
    return [
        body("client_name")
            .exists({ checkFalsy: true })
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid name."),

        body("client_phone")
            .exists({ checkFalsy: true })
            .notEmpty()
            .isLength({ min: 7, max: 15 })
            .isNumeric()
            .withMessage("Please provide a valid phone number."),

        body("client_address")
            .exists({ checkFalsy: true })
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid address."),
    ]
}

validate.checkValidation = async (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array().map((err) => {
        let valid = err.msg;
        if (valid === "Invalid value") {
        } else {
            extractedErrors.push({ [err.path]: err.msg })
        }
    })
    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = validate;