const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db-model/model');
const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

const SALT_WORK_FACTOR = 10;

function initialize(passport) {
	// use this Strategy whenever a user is on "/signup" signing up for a new acct
	passport.use(
		'local.signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true, //this allows us to use req.body
			},
			async (req, email, password, done) => {
				const { first_name, last_name } = req.body;
				if (!first_name || !last_name) {
					return done(null, false);
				}
				try {
					const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
					const user_id = randomUUID();
					const created_at = Date.now().toString();
					const params = [
						user_id,
						hashedPassword,
						first_name,
						last_name,
						email,
						created_at,
					];
					//sql query to make new user
					const registration =
						'INSERT INTO users (user_id, password, first_name, last_name, email, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id';
					const newLocalUser = await db.query(registration, params);
					return done(null, newLocalUser.rows[0]);
				} catch (err) {
					console.error('error in local.sign.up:', err);
					return done(err);
				}
			}
		)
	);

	passport.use(
		'local.auth',
		new LocalStrategy( //new LocalStrategy class takes 2 parameters
			{ usernameField: 'email' }, //this first parameter tells passport what we named our login fields. By default, passport expects "{ usernameField: 'username' }, {passwordField: 'password'}" but our "usernameField" is called 'email'.
			async (email, password, done) => {
				//this second parameter tells passport how to authenticate our user with the given email/password credentials

				//does this email exist in our database?
				const queryUser = await db.query(
					`SELECT * FROM users WHERE email = $1`,
					[email]
				);
				if (queryUser.rowCount === 0) {
					return done(null, false);
				}
				//set the returned row to a constant
				const localUser = queryUser.rows[0];

				//does the hashed password match the password we have in our database?
				const isMatch = await bcrypt.compare(password, localUser.password);
				if (!isMatch) {
					return done(null, false);
				}

				//if all checks pass, scrub "password" property from the user object and invoke "done" with our user as the 2nd argument.
				delete localUser.password;
				return done(null, localUser);
			}
		)
	);

	passport.use(
		'google',
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: '/api/user/google/callback',
				passReqToCallback: true,
			},
			async (request, accessToken, refreshToken, profile, done) => {
				const seeIfUserAlreadyExists = await db.query(
					`SELECT * FROM users WHERE user_id = '${profile.id}'`
				);
				// console.log('seeIfUserAlreadyExists:', seeIfUserAlreadyExists)
				if (seeIfUserAlreadyExists.rowCount === 0) {
					const thisTime = Date.now().toString();
					const params = [
						profile.id,
						profile.family_name,
						profile.given_name,
						'googleoauth:' + profile.email,
						thisTime,
					];
					try {
						const createGoogleUser = await db.query(
							`INSERT INTO users (user_id, last_name, first_name, email, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING user_id`,
							params
						);
						// console.log('createGoogleUser:', createGoogleUser)
						return done(null, createGoogleUser.rows[0]);
					} catch (err) {
						return done(err);
					}
				}
				return done(null, seeIfUserAlreadyExists.rows[0]);
			}
		)
	);

	passport.serializeUser(function (user, done) {
		// console.log('are we in serializeUser func? user:', user)
		return done(null, user);
	});

	passport.deserializeUser(async (user, done) => {
		// console.log('are we in deserializeUser func? user:', user)
		// const query = `SELECT `;
		// const findUser = await db.query()
		return done(null, user);
	});
}

module.exports = initialize;
