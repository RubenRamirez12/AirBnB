const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const sessionRouter = require('./session');
const usersRouter = require("./users");
const spotsRouter = require('./spots');
const reviewsRouter = require('./review');

router.use(restoreUser)

router.use("/session", sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter)

// router.use('/spots', spotsRouter)

// router.get('/restore-user', (req, res) => {
//   return res.json(req.user)
// });

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });

//   setTokenCookie(res, user);
//   return res.json({ user: user})
// })

// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user)
// })

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
