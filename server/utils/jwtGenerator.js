const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/../.env' });
function JwtGenerator(user) {
  const { user_id, firstname, lastname, email } = user;
  const payload = {
    user: {
      id: user_id,
      userName: firstname + ' ' + lastname,
      email: email,
    },
  };
  console.log(process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
}

module.exports = JwtGenerator;
