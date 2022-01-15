const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('./db-model/model');
const sessionController = require('./controllers/sessionController');
const cookieController = require('./controllers/cookieController');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/user/google/callback",
  passReqToCallback: true,
},
  async function (request, accessToken, refreshToken, profile, done) {
    // console.log('request:', request)
    // console.log('accessToken:', accessToken)
    // console.log('refreshToken:', refreshToken)
    // console.log('profile:', profile)
    const seeIfUserAlreadyExists = await db.query(`SELECT * FROM users WHERE user_id = '${profile.id}'`);
    // console.log('seeIfUserAlreadyExists:', seeIfUserAlreadyExists)
    if (seeIfUserAlreadyExists.rowCount === 0) {
      const thisTime = Date.now().toString()
      const params = [profile.id, profile.family_name, profile.given_name, 'googleoauth:' + profile.email, thisTime]
      try {
        const createGoogleUser = await db.query(`INSERT INTO users (user_id, last_name, first_name, email, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING user_id`, params);
        // console.log('createGoogleUser:', createGoogleUser)
        startSession(createGoogleUser.rows[0].user_id);
        setSSIDCookie(createGoogleUser.rows[0].user_id);
        return done(null, createGoogleUser)
      } catch (err) {
        return done(err);
      }
    }
    startSession(seeIfUserAlreadyExists.rows[0].user_id);
    setSSIDCookie(seeIfUserAlreadyExists.rows[0].user_id);
    return done(null, seeIfUserAlreadyExists)
  }
));

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

async function startSession(id) {
  //write code here
  // console.log(req.cookies)
  const checkIfCookieAlreadyExists = `SELECT * FROM cookies WHERE user_id=$1`;
  const doesCookieExist = await db.query(checkIfCookieAlreadyExists, [id]);
  if (doesCookieExist.rowCount === 0) {
    const startSessionQuery = `INSERT INTO cookies (user_id, created_at) VALUES ($1, $2)`;
    // console.log('res.locals.id.user_id: ', res.locals.id.user_id)
    const params = [id, Date.now().toString()];
    try {
      await db.query(startSessionQuery, params);
    } catch (err) {
      // console.error(err);
      return next(err)
    }
  }
  const updateCookie = `UPDATE cookies SET created_at=$1 WHERE user_id=$2`;
  const updatedUserCookie = await db.query(updateCookie, [Date.now().toString(), id]);
  return
};

function setSSIDCookie(id) {
  document.cookie = 'name=ssid; value=' + id + '; expires=' + new Date(Date.now() + 3600000).toUTCString();
  // res.cookie('ssid', id, {
  // 	expires: new Date(Date.now() + 3600000),
  // 	httpOnly: true,
  // 	secure: true,
  // });
  // return next();
};