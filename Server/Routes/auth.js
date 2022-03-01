const express = require("express");
const authSchema = require("../models/authSchema");
const Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  validation,
  loginValidation,
  PasswordValidation,
} = require("../middlewares/authMiddleware");
const { isAuth } = require("../middlewares/validation");
const PetsSchema = require("../models/PetsSchema");
const fs = require("fs");

// SignUp
Router.post("/signUp", registerValidation, validation, async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const found = await authSchema.findOne({ Email });
    if (found) {
      return res.status(400).send({ errors: [{ msg: "User Already Exist!" }] });
    }
    const user = new authSchema(req.body);

    // hash the password
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(Password, salt);
    user.Password = hashedPassword;

    //Token
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.secretOrkey);

    await user.save();
    res.status(200).send({ msg: "User Registred Successfully", user, token });
  } catch (error) {
    res.send({ errors: [{ msg: "Could Not Register!" }], error });
  }
});

//SignIn
Router.post("/signIn", loginValidation, validation, async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const found = await authSchema.findOne({ Email });
    if (!found) {
      return res
        .status(400)
        .send({ errors: [{ param: "Email", msg: "Wrong Email!" }] });
    }
    const match = await bcrypt.compare(Password, found.Password);
    if (!match) {
      return res
        .status(400)
        .send({ errors: [{ param: "Password", msg: "Wrong Password!" }] });
    }

    //Json Web Token
    const payload = { id: found._id };
    const token = jwt.sign(payload, process.env.secretOrkey);

    res.status(200).send({ msg: "Login Successfully", found, token });
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "Couldn't Login!" }] });
  }
});
//get current
Router.get("/current", isAuth, (req, res) => res.send(req.user));

//update users
Router.put(
  "/Edit",
  isAuth,
  validation,
  PasswordValidation,

  async (req, res) => {
    const { id, Name, Email, Phone, OldPassword, NewPassword } = req.body;
    const User = await authSchema.findById(id);
    try {
      if (Name === "") {
        return res
          .status(400)
          .send({ errors: [{ msg: "Enter Your New Name!" }] });
      }
      if (Email === "") {
        return res
          .status(400)
          .send({ errors: [{ msg: "Enter Your New Email!" }] });
      }
      if (Phone === "") {
        return res
          .status(400)
          .send({ errors: [{ msg: "Enter Your New Phone Number!" }] });
      }
      if (OldPassword === "") {
        return res
          .status(400)
          .send({ errors: [{ msg: "Enter Your old Password!" }] });
      }
      if (NewPassword === "") {
        return res
          .status(400)
          .send({ errors: [{ msg: "Enter Your New Password!" }] });
      }
      if (User) {
        const match = await bcrypt.compare(OldPassword, User.Password);
        if (!match) {
          return res
            .status(400)
            .send({ errors: [{ msg: "Your Old Passwor Is Incorrect" }] });
        } else {
          //BYCRYPT
          const salt = 10;
          const hashedPassword = bcrypt.hashSync(NewPassword, salt);

          User.Name = Name || User.Name;
          User.Email = Email || User.Email;
          User.Phone = Phone || User.Phone;
          User.Password = hashedPassword || User.Password;

          //JSONWEBTOKEN
          const payload = { id: User._id };
          const Token = jwt.sign(payload, process.env.SecretOrKey);

          const UpdatedUser = await User.save();
          res
            .status(200)
            .send({ success: [{ msg: "User Updated" }], UpdatedUser, Token });
        }
      } else {
        res.status(400).send({ errors: [{ msg: "Could Not Update!" }] });
      }
    } catch (error) {
      res.status(500).send({ errors: [{ msg: "Could Not Update User !" }] });
    }
  }
);

//delete user
Router.delete("/delete", isAuth, async (req, res) => {
  const { id } = req.body;
  const user = await authSchema.findById(id.id);
  const Pets = await PetsSchema.find({ "CreatedBy.Id": id.id });
  console.log(Pets);
  console.log(user);
  try {
    if (user._id.equals(req.user._id) || req.user.role == "Admin") {
      if (Pets) {
        //Remove Pets Images
        Pets.forEach((Pet) => {
          Pet.Image.forEach((img) => {
            fs.unlinkSync(`../client/public/${img}`);
          });
        });
        await PetsSchema.deleteMany({ "CreatedBy.Id": id.id });
      }
      const deleteuser = await authSchema.findByIdAndDelete(id.id);
      res.send({ msg: "User Deleted", deleteuser });
    }
  } catch (error) {
    res.send("Could Not Delete  User");
  }
});
//Admin route
Router.post("/Admin", isAuth, async (req, res) => {
  const { Key } = req.body;
  try {
    if (Key === process.env.Key) {
      const user = await authSchema.findById(req.user._id);

      if (user.role === "Admin") {
        return res.status(400).send({ msg: "You Are Already An Admin!!" });
      } else {
        user.role = "Admin";
        user.save();
        res.status(200).send({ msg: "You Are An Admin Now" });
      }
    } else {
      res.status(400).send({ msg: "Wrong Key" }, error);
    }
  } catch (error) {
    res.status(500).send({ msg: "Could Not Update Your Account To Admin" });
  }
});
Router.get("/Admin/getusers", isAuth, async (req, res) => {
  const Admin = req.user;
  try {
    if (Admin && Admin.role === "Admin") {
      const users = await authSchema.find();
      res.status(200).send({ msg: "List of Users", users });
    } else {
      res.status(400).send({ msg: "You Are Not An Admin" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error!!" });
  }
});

module.exports = Router;
