const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { Product } = require("../models/product");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();
// CREATE
router.post("/", isAdmin, async (req, res) => {
  const { name, desc, price, image } = req.body;
  console.log(req.body);
  // try {
  if (image) {
    const uploadRes = await cloudinary.uploader.upload(image, {
      upload_preset: "onlineShop",
    });
    console.log(uploadRes);
    if (uploadRes) {
      const product = new Product({
        name,
        desc,
        price,
        image: uploadRes,
      });
      const savedProduct = await product.save();

      res.status(200).send(savedProduct);
    }
  }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send(error);
  // }
});

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//DELETE PRODUCT
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    if (product.image.public_id) {
      const destroyResponse = await cloudinary.uploader.destroy(
        product.image.public_id
      );
      if (destroyResponse) {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedProduct);
      } else {
        console.log("Action terminated");
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
