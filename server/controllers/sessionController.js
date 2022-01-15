const db = require('../db-model/model');
const sessionController = {};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = async (req, res, next) => {
  //write code here
  // console.log(req.cookies)
  const checkIfCookieAlreadyExists = `SELECT * FROM cookies WHERE user_id=$1`;
  const doesCookieExist = await db.query(checkIfCookieAlreadyExists, [res.locals.id]);
  if (doesCookieExist.rowCount === 0) {
    const startSessionQuery = `INSERT INTO cookies (user_id, created_at) VALUES ($1, $2)`;
    // console.log('res.locals.id.user_id: ', res.locals.id.user_id)
    const params = [res.locals.id, Date.now().toString()];
    try {
      await db.query(startSessionQuery, params);
    } catch (err) {
      console.error(err);
      return next(err)
    }
  }
  const updateCookie = `UPDATE cookies SET created_at=$1 WHERE user_id=$2`;
  const updatedUserCookie = await db.query(updateCookie, [Date.now().toString(), res.locals.id]);
  return next()
};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = async (req, res, next) => {
  // write code here
  const findUserSessionQuery = `SELECT * from cookies WHERE user_id = $1`;
  const params = [req.cookies.ssid];

  const findSession = await db.query(findUserSessionQuery, params)
  // console.log('youre not logged in: ',banana)
  if (!findSession.rowCount) {//Razana's code only has: if(!findSession) {...}
    console.log('you are being redirected to sign up')
    return res.redirect('/signup')
  }
  return next()
};


module.exports = sessionController;
