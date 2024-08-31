import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UsersModel from '../Model/Sequelize/Users';

const SECRET_CODE = '3f8d92b6a4$#2c2e1f'; // Replace with your actual secret code

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_CODE,
  algorithms: ['HS256'], // Change the algorithm to HS256
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await UsersModel.findOne({ uid: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
