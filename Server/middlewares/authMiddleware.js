const { validationResult, check } = require("express-validator");
exports.registerValidation = [
  check("Name", "Enter A Valid Name").notEmpty(),
  check("Email", "Enter A Valid Email").isEmail(),
  check("Password", "Enter A Valid Password Must Be 8 Characters").isLength({
    min: 8,
  }),
  check("Phone", "Enter A Valid PhoneNumber Must Be 8 Characters").isLength({
    min: 8,
    max: 8,
  }),
];
exports.loginValidation = [
  check("Password", "Enter A Valid Password").isLength({ min: 8 }),
  check("Email", "Enter A Valid Email").isEmail(),
];

exports.PasswordValidation = [
  check("OldPassword", "Your Old Password Is Incorrect").isLength({ min: 8 }),
  check("NewPassword", "Enter Your New Password").isLength({ min: 8 }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
