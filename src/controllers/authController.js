const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Validação do usuário
const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.register = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  try {
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};
