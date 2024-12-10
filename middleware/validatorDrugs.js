const { body, validationResult } = require('express-validator');
const validate = {};

validate.drugsRules = () => {
  return [
    body('commercialName')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid Commercial Name'),
    body('scientificName')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid Scientific Name'),
    body('VendorId')
      .notEmpty()
      .exists({ checkFalsy: true })
      .isLength({ min: 24 })
      .withMessage('Please provide a valid VendorId'),
    body('expireDate')
      .notEmpty()
      .trim()
      .isLength({ min: 1 })
      .isISO8601()
      .withMessage('Please provide a valid date'),
    body('doses')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .notEmpty()
      .withMessage('Please provide a valid dose'),
    body('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage('Please provide a valid description'),
    body('category')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .notEmpty()
      .withMessage('Please provide a valid category'),
  ];
};

validate.checkDrugsData = (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((element) => {
        return element.msg;
      }),
    });
  }
  next();
};

module.exports = validate;
