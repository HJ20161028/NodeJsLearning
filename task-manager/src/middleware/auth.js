const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const { MyTokenSecret } = require('../models/enumType');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '');
    console.log(token);
    const decode = jwt.verify(token, MyTokenSecret);
    console.log(decode);
    const user = User.findOne({ _id: decode._id, 'tokens.token': token });
    console.log(decode, user);
    if (!user) {
      throw new Error('Please login first.')
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send({ error: e });
  }
}

module.exports = auth;