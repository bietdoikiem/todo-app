const jwt = require('jsonwebtoken');
function JwtGenerator(user) {
  const { user_id, firstname, lastname, email } = user;
  const payload = {
    user: {
      id: user_id,
      userName: firstname + ' ' + lastname,
      email: email,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
}

module.exports = JwtGenerator;
