const jwt = require('../jwt');

module.exports = {
  index(req, res) {
    const { user, password } = req.body;
    if (
      (user && password)
      && (user !== '' && password !== '')
    ) {
      const token = jwt.createToken(user);
      return res.status(200).send({ token });
    }
    return res.status(400).send();
  },
};
