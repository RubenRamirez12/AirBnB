const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  //creates token with user information
  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username
  };

  const token = jwt.sign(
    { data: safeUser },
    process.env.JWT_SECRET,
    { expiresIn: parseInt(expiresIn) }
  );

  const isProduction = process.env.NODE_ENV === "production";

  //Setting the cookie in response
  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token
}

const restoreUser = (req, res, next) => {
  //grabs cookie from request body and parses it
  const { token } = req.cookies;
  req.user = null
  return jwt.verify(token, process.env.JWT_SECRET, null, async (err, jwtPayload) => {
    if (err) {
      return next()
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ['email', 'createdAt', 'updatedAt']
        }
      });
    } catch (e) {
      res.clearCookie('token');
      return next()
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuth = function (req, _res, next) {
  if (req.user) return next()

  const err = new Error("Authentication Required");
  err.title = "Authentication Required";
  err.errors = { message: "Authentication required"};
  err.status = 401;
  return next(err)
}


module.exports = { setTokenCookie, restoreUser, requireAuth }
