const sessionController = {

  checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login')
  },

  checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    // console.log('im in checkNotAuthenticated function. we\'re NOT authenticated')
    return next();
  }
};

module.exports = sessionController;
