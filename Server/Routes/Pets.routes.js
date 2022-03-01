const express = require("express");
const Upload = require("../middlewares/Uimage");
const { isAuth } = require("../middlewares/validation");
const PetsSchema = require("../models/PetsSchema");
const PetsRoutes = express.Router();
const fs = require("fs");

PetsRoutes.put("/test", async (req, res) => {});
// Post a pet
PetsRoutes.post("/addPet", isAuth, Upload.array("Image"), async (req, res) => {
  const Images = req.files;

  try {
    if (!Images || Images.length < 0) {
      res.status(400).send({ msg: "Image not found", error });
    }
    const Newimages = [];
    for (var i = 0; i < Images.length; i++) {
      Newimages.push(Images[i].filename);
    }
    const Pet = new PetsSchema({
      ...req.body,
      CreatedBy: {
        Name: req.user.Name,
        Id: req.user._id,
        Phone: req.user.Phone,
      },
      Image: Newimages,
    });

    await Pet.save();
    res.status(200).send({ msg: "Pet Is Added", Pet });
  } catch (error) {
    res.status(500).send({ msg: "Could Not Add This Pet", error });
  }
});
//  Get all pets
PetsRoutes.get("/getPets", async (req, res) => {
  try {
    const getPets = await PetsSchema.find();
    res.status(200).send({ msg: "All Pets List", getPets });
  } catch (error) {
    res.status(500).send({ msg: "Could Not Get Pets" });
  }
});
PetsRoutes.get("/getPets/:id", async (req, res) => {
  try {
    const getPets = await PetsSchema.find({ "CreatedBy.Id": req.params.id });
    res.status(200).send({ msg: "All Pets List", getPets });
  } catch (error) {
    res.status(500).send({ msg: "Could Not Get Pets" });
  }
});

//  Get my pets
PetsRoutes.get("/myPets", isAuth, async (req, res) => {
  const id = req.user._id;

  try {
    const myPets = await PetsSchema.find({ "CreatedBy.Id": id });
    res.status(200).send({ msg: "My Pets List", myPets });
  } catch (error) {
    res.status(500).send({ msg: "Could Not Get My Pets", error });
  }
});

// Delete Pets
PetsRoutes.delete("/deletePets", isAuth, async (req, res) => {
  const { id } = req.body.id;
  const Pet = await PetsSchema.findById(id);
  try {
    if (Pet.CreatedBy.Id.equals(req.user._id) || req.user.role == "Admin") {
      if (Pet.Image) {
        Pet.Image.forEach((img) => {
          fs.unlinkSync(`../client/public/${img}`);
        });
      }

      const DeletePets = await Pet.deleteOne({ _id: id });
      res.status(200).send({ msg: "Your Pet Are Removed", DeletePets });
    } else {
      res.status(500).send({ msg: "Not Your Pet!" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Could Not Remove This Pet", error });
  }
});
// update Pets

PetsRoutes.put(
  "/updatePet/:id",
  isAuth,
  Upload.single("Image"),
  async (req, res) => {
    const Pet = await PetsSchema.findById(req.params.id);
    try {
      if (req.file || req.files) {
        Pet.Image.forEach((img) => {
          fs.unlinkSync(`../client/public/${img}`);
        });
        const updatePet = await PetsSchema.updateOne(
          { _id: req.params.id },
          {
            Title: req.body.Title,
            Description: req.body.Description,
            Image: req.file.filename,
          }
        );
        res.status(200).send({ msg: "Your Pet Are Updated", updatePet });
      } else {
        res.status(400).send({ msg: "You Need An Image!" });
      }
    } catch (error) {
      res.status(500).send({ msg: "Could Not Update This Pet", error });
    }
  }
);
module.exports = PetsRoutes;
