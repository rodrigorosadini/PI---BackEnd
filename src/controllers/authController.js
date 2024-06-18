const Usuario = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Validação do Usuário
const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.registrar = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;

  try {
    // Verificar se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
      return res.status(400).send("Nome de usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ username, password: hashedPassword });

    await usuario.save();
    res.status(201).send("Usuário registrado");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) return res.status(400).send("Credenciais inválidas");

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) return res.status(400).send("Credenciais inválidas");

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
