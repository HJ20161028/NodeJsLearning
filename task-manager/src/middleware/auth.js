const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const { MyTokenSecret } = require('../models/enumType');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, MyTokenSecret);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
    if (!user) {
      throw new Error('Please login first.')
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send({ error: e });
  }
}

module.exports = auth;