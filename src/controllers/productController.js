const Product = require("../models/Product");
const Joi = require("joi");

// Validação do Produto
const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
});

exports.createProduct = async (req, res) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send("Product deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};
