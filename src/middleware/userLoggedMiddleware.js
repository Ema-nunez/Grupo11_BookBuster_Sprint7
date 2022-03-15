let db = require("../database/models");

function userLoggedMiddleware(req, res, next) {

  if (req.cookies.userEmail) {
    db.User.findOne({
      where: {
        email: req.cookies.userEmail,
      },
    }).then((userFromCookie) => {
      // console.log(userFromCookie)

      if (userFromCookie) {
        req.session.userLoged = userFromCookie
      }

      if (req.session.userLoged) {
        res.locals.isLogged = true
        res.locals.userLoged = req.session.userLoged
      } else {
        res.locals.isLogged = false
      }

      next()
    })
  } else {
    if (req.session.userLoged) {
      res.locals.isLogged = true
      res.locals.userLoged = req.session.userLoged
    } else {
      res.locals.isLogged = false
    }

    next()
  }
}

module.exports = userLoggedMiddleware;
