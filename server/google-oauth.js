const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db-model/model');
const bcrypt = require('bcrypt');
// const sessionController = require('./controllers/sessionController');
// const cookieController = require('./controllers/cookieController');

function initialize(passport) {
  passport.use(new LocalStrategy(     //new LocalStrategy class takes 2 parameters
    { usernameField: 'email' },       //this first parameter tells passport what we named our login fields. By default, passport expects "{ usernameField: 'username' }, {passwordField: 'password'}" but our "usernameField" is called 'email'.
    async (email, password, done) => {//this second parameter tells passport how to authenticate our user with the given email/password credentials

      //does this email exist in our database?
      const localUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
      if (localUser.rowCount === 0) {
        return done(null, false);
      }

      //does the hashed password match the password we have in our database?
      const isMatch = await bcrypt.compare(password, localUser.rows[0].password);
      if (!isMatch) {
        return done(null, false);
      }

      //if all checks pass, invoke "done" with our user as the 2nd argument
      return done(null, localUser.rows[0]);
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/user/google/callback",
    passReqToCallback: true,
  },
    async (request, accessToken, refreshToken, profile, done) => {
      // console.log('request:', request)
      // console.log('accessToken:', accessToken)
      // console.log('refreshToken:', refreshToken)
      // console.log('profile:', profile)
      console.log('do i enter this async func??')
      const seeIfUserAlreadyExists = await db.query(`SELECT * FROM users WHERE user_id = '${profile.id}'`);
      // console.log('seeIfUserAlreadyExists:', seeIfUserAlreadyExists)
      if (seeIfUserAlreadyExists.rowCount === 0) {
        const thisTime = Date.now().toString()
        const params = [profile.id, profile.family_name, profile.given_name, 'googleoauth:' + profile.email, thisTime]
        try {
          const createGoogleUser = await db.query(`INSERT INTO users (user_id, last_name, first_name, email, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING user_id`, params);
          // console.log('createGoogleUser:', createGoogleUser)
          return done(null, createGoogleUser)
        } catch (err) {
          return done(err);
        }
      }
      return done(null, seeIfUserAlreadyExists)
    }
  ));

  passport.serializeUser(function (user, done) {
    console.log('are we in serializeUser func? user:', user)
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    console.log('are we in deserializeUser func? user:', user)
    done(null, user);
  });

}

module.exports = initialize;

// async function startSession(id) {
//   //write code here
//   // console.log(req.cookies)
//   const checkIfCookieAlreadyExists = `SELECT * FROM cookies WHERE user_id=$1`;
//   const doesCookieExist = await db.query(checkIfCookieAlreadyExists, [id]);
//   if (doesCookieExist.rowCount === 0) {
//     const startSessionQuery = `INSERT INTO cookies (user_id, created_at) VALUES ($1, $2)`;
//     // console.log('res.locals.id.user_id: ', res.locals.id.user_id)
//     const params = [id, Date.now().toString()];
//     try {
//       await db.query(startSessionQuery, params);
//     } catch (err) {
//       // console.error(err);
//       return next(err)
//     }
//   }
//   const updateCookie = `UPDATE cookies SET created_at=$1 WHERE user_id=$2`;
//   const updatedUserCookie = await db.query(updateCookie, [Date.now().toString(), id]);
//   return
// };

// function setSSIDCookie(id) {
//   document.cookie = 'name=ssid; value=' + id + '; expires=' + new Date(Date.now() + 3600000).toUTCString();
//   // res.cookie('ssid', id, {
//   // 	expires: new Date(Date.now() + 3600000),
//   // 	httpOnly: true,
//   // 	secure: true,
//   // });
//   // return next();
// };