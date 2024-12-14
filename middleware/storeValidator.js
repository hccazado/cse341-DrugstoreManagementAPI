const { body, validationResult } = require('express-validator');
const validate = {};

validate.storeValidationRules = () => {
  return [
    body('client_id')
      .notEmpty()
      .exists({ checkFalsy: true })
      .isLength({ min: 24 })
      .withMessage('Please provide a valid client id'),
      
      body('drugId')
      .notEmpty()
      .exists({ checkFalsy: true })
      .isLength({ min: 24 })
      .withMessage('Please provide a valid drug id'),

      body('quantity')
      .notEmpty()
      .exists({ checkFalsy: true })
      .isInt()
      .isLength({ min: 1, max: 100000 })
      .withMessage('Please provide a valid quantity'),
  ];
};


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
