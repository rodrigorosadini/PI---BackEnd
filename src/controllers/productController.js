const Produto = require("../models/Product");
const Joi = require("joi");

// Validação do Produto
const productValidationSchema = Joi.object({
  nome: Joi.string().required(),
  preco: Joi.number().required(),
  descricao: Joi.string().required(),
  categoria: Joi.string().required(),
});

exports.criarProduto = async (req, res) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const produto = new Produto(req.body);
  try {
    await produto.save();
    res.status(201).send(produto);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.obterProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).send(produtos);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.obterProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).send("Produto não encontrado");
    res.status(200).send(produto);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.atualizarProduto = async (req, res) => {
  const { error } = productValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!produto) return res.status(404).send("Produto não encontrado");
    res.status(200).send(produto);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).send("Produto não encontrado");
    res.status(200).send("Produto deletado");
  } catch (err) {
    res.status(500).send(err);
  }
};
